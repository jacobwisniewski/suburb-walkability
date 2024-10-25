import { type MigrationInterface, type QueryRunner } from "typeorm";

export class MakePtvStationWoolworthsChildEntity1727938025935
  implements MigrationInterface
{
  name = "MakePtvStationWoolworthsChildEntity1727938025935";

  public async up(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(
      `ALTER TABLE "location" ADD "name" character varying`,
    );
    await queryRunner.query(
      `ALTER TABLE "location" ADD "streetName" character varying`,
    );
    await queryRunner.query(
      `ALTER TABLE "location" ADD "town" character varying`,
    );
    await queryRunner.query(
      `ALTER TABLE "location" ADD "state" character varying`,
    );
    await queryRunner.query(
      `ALTER TABLE "location" ADD "postcode" character varying`,
    );
    await queryRunner.query(
      `ALTER TABLE "location" ADD "stopId" character varying`,
    );
    await queryRunner.query(
      `ALTER TABLE "location" ADD "stopName" character varying`,
    );
    await queryRunner.query(
      `ALTER TABLE "location" ADD "lineName" character varying`,
    );
  }

  public async down(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(`ALTER TABLE "location" DROP COLUMN "lineName"`);
    await queryRunner.query(`ALTER TABLE "location" DROP COLUMN "stopName"`);
    await queryRunner.query(`ALTER TABLE "location" DROP COLUMN "stopId"`);
    await queryRunner.query(`ALTER TABLE "location" DROP COLUMN "postcode"`);
    await queryRunner.query(`ALTER TABLE "location" DROP COLUMN "state"`);
    await queryRunner.query(`ALTER TABLE "location" DROP COLUMN "town"`);
    await queryRunner.query(`ALTER TABLE "location" DROP COLUMN "streetName"`);
    await queryRunner.query(`ALTER TABLE "location" DROP COLUMN "name"`);
  }
}
