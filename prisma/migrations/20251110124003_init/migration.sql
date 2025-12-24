-- CreateTable
CREATE TABLE `Admin` (
    `id` VARCHAR(191) NOT NULL,
    `name` VARCHAR(191) NOT NULL,
    `account` VARCHAR(191) NOT NULL,
    `avatar` VARCHAR(191) NULL,
    `password` VARCHAR(191) NOT NULL,
    `createdAt` DATETIME(3) NULL DEFAULT CURRENT_TIMESTAMP(3),
    `updatedAt` DATETIME(3) NULL,

    UNIQUE INDEX `Admin_name_key`(`name`),
    UNIQUE INDEX `Admin_account_key`(`account`),
    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `Banner` (
    `id` VARCHAR(191) NOT NULL,
    `image` VARCHAR(191) NULL,
    `url` VARCHAR(191) NULL,
    `duration` INTEGER NULL DEFAULT 3,
    `type` ENUM('IMAGE', 'VIDEO') NOT NULL,
    `createdAt` DATETIME(3) NULL DEFAULT CURRENT_TIMESTAMP(3),
    `updatedAt` DATETIME(3) NULL,

    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `Service` (
    `id` VARCHAR(191) NOT NULL,
    `icon` VARCHAR(191) NOT NULL,
    `logo` VARCHAR(191) NOT NULL,
    `zh_title` VARCHAR(191) NOT NULL,
    `en_title` VARCHAR(191) NOT NULL,
    `zh_description` VARCHAR(191) NOT NULL,
    `en_description` VARCHAR(191) NOT NULL,
    `createdAt` DATETIME(3) NULL DEFAULT CURRENT_TIMESTAMP(3),
    `updatedAt` DATETIME(3) NULL,

    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `NewsCategory` (
    `id` VARCHAR(191) NOT NULL,
    `zh_name` VARCHAR(191) NOT NULL,
    `en_name` VARCHAR(191) NOT NULL,
    `createdAt` DATETIME(3) NULL DEFAULT CURRENT_TIMESTAMP(3),
    `updatedAt` DATETIME(3) NULL,
    `deletedAt` DATETIME(3) NULL,

    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `News` (
    `id` VARCHAR(191) NOT NULL,
    `zh_title` VARCHAR(191) NOT NULL,
    `en_title` VARCHAR(191) NOT NULL,
    `cover` VARCHAR(191) NOT NULL,
    `zh_description` VARCHAR(191) NOT NULL,
    `en_description` VARCHAR(191) NOT NULL,
    `categoryId` VARCHAR(191) NOT NULL,
    `zh_content` TEXT NOT NULL,
    `en_content` TEXT NOT NULL,
    `zh_tags` VARCHAR(191) NOT NULL,
    `en_tags` VARCHAR(191) NOT NULL,
    `startDateTime` VARCHAR(191) NOT NULL,
    `endDateTime` VARCHAR(191) NOT NULL,
    `status` ENUM('Active', 'Draft', 'Closed') NOT NULL DEFAULT 'Draft',
    `createdAt` DATETIME(3) NULL DEFAULT CURRENT_TIMESTAMP(3),
    `updatedAt` DATETIME(3) NULL,

    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `BlogCategory` (
    `id` VARCHAR(191) NOT NULL,
    `zh_name` VARCHAR(191) NOT NULL,
    `en_name` VARCHAR(191) NOT NULL,
    `createdAt` DATETIME(3) NULL DEFAULT CURRENT_TIMESTAMP(3),
    `updatedAt` DATETIME(3) NULL,

    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `Blog` (
    `id` VARCHAR(191) NOT NULL,
    `zh_title` VARCHAR(191) NOT NULL,
    `en_title` VARCHAR(191) NOT NULL,
    `zh_description` VARCHAR(191) NOT NULL,
    `en_description` VARCHAR(191) NOT NULL,
    `cover` VARCHAR(191) NOT NULL,
    `categoryId` VARCHAR(191) NOT NULL,
    `zh_content` TEXT NOT NULL,
    `en_content` TEXT NOT NULL,
    `zh_tags` VARCHAR(191) NOT NULL,
    `en_tags` VARCHAR(191) NOT NULL,
    `status` ENUM('Active', 'Draft', 'Closed') NOT NULL DEFAULT 'Draft',
    `createdAt` DATETIME(3) NULL DEFAULT CURRENT_TIMESTAMP(3),
    `updatedAt` DATETIME(3) NULL,

    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `CaseCategory` (
    `id` VARCHAR(191) NOT NULL,
    `zh_name` VARCHAR(191) NOT NULL,
    `en_name` VARCHAR(191) NOT NULL,
    `createdAt` DATETIME(3) NULL DEFAULT CURRENT_TIMESTAMP(3),
    `updatedAt` DATETIME(3) NULL,

    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `Case` (
    `id` VARCHAR(191) NOT NULL,
    `zh_title` VARCHAR(191) NOT NULL,
    `en_title` VARCHAR(191) NOT NULL,
    `zh_description` VARCHAR(191) NOT NULL,
    `en_description` VARCHAR(191) NOT NULL,
    `cover` VARCHAR(191) NOT NULL,
    `company_logo` VARCHAR(191) NOT NULL,
    `zh_company_name` VARCHAR(191) NOT NULL,
    `en_company_name` VARCHAR(191) NOT NULL,
    `zh_company_description` VARCHAR(191) NOT NULL,
    `en_company_description` VARCHAR(191) NOT NULL,
    `zh_company_title` VARCHAR(191) NOT NULL,
    `en_company_title` VARCHAR(191) NOT NULL,
    `zh_tags` VARCHAR(191) NOT NULL,
    `en_tags` VARCHAR(191) NOT NULL,
    `categoryId` VARCHAR(191) NOT NULL,
    `status` ENUM('Active', 'Draft', 'Closed') NOT NULL DEFAULT 'Draft',
    `createdAt` DATETIME(3) NULL DEFAULT CURRENT_TIMESTAMP(3),
    `updatedAt` DATETIME(3) NULL,

    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `Customer` (
    `id` VARCHAR(191) NOT NULL,
    `zh_name` VARCHAR(191) NOT NULL,
    `en_name` VARCHAR(191) NOT NULL,
    `logo` VARCHAR(191) NOT NULL,
    `url` VARCHAR(191) NULL,
    `createdAt` DATETIME(3) NULL DEFAULT CURRENT_TIMESTAMP(3),
    `updatedAt` DATETIME(3) NULL,

    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `CompanyInfo` (
    `id` VARCHAR(191) NOT NULL,
    `zh_address` VARCHAR(191) NOT NULL,
    `en_address` VARCHAR(191) NOT NULL,
    `phone` VARCHAR(191) NOT NULL,
    `email` VARCHAR(191) NOT NULL,
    `zh_opening_time` VARCHAR(191) NOT NULL,
    `en_opening_time` VARCHAR(191) NOT NULL,
    `createdAt` DATETIME(3) NULL DEFAULT CURRENT_TIMESTAMP(3),
    `updatedAt` DATETIME(3) NULL,

    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `About` (
    `id` VARCHAR(191) NOT NULL,
    `zh_content` VARCHAR(191) NULL DEFAULT '',
    `en_content` VARCHAR(191) NULL DEFAULT '',
    `createdAt` DATETIME(3) NULL DEFAULT CURRENT_TIMESTAMP(3),
    `updatedAt` DATETIME(3) NULL,

    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- AddForeignKey
ALTER TABLE `News` ADD CONSTRAINT `News_categoryId_fkey` FOREIGN KEY (`categoryId`) REFERENCES `NewsCategory`(`id`) ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `Blog` ADD CONSTRAINT `Blog_categoryId_fkey` FOREIGN KEY (`categoryId`) REFERENCES `BlogCategory`(`id`) ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `Case` ADD CONSTRAINT `Case_categoryId_fkey` FOREIGN KEY (`categoryId`) REFERENCES `CaseCategory`(`id`) ON DELETE CASCADE ON UPDATE CASCADE;
