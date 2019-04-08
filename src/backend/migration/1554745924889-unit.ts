import {MigrationInterface, QueryRunner} from "typeorm";

export class unit1554745924889 implements MigrationInterface {

    public async up(queryRunner: QueryRunner): Promise<any> {
        await queryRunner.query("CREATE TABLE `unit` (`warehouseNumber` int NOT NULL AUTO_INCREMENT, `name` varchar(255) NOT NULL, `date` varchar(255) NOT NULL, `onStrorage` int NOT NULL, PRIMARY KEY (`warehouseNumber`)) ENGINE=InnoDB");
    }

    public async down(queryRunner: QueryRunner): Promise<any> {
        await queryRunner.query("DROP TABLE `unit`");
    }

}
