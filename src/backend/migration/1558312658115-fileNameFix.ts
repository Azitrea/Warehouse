import {MigrationInterface, QueryRunner} from "typeorm";

export class fileNameFix1558312658115 implements MigrationInterface {

    public async up(queryRunner: QueryRunner): Promise<any> {
        await queryRunner.query("ALTER TABLE `customer_order` CHANGE `customerAdress` `customerAddress` varchar(255) NOT NULL");
    }

    public async down(queryRunner: QueryRunner): Promise<any> {
        await queryRunner.query("ALTER TABLE `customer_order` CHANGE `customerAddress` `customerAdress` varchar(255) NOT NULL");
    }

}
