import {MigrationInterface, QueryRunner} from "typeorm";

export class columnChanges1558542098614 implements MigrationInterface {

    public async up(queryRunner: QueryRunner): Promise<any> {
        await queryRunner.query("CREATE TABLE `parts_numbers` (`id` int NOT NULL AUTO_INCREMENT, `partID` varchar(255) NOT NULL, `unitID` varchar(255) NOT NULL, `name` varchar(255) NOT NULL, `unitAmount` varchar(255) NOT NULL, `type` varchar(255) NOT NULL, PRIMARY KEY (`id`)) ENGINE=InnoDB");
    }

    public async down(queryRunner: QueryRunner): Promise<any> {
        await queryRunner.query("DROP TABLE `parts_numbers`");
    }

}
