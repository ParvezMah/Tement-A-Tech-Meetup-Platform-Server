/*
  Warnings:

  - The values [CREATED,UPDATED,DELETED] on the enum `AdminAction` will be removed. If these variants are still used in the database, this will fail.

*/
-- AlterEnum
BEGIN;
CREATE TYPE "AdminAction_new" AS ENUM ('CREATE_USER', 'SUSPEND_USER', 'ACTIVATE_USER', 'BAN_USER', 'CREATE_HOST', 'VERIFY_HOST', 'UPDATE_HOST', 'DELETE_HOST', 'CREATE_EVENT', 'UPDATE_EVENT', 'DELETE_EVENT', 'CANCEL_EVENT', 'COMPLETE_EVENT');
ALTER TABLE "adminLogs" ALTER COLUMN "action" TYPE "AdminAction_new" USING ("action"::text::"AdminAction_new");
ALTER TYPE "AdminAction" RENAME TO "AdminAction_old";
ALTER TYPE "AdminAction_new" RENAME TO "AdminAction";
DROP TYPE "public"."AdminAction_old";
COMMIT;
