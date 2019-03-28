use Test::More; # tests => 1;
use strict;
use warnings;

use Log::Report;

use t::lib::DataSheet;

# Tests to check that fields that depend on another field for their display are
# blanked if they should not have been shown

my $sheet   = t::lib::DataSheet->new(
    multivalue         => 1,
    multivalue_columns => { string => 1, tree => 1 },
);
my $schema  = $sheet->schema;
my $layout  = $sheet->layout;
my $columns = $sheet->columns;
$sheet->create_records;

my $string1  = $columns->{string1};
my $integer1 = $columns->{integer1};
$integer1->display_field($string1->id);
$integer1->display_regex('foobar');
$integer1->write;
$layout->clear;

my $record = GADS::Record->new(
    user   => $sheet->user,
    layout => $layout,
    schema => $schema,
);

$record->find_current_id(1);

# Initial checks
{
    is($record->fields->{$string1->id}->as_string, 'Foo', 'Initial string value is correct');
    is($record->fields->{$integer1->id}->as_string, '50', 'Initial integer value is correct');
}

my @types = (
    {
        type   => 'exact',
        normal => "foobar",
        blank  => "xxfoobarxx",
    },
    {
        type   => 'contains',
        normal => "xxfoobarxx",
        blank  => "foo",
    },
    {
        type   => 'exact_negative',
        normal => "foo",
        blank  => "foobar",
    },
    {
        type   => 'contains_negative',
        normal => "foo",
        blank  => "xxfoobarxx",
    },
    {
        type          => 'exact',
        normal        => ['foo', 'bar', 'foobar'],
        string_normal => 'bar, foo, foobar',
        blank         => ["xxfoobarxx", 'abc'],
        string_blank  => 'abc, xxfoobarxx',
    },
    {
        type          => 'contains',
        normal        => ['foo', 'bar', 'xxfoobarxx'],
        string_normal => 'bar, foo, xxfoobarxx',
        blank         => "fo",
    },
    {
        type          => 'exact_negative',
        normal        => ['foo', 'foobarx'],
        string_normal => 'foo, foobarx',
        blank         => ['foobar', 'foobar2'],
        string_blank  => 'foobar, foobar2',
    },
    {
        type          => 'contains_negative',
        normal        => ['fo'],
        string_normal => 'fo',
        blank         => ['foo', 'bar', 'xxfoobarxx'],
        string_blank  => 'bar, foo, xxfoobarxx',
    },
);

foreach my $test (@types)
{
    $integer1->display_matchtype($test->{type});
    $integer1->write;
    $layout->clear;

    # Need to reload record for internal datums to reference column with
    # updated settings
    $record->clear;
    $record->find_current_id(1);

    # Test write of value that should be shown
    {
        $record->fields->{$string1->id}->set_value($test->{normal});
        $record->fields->{$integer1->id}->set_value('150');
        $record->write(no_alerts => 1);

        $record->clear;
        $record->find_current_id(1);

        is($record->fields->{$string1->id}->as_string, $test->{string_normal} || $test->{normal}, "Updated string value is correct (normal $test->{type})");
        is($record->fields->{$integer1->id}->as_string, '150', "Updated integer value is correct (normal $test->{type})");
    }

    # Test write of value that shouldn't be shown (string)
    {
        $record->fields->{$string1->id}->set_value($test->{blank});
        $record->fields->{$integer1->id}->set_value('200');
        $record->write(no_alerts => 1);

        $record->clear;
        $record->find_current_id(1);

        is($record->fields->{$string1->id}->as_string, $test->{string_blank} || $test->{blank}, "Updated string value is correct (blank $test->{type})");
        is($record->fields->{$integer1->id}->as_string, '', "Updated integer value is correct (blank $test->{type})");
    }
}

# Reset
$integer1->display_matchtype('exact');
$integer1->write;
$layout->clear;

# Test that mandatory field is not required if not shown by regex
{
    $integer1->optional(0);
    $integer1->write;
    $layout->clear;

    # Start with new record, otherwise existing blank value will not bork
    my $record = GADS::Record->new(
        user   => undef,
        layout => $layout,
        schema => $schema,
    );
    $record->initialise;
    $record->fields->{$string1->id}->set_value('foobar');
    $record->fields->{$integer1->id}->set_value('');
    try { $record->write(no_alerts => 1) };
    like($@, qr/is not optional/, "Record failed to be written with shown mandatory blank");

    $record->fields->{$string1->id}->set_value('foo');
    $record->fields->{$integer1->id}->set_value('');
    try { $record->write(no_alerts => 1) };
    ok(!$@, "Record successfully written with hidden mandatory blank");
}

# Test blank value match
{
    $integer1->display_field($string1->id);
    $integer1->display_regex('');
    $integer1->write;
    $layout->clear;
    my $record = GADS::Record->new(
        user   => undef,
        layout => $layout,
        schema => $schema,
    );
    $record->initialise;
    $record->fields->{$string1->id}->set_value('');
    $record->fields->{$integer1->id}->set_value(789);
    $record->write(no_alerts => 1);
    my $cid = $record->current_id;
    $record->clear;
    $record->find_current_id($cid);
    is($record->fields->{$integer1->id}->as_string, '789', "Value written for blank regex match");

    $record = GADS::Record->new(
        user   => undef,
        layout => $layout,
        schema => $schema,
    );
    $record->initialise;
    $record->fields->{$string1->id}->set_value('foo');
    $record->fields->{$integer1->id}->set_value(234);
    $record->write(no_alerts => 1);
    $cid = $record->current_id;
    $record->clear;
    $record->find_current_id($cid);
    is($record->fields->{$integer1->id}->as_string, '', "Value not written for blank regex match");
}

