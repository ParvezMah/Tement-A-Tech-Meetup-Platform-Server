/*
  Warnings:

  - You are about to drop the column `profileImage` on the `users` table. All the data in the column will be lost.

*/
-- AlterTable
ALTER TABLE "users" DROP COLUMN "profileImage",
ADD COLUMN     "address" TEXT,
ADD COLUMN     "contactNumber" TEXT,
ADD COLUMN     "profilePhoto" TEXT,
ALTER COLUMN "role" DROP DEFAULT;
