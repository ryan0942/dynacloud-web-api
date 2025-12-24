/*
  Warnings:

  - Added the required column `categoryId` to the `Service` table without a default value. This is not possible if the table is not empty.
  - Added the required column `cover` to the `Service` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE `Service` ADD COLUMN `categoryId` VARCHAR(191) NOT NULL,
    ADD COLUMN `cover` VARCHAR(191) NOT NULL;

-- CreateTable
CREATE TABLE `ServiceCategory` (
    `id` VARCHAR(191) NOT NULL,
    `zh_name` VARCHAR(191) NOT NULL,
    `en_name` VARCHAR(191) NOT NULL,
    `createdAt` DATETIME(3) NULL DEFAULT CURRENT_TIMESTAMP(3),
    `updatedAt` DATETIME(3) NULL,

    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- AddForeignKey
ALTER TABLE `Service` ADD CONSTRAINT `Service_categoryId_fkey` FOREIGN KEY (`categoryId`) REFERENCES `ServiceCategory`(`id`) ON DELETE CASCADE ON UPDATE CASCADE;
