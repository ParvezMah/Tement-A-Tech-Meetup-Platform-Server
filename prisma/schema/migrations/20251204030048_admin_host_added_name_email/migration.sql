/*
  Warnings:

  - A unique constraint covering the columns `[email]` on the table `hosts` will be added. If there are existing duplicate values, this will fail.
  - Added the required column `email` to the `adminLogs` table without a default value. This is not possible if the table is not empty.
  - Added the required column `name` to the `adminLogs` table without a default value. This is not possible if the table is not empty.
  - Added the required column `email` to the `hosts` table without a default value. This is not possible if the table is not empty.
  - Added the required column `name` to the `hosts` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE "adminLogs" ADD COLUMN     "email" TEXT NOT NULL,
ADD COLUMN     "name" TEXT NOT NULL;

-- AlterTable
ALTER TABLE "hosts" ADD COLUMN     "email" TEXT NOT NULL,
ADD COLUMN     "name" TEXT NOT NULL;

-- CreateIndex
CREATE UNIQUE INDEX "hosts_email_key" ON "hosts"("email");
