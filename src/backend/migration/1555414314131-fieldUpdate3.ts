import {MigrationInterface, QueryRunner} from "typeorm";

export class fieldUpdate31555414314131 implements MigrationInterface {

    public async up(queryRunner: QueryRunner): Promise<any> {
        await queryRunner.query("ALTER TABLE `unit` CHANGE `onStrorage` `onStorage` int NULL DEFAULT '0'");
    }

    public async down(queryRunner: QueryRunner): Promise<any> {
        await queryRunner.query("ALTER TABLE `unit` CHANGE `onStorage` `onStrorage` int NULL DEFAULT '0'");
    }

}
