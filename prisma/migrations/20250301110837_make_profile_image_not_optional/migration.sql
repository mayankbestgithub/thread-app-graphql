/*
  Warnings:

  - Made the column `profile_image_url` on table `users` required. This step will fail if there are existing NULL values in that column.

*/
-- AlterTable
ALTER TABLE "users" ALTER COLUMN "profile_image_url" SET NOT NULL;
