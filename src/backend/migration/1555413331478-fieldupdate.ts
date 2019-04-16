import {MigrationInterface, QueryRunner} from "typeorm";

export class fieldupdate1555413331478 implements MigrationInterface {

    public async up(queryRunner: QueryRunner): Promise<any> {
        await queryRunner.query("ALTER TABLE `unit` CHANGE `onStrorage` `onStrorage` int NULL");
    }

    public async down(queryRunner: QueryRunner): Promise<any> {
        await queryRunner.query("ALTER TABLE `unit` CHANGE `onStrorage` `onStrorage` int NOT NULL");
    }

}
