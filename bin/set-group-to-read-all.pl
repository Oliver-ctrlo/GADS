#!/usr/bin/perl

use strict;
use warnings;
use FindBin;
use lib "$FindBin::Bin/../lib";
use GADS::Schema;
use GADS::DB;
use GADS::Layout;
use Dancer2;
use Dancer2::Plugin::DBIC;
use Dancer2::Plugin::LogReport mode => 'NORMAL';

# Do not try and write messages to the session
dispatcher close => 'error_handler';

my $user_id  = 1;    # A admin user ID with full table permissions
my $group_id = 999;  # The user group ID you want to give Read All

notice __("Starting script");

my $user = schema->resultset('User')->find($user_id)
    or error __x("User with ID {user_id} not found.", user_id => $user_id);


# Start transaction
my $guard = schema->txn_scope_guard;

# Fetch non metadata layouts
my $layouts = schema->resultset('Layout')->search({ internal => 0 }) or error __("No layouts found");


notice __x("Processing {count} layouts", count => $layouts->count);

foreach my $layout ($layouts->all) {

    rset('LayoutGroup')->create({
        layout_id  => $layout->id,
        group_id   => $group_id,
        permission => 'read',
    }) or error __x("Failed to set permissions for Layout ID: {layout_id}.", layout_id => $layout->id);

    notice __x("Permissions created for Layout ID: {layout_id}", layout_id => $layout->id);
}
$guard->commit;