# Test value that depends on tree. Full levels of tree values can be tested
# using the nodes separated by hashes
{
    # Set up columns
    my $tree1 = $columns->{tree1};
    $integer1->display_field($tree1->id);
    $integer1->display_regex('(.*#)?tree3');
    $integer1->write;
    $layout->clear;

    # Set value of tree that should blank int
    $record->fields->{$tree1->id}->set_value(4); # value: tree1
    $record->fields->{$integer1->id}->set_value('250');
    $record->write(no_alerts => 1);

    $record->clear;
    $record->find_current_id(1);

    is($record->fields->{$tree1->id}->as_string, 'tree1', 'Initial tree value is correct');
    is($record->fields->{$integer1->id}->as_string, '', 'Updated integer value is correct');

    # Set matching value of tree - int should be written
    $record->fields->{$tree1->id}->set_value(6);
    $record->fields->{$integer1->id}->set_value('350');
    $record->write(no_alerts => 1);

    $record->clear;
    $record->find_current_id(1);

    is($record->fields->{$tree1->id}->as_string, 'tree3', 'Updated tree value is correct');
    is($record->fields->{$integer1->id}->as_string, '350', 'Updated integer value is correct');

    # Same but multivalue - int should be written
    $record->fields->{$tree1->id}->set_value([4,6]);
    $record->fields->{$integer1->id}->set_value('360');
    $record->write(no_alerts => 1);

    $record->clear;
    $record->find_current_id(1);

    is($record->fields->{$tree1->id}->as_string, 'tree1, tree3', 'Updated tree value is correct');
    is($record->fields->{$integer1->id}->as_string, '360', 'Updated integer value is correct');

    # Now test 2 tree levels
    $integer1->display_regex('tree2#tree3');
    $integer1->write;
    $layout->clear;
    # Set matching value of tree - int should be written
    $record->fields->{$tree1->id}->set_value(6);
    $record->fields->{$integer1->id}->set_value('400');
    $record->write(no_alerts => 1);

    $record->clear;
    $record->find_current_id(1);

    is($record->fields->{$tree1->id}->as_string, 'tree3', 'Tree value is correct');
    is($record->fields->{$integer1->id}->as_string, '400', 'Updated integer value with full tree path is correct');

    # Same but reversed - int should not be written
    $record->fields->{$tree1->id}->set_value(5);
    $record->fields->{$integer1->id}->set_value('500');
    $record->write(no_alerts => 1);

    $record->clear;
    $record->find_current_id(1);

    is($record->fields->{$tree1->id}->as_string, 'tree2', 'Tree value is correct');
    is($record->fields->{$integer1->id}->as_string, '', 'Updated integer value with full tree path is correct');

    # Same, but test higher level of full tree path
    $integer1->display_regex('tree2#');
    $integer1->write;
    $layout->clear;
    # Set matching value of tree - int should be written
    $record->fields->{$tree1->id}->set_value(6);
    $record->fields->{$integer1->id}->set_value('600');
    $record->write(no_alerts => 1);

    $record->clear;
    $record->find_current_id(1);

    is($record->fields->{$tree1->id}->as_string, 'tree3', 'Tree value is correct');
    is($record->fields->{$integer1->id}->as_string, '600', 'Updated integer value with full tree path is correct');
}

# Tests for dependent_not_shown
{
    $integer1->display_field($string1->id);
    $integer1->display_regex('Foobar');
    $integer1->write;
    $layout->clear;

    my $record = GADS::Record->new(
        user   => $sheet->user,
        layout => $layout,
        schema => $schema,
    );
    $record->initialise;
    $record->fields->{$string1->id}->set_value('Foobar');
    $record->fields->{$integer1->id}->set_value('100');
    $record->write(no_alerts => 1);

    my $current_id = $record->current_id;
    $record->clear;
    $record->find_current_id($current_id);
    ok(!$record->fields->{$string1->id}->dependent_not_shown, "String shown in view");
    ok(!$record->fields->{$integer1->id}->dependent_not_shown, "Integer shown in view");

    $record->fields->{$string1->id}->set_value('Foo');
    $record->fields->{$integer1->id}->set_value('200');
    $record->write(no_alerts => 1);
    ok(!$record->fields->{$string1->id}->dependent_not_shown, "String still shown in view");
    ok($record->fields->{$integer1->id}->dependent_not_shown, "Integer not shown in view");

    $record->fields->{$string1->id}->set_value('Foobarbar');
    $record->fields->{$integer1->id}->set_value('200');
    $record->write(no_alerts => 1);
    ok(!$record->fields->{$string1->id}->dependent_not_shown, "String still shown in view");
    ok($record->fields->{$integer1->id}->dependent_not_shown, "Integer not shown in view");

    # Although dependent_not_shown is not used in table view, it is still
    # generated as part of the presentation layer
    my $records = GADS::Records->new(
        user   => undef,
        layout => $layout,
        schema => $schema,
        columns => [$integer1->id],
    );
    while (my $rec = $records->single)
    {
        # Will always be shown as the column it depends on is not in the view
        ok(!$rec->fields->{$integer1->id}->dependent_not_shown, "Integer not shown in view");
    }
}

# Tests for recursive display fields
{
    $string1->display_field($string1->id);
    $string1->display_regex('Foobar');
    try { $string1->write };
    like($@, qr/not be the same/, "Unable to write display field same as field itself");
}

done_testing();
