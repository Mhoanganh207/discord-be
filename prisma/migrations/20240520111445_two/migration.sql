/*
  Warnings:

  - Added the required column `profileId1` to the `Conversation` table without a default value. This is not possible if the table is not empty.
  - Added the required column `profileId2` to the `Conversation` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE `Conversation` ADD COLUMN `profileId1` VARCHAR(191) NOT NULL,
    ADD COLUMN `profileId2` VARCHAR(191) NOT NULL;
