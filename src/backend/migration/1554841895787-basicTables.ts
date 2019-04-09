import {MigrationInterface, QueryRunner} from "typeorm";

export class basicTables1554841895787 implements MigrationInterface {

    public async up(queryRunner: QueryRunner): Promise<any> {
        await queryRunner.query("CREATE TABLE `customer_order` (`id` int NOT NULL AUTO_INCREMENT, `customerName` varchar(255) NOT NULL, `customerAdress` varchar(255) NOT NULL, `orderDate` varchar(255) NOT NULL, `orderedPart` varchar(255) NOT NULL, `amount` int NOT NULL, PRIMARY KEY (`id`)) ENGINE=InnoDB");
        await queryRunner.query("CREATE TABLE `parts_numbers` (`id` int NOT NULL AUTO_INCREMENT, `partID` varchar(255) NOT NULL, `unitID` varchar(255) NOT NULL, `unitAmount` varchar(255) NOT NULL, PRIMARY KEY (`id`)) ENGINE=InnoDB");
        await queryRunner.query("CREATE TABLE `parts` (`id` int NOT NULL AUTO_INCREMENT, `partName` varchar(255) NOT NULL, `date` varchar(255) NOT NULL, PRIMARY KEY (`id`)) ENGINE=InnoDB");
        await queryRunner.query("CREATE TABLE `unit` (`id` int NOT NULL AUTO_INCREMENT, `name` varchar(255) NOT NULL, `date` varchar(255) NOT NULL, `onStrorage` int NOT NULL, PRIMARY KEY (`id`)) ENGINE=InnoDB");
    }

    public async down(queryRunner: QueryRunner): Promise<any> {
        await queryRunner.query("DROP TABLE `unit`");
        await queryRunner.query("DROP TABLE `parts`");
        await queryRunner.query("DROP TABLE `parts_numbers`");
        await queryRunner.query("DROP TABLE `customer_order`");
    }

}
