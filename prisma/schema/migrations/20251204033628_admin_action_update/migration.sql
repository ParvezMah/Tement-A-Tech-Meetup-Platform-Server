/*
  Warnings:

  - The values [SUSPEND_USER,ACTIVATE_USER,VERIFY_HOST,DELETE_EVENT,CANCEL_EVENT,COMPLETE_EVENT,REFUND_PAYMENT,DELETE_REVIEW,AWARD_BADGE,SEND_NOTIFICATION,BAN_USER] on the enum `AdminAction` will be removed. If these variants are still used in the database, this will fail.

*/
-- AlterEnum
BEGIN;
CREATE TYPE "AdminAction_new" AS ENUM ('CREATED', 'UPDATED', 'DELETED');
ALTER TABLE "adminLogs" ALTER COLUMN "action" TYPE "AdminAction_new" USING ("action"::text::"AdminAction_new");
ALTER TYPE "AdminAction" RENAME TO "AdminAction_old";
ALTER TYPE "AdminAction_new" RENAME TO "AdminAction";
DROP TYPE "public"."AdminAction_old";
COMMIT;
