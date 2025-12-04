/*
  Warnings:

  - You are about to drop the column `fullName` on the `users` table. All the data in the column will be lost.
  - Added the required column `address` to the `hosts` table without a default value. This is not possible if the table is not empty.
  - Added the required column `contactNumber` to the `hosts` table without a default value. This is not possible if the table is not empty.
  - Added the required column `name` to the `users` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE "adminLogs" ADD COLUMN     "contactNumber" TEXT,
ADD COLUMN     "profilePhoto" TEXT;

-- AlterTable
ALTER TABLE "hosts" ADD COLUMN     "address" TEXT NOT NULL,
ADD COLUMN     "contactNumber" TEXT NOT NULL,
ADD COLUMN     "profilePhoto" TEXT;

-- AlterTable
ALTER TABLE "users" DROP COLUMN "fullName",
ADD COLUMN     "name" TEXT NOT NULL;
