-- Convert schema '/home/abeverley/git/GADS/share/migrations/_source/deploy/95/001-auto.yml' to '/home/abeverley/git/GADS/share/migrations/_source/deploy/94/001-auto.yml':;

;
BEGIN;

;
ALTER TABLE authentication DROP COLUMN error_messages;

;

COMMIT;

