-- CreateEnum
CREATE TYPE "UserRole" AS ENUM ('USER', 'HOST', 'ADMIN');

-- CreateEnum
CREATE TYPE "UserStatus" AS ENUM ('ACTIVE', 'SUSPENDED', 'DELETED', 'BANNED');

-- CreateEnum
CREATE TYPE "AdminAction" AS ENUM ('SUSPEND_USER', 'ACTIVATE_USER', 'VERIFY_HOST', 'DELETE_EVENT', 'CANCEL_EVENT', 'COMPLETE_EVENT', 'REFUND_PAYMENT', 'DELETE_REVIEW', 'AWARD_BADGE', 'SEND_NOTIFICATION', 'BAN_USER');

-- CreateTable
CREATE TABLE "users" (
    "id" SERIAL NOT NULL,
    "fullName" TEXT NOT NULL,
    "email" TEXT NOT NULL,
    "passwordHash" TEXT NOT NULL,
    "role" "UserRole" NOT NULL DEFAULT 'USER',
    "userStatus" "UserStatus" NOT NULL DEFAULT 'ACTIVE',
    "bio" TEXT,
    "interests" TEXT[],
    "location" TEXT,
    "profileImage" TEXT,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "users_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "hosts" (
    "id" SERIAL NOT NULL,
    "userId" INTEGER NOT NULL,
    "verified" BOOLEAN NOT NULL DEFAULT false,
    "rating" DOUBLE PRECISION,
    "bio" TEXT,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "hosts_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "adminLogs" (
    "id" SERIAL NOT NULL,
    "adminId" INTEGER NOT NULL,
    "action" "AdminAction" NOT NULL,
    "targetId" INTEGER,
    "targetType" TEXT,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "adminLogs_pkey" PRIMARY KEY ("id")
);

-- CreateIndex
CREATE UNIQUE INDEX "hosts_userId_key" ON "hosts"("userId");

-- AddForeignKey
ALTER TABLE "hosts" ADD CONSTRAINT "hosts_userId_fkey" FOREIGN KEY ("userId") REFERENCES "users"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "adminLogs" ADD CONSTRAINT "adminLogs_adminId_fkey" FOREIGN KEY ("adminId") REFERENCES "users"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
