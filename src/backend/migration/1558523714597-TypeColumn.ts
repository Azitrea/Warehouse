import {MigrationInterface, QueryRunner} from "typeorm";

export class TypeColumn1558523714597 implements MigrationInterface {

    public async up(queryRunner: QueryRunner): Promise<any> {
        await queryRunner.query("ALTER TABLE `parts` ADD `type` varchar(255) NOT NULL");
        await queryRunner.query("ALTER TABLE `unit` ADD `type` varchar(255) NOT NULL");
    }

    public async down(queryRunner: QueryRunner): Promise<any> {
        await queryRunner.query("ALTER TABLE `unit` DROP COLUMN `type`");
        await queryRunner.query("ALTER TABLE `parts` DROP COLUMN `type`");
    }

}
