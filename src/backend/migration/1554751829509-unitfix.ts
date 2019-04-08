import {MigrationInterface, QueryRunner} from "typeorm";

export class unitfix1554751829509 implements MigrationInterface {

    public async up(queryRunner: QueryRunner): Promise<any> {
        await queryRunner.query("ALTER TABLE `unit` CHANGE `warehouseNumber` `id` int NOT NULL AUTO_INCREMENT");
    }

    public async down(queryRunner: QueryRunner): Promise<any> {
        await queryRunner.query("ALTER TABLE `unit` CHANGE `id` `warehouseNumber` int NOT NULL AUTO_INCREMENT");
    }

}
