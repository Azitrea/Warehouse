import {MigrationInterface, QueryRunner} from "typeorm";

export class fieldUpdate21555413927080 implements MigrationInterface {

    public async up(queryRunner: QueryRunner): Promise<any> {
        await queryRunner.query("ALTER TABLE `unit` CHANGE `onStrorage` `onStrorage` int NULL DEFAULT 0");
    }

    public async down(queryRunner: QueryRunner): Promise<any> {
        await queryRunner.query("ALTER TABLE `unit` CHANGE `onStrorage` `onStrorage` int NULL");
    }

}
