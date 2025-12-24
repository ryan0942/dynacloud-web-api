/*
  Warnings:

  - Added the required column `en_content` to the `Case` table without a default value. This is not possible if the table is not empty.
  - Added the required column `zh_content` to the `Case` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE `Case` ADD COLUMN `en_content` TEXT NOT NULL,
    ADD COLUMN `zh_content` TEXT NOT NULL;
