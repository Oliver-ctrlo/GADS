use Test::More; # tests => 1;
use strict;
use warnings;

use JSON qw(encode_json);
use Log::Report;
use GADS::Layout;
use GADS::Record;
use GADS::Records;
use GADS::Schema;

use t::lib::DataSheet;

my $data = [
    {
        string1    => 'Foo',
        date1      => '2013-10-10',
        daterange1 => ['2014-03-21', '2015-03-01'],
        integer1   => 10,
        enum1      => 'foo1',
        curval1    => 1,
    },
];

my $curval_sheet = t::lib::DataSheet->new(instance_id => 2, user_permission_override => 0);
$curval_sheet->create_records;

my $schema = $curval_sheet->schema;
my $sheet = t::lib::DataSheet->new(data => $data, curval => 2, schema => $schema, user_permission_override => 0);

my $layout = $sheet->layout;
my $columns = $sheet->columns;
$sheet->create_records;

# Set up an autocur field that only shows a field that is not unique between
# parent and child. Normally the child would not be shown in these
# circumstances, but we do want it to be for an autocur so that all related
# records are shown.
my $autocur1 = $curval_sheet->add_autocur(
    refers_to_instance_id => 1,
    related_field_id      => $columns->{curval1}->id,
    curval_field_ids      => [$columns->{integer1}->id],
);

my $calc_curval = GADS::Column::Calc->new(
    schema          => $schema,
    user            => $sheet->user,
    layout          => $curval_sheet->layout,
    name            => 'calc_curval',
    return_type     => 'string',
    code            => "function evaluate (L2autocur1)
        return_value = ''
        for _, v in pairs(L2autocur1) do
            return_value = return_value .. v.field_values.L1integer1 .. v.field_values.L1string1
        end
        return return_value
    end",
    set_permissions => {
        $sheet->group->id => $sheet->default_permissions,
    },
);
$calc_curval->write;

# Set up field with child values
my $string1 = $columns->{string1};
$string1->set_can_child(1);
$string1->write;

# Messy - hack to make layouts revert to standard user (built with admin)
my $user_normal1 = $sheet->user_normal1;
$layout->user($user_normal1);
$layout->clear;
my $curval_layout = $curval_sheet->layout;
$curval_layout->user($user_normal1);
$curval_layout->clear;

my $parent = GADS::Records->new(
    user     => $sheet->user_normal1,
    layout   => $layout,
    schema   => $schema,
)->single;

# Create child
my $child = GADS::Record->new(
    user     => $sheet->user_normal1,
    layout   => $layout,
    schema   => $schema,
);
my $parent_id = $parent->current_id;
$child->parent_id($parent_id);
$child->initialise;

$child->fields->{$string1->id}->set_value('Foobar');
$child->write(no_alerts => 1);

$parent->clear;
$parent->find_current_id($parent_id);
$parent->fields->{$string1->id}->set_value('Bar');
$parent->write(no_alerts => 1);

my $records = GADS::Records->new(
    user     => $sheet->user_normal1,
    layout   => $layout,
    schema   => $schema,
);

is($records->count, 2, "Parent and child records exist");

my $curval_record = GADS::Record->new(
    user     => $sheet->user_normal1,
    layout   => $curval_layout,
    schema   => $schema,
);
$curval_record->find_current_id(1);
is($curval_record->fields->{$autocur1->id}->as_string, "10; 10", "Autocur value correct");
is($curval_record->fields->{$calc_curval->id}->as_string, "10Foobar10Bar", "Autocur calc value correct");

done_testing();
