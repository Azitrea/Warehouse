import {MigrationInterface, QueryRunner} from "typeorm";

export class columnChanges21558571088200 implements MigrationInterface {

    public async up(queryRunner: QueryRunner): Promise<any> {
        await queryRunner.query("ALTER TABLE `parts` CHANGE `partName` `name` varchar(255) NOT NULL");
    }

    public async down(queryRunner: QueryRunner): Promise<any> {
        await queryRunner.query("ALTER TABLE `parts` CHANGE `name` `partName` varchar(255) NOT NULL");
    }

}
