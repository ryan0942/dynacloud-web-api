/*
  Warnings:

  - Added the required column `en_content` to the `Service` table without a default value. This is not possible if the table is not empty.
  - Added the required column `zh_content` to the `Service` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE `Service` ADD COLUMN `en_content` TEXT NOT NULL,
    ADD COLUMN `status` ENUM('Active', 'Draft', 'Closed') NOT NULL DEFAULT 'Draft',
    ADD COLUMN `zh_content` TEXT NOT NULL;
