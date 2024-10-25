import type { MigrationInterface, QueryRunner } from "typeorm";

export class MakeLocationPrimaryColumn1727938256979
  implements MigrationInterface
{
  name = "MakeLocationPrimaryColumn1727938256979";

  public async up(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(
      `ALTER TABLE "woolworths_store" DROP CONSTRAINT "PK_183ed4350c426220f1635350440"`,
    );
    await queryRunner.query(`ALTER TABLE "woolworths_store" DROP COLUMN "id"`);
    await queryRunner.query(
      `ALTER TABLE "woolworths_store" DROP COLUMN "geom"`,
    );
    await queryRunner.query(
      `ALTER TABLE "ptv_station" DROP CONSTRAINT "PK_4190e8461dafeeb904af92c999b"`,
    );
    await queryRunner.query(`ALTER TABLE "ptv_station" DROP COLUMN "id"`);
    await queryRunner.query(`ALTER TABLE "ptv_station" DROP COLUMN "geom"`);
    await queryRunner.query(
      `ALTER TABLE "woolworths_store" ADD "location" SERIAL NOT NULL`,
    );
    await queryRunner.query(
      `ALTER TABLE "woolworths_store" ADD CONSTRAINT "PK_e64ff0f1a3473d150163af52e6a" PRIMARY KEY ("location")`,
    );
    await queryRunner.query(
      `ALTER TABLE "ptv_station" ADD "location" SERIAL NOT NULL`,
    );
    await queryRunner.query(
      `ALTER TABLE "ptv_station" ADD CONSTRAINT "PK_002af290928923d2b80db80b6fb" PRIMARY KEY ("location")`,
    );
  }

  public async down(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(
      `ALTER TABLE "ptv_station" DROP CONSTRAINT "PK_002af290928923d2b80db80b6fb"`,
    );
    await queryRunner.query(`ALTER TABLE "ptv_station" DROP COLUMN "location"`);
    await queryRunner.query(
      `ALTER TABLE "woolworths_store" DROP CONSTRAINT "PK_e64ff0f1a3473d150163af52e6a"`,
    );
    await queryRunner.query(
      `ALTER TABLE "woolworths_store" DROP COLUMN "location"`,
    );
    await queryRunner.query(
      `ALTER TABLE "ptv_station" ADD "geom" geometry(POINT,4326) NOT NULL`,
    );
    await queryRunner.query(
      `ALTER TABLE "ptv_station" ADD "id" SERIAL NOT NULL`,
    );
    await queryRunner.query(
      `ALTER TABLE "ptv_station" ADD CONSTRAINT "PK_4190e8461dafeeb904af92c999b" PRIMARY KEY ("id")`,
    );
    await queryRunner.query(
      `ALTER TABLE "woolworths_store" ADD "geom" geometry(POINT,4326) NOT NULL`,
    );
    await queryRunner.query(
      `ALTER TABLE "woolworths_store" ADD "id" SERIAL NOT NULL`,
    );
    await queryRunner.query(
      `ALTER TABLE "woolworths_store" ADD CONSTRAINT "PK_183ed4350c426220f1635350440" PRIMARY KEY ("id")`,
    );
  }
}
