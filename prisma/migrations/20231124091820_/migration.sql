-- CreateTable
CREATE TABLE `Trainer` (
    `id` INTEGER NOT NULL AUTO_INCREMENT,
    `name` VARCHAR(191) NOT NULL,
    `name_jp` VARCHAR(191) NULL,

    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `Pokemon` (
    `no` INTEGER NOT NULL,
    `name` VARCHAR(191) NOT NULL,
    `name_jp` VARCHAR(191) NULL,
    `species` VARCHAR(191) NULL,
    `description` TEXT NULL,

    PRIMARY KEY (`no`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `CatchedPokemon` (
    `id` INTEGER NOT NULL AUTO_INCREMENT,
    `pokemonNo` INTEGER NOT NULL,
    `name` VARCHAR(191) NULL,
    `name_jp` VARCHAR(191) NULL,
    `trainerId` INTEGER NOT NULL,

    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- AddForeignKey
ALTER TABLE `CatchedPokemon` ADD CONSTRAINT `CatchedPokemon_pokemonNo_fkey` FOREIGN KEY (`pokemonNo`) REFERENCES `Pokemon`(`no`) ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `CatchedPokemon` ADD CONSTRAINT `CatchedPokemon_trainerId_fkey` FOREIGN KEY (`trainerId`) REFERENCES `Trainer`(`id`) ON DELETE RESTRICT ON UPDATE CASCADE;
