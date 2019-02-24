-- Convert schema '/home/abeverley/git/GADS/share/migrations/_source/deploy/64/001-auto.yml' to '/home/abeverley/git/GADS/share/migrations/_source/deploy/63/001-auto.yml':;

;
BEGIN;

;
ALTER TABLE fileval DROP CONSTRAINT fileval_fk_edit_user_id;

;
DROP INDEX fileval_idx_edit_user_id;

;
ALTER TABLE fileval DROP COLUMN edit_user_id;

;

COMMIT;

