-- AlterTable
ALTER TABLE "Employee" ADD COLUMN     "mfaEnabled" BOOLEAN NOT NULL DEFAULT false,
ADD COLUMN     "mfaSecret" TEXT;
