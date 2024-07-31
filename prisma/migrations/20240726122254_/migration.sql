/*
  Warnings:

  - The `auth_type` column on the `Users` table would be dropped and recreated. This will lead to data loss if there is data in the column.

*/
-- AlterTable
ALTER TABLE "Users" DROP COLUMN "auth_type",
ADD COLUMN     "auth_type" "AuthType" NOT NULL DEFAULT 'EMAIL';
