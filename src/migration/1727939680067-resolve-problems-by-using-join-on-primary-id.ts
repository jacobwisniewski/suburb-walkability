import type { MigrationInterface, QueryRunner } from "typeorm";

export class ResolveProblemsByUsingJoinOnPrimaryId1727939680067
  implements MigrationInterface
{
  name = "ResolveProblemsByUsingJoinOnPrimaryId1727939680067";

  public async up(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(
      `DROP INDEX "public"."IDX_f75de36d0d30611d95d6247fd1"`,
    );
    await queryRunner.query(
      `ALTER TABLE "woolworths_store" RENAME COLUMN "location" TO "id"`,
    );
    await queryRunner.query(
      `ALTER TABLE "woolworths_store" RENAME CONSTRAINT "PK_e64ff0f1a3473d150163af52e6a" TO "PK_183ed4350c426220f1635350440"`,
    );
    await queryRunner.query(
      `ALTER SEQUENCE "woolworths_store_location_seq" RENAME TO "woolworths_store_id_seq"`,
    );
    await queryRunner.query(
      `ALTER TABLE "ptv_station" RENAME COLUMN "location" TO "id"`,
    );
    await queryRunner.query(
      `ALTER TABLE "ptv_station" RENAME CONSTRAINT "PK_002af290928923d2b80db80b6fb" TO "PK_4190e8461dafeeb904af92c999b"`,
    );
    await queryRunner.query(
      `ALTER SEQUENCE "ptv_station_location_seq" RENAME TO "ptv_station_id_seq"`,
    );
    await queryRunner.query(`ALTER TABLE "location" DROP COLUMN "type"`);
    await queryRunner.query(
      `ALTER TABLE "isochrone" ADD "locationId" integer NOT NULL`,
    );
    await queryRunner.query(
      `ALTER TABLE "woolworths_store" ADD CONSTRAINT "FK_183ed4350c426220f1635350440" FOREIGN KEY ("id") REFERENCES "location"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`,
    );
    await queryRunner.query(
      `ALTER TABLE "ptv_station" ADD CONSTRAINT "FK_4190e8461dafeeb904af92c999b" FOREIGN KEY ("id") REFERENCES "location"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`,
    );
  }

  public async down(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(
      `ALTER TABLE "ptv_station" DROP CONSTRAINT "FK_4190e8461dafeeb904af92c999b"`,
    );
    await queryRunner.query(
      `ALTER TABLE "woolworths_store" DROP CONSTRAINT "FK_183ed4350c426220f1635350440"`,
    );
    await queryRunner.query(`ALTER TABLE "isochrone" DROP COLUMN "locationId"`);
    await queryRunner.query(
      `ALTER TABLE "location" ADD "type" character varying NOT NULL`,
    );
    await queryRunner.query(
      `ALTER SEQUENCE "ptv_station_id_seq" RENAME TO "ptv_station_location_seq"`,
    );
    await queryRunner.query(
      `ALTER TABLE "ptv_station" RENAME CONSTRAINT "PK_4190e8461dafeeb904af92c999b" TO "PK_002af290928923d2b80db80b6fb"`,
    );
    await queryRunner.query(
      `ALTER TABLE "ptv_station" RENAME COLUMN "id" TO "location"`,
    );
    await queryRunner.query(
      `ALTER SEQUENCE "woolworths_store_id_seq" RENAME TO "woolworths_store_location_seq"`,
    );
    await queryRunner.query(
      `ALTER TABLE "woolworths_store" RENAME CONSTRAINT "PK_183ed4350c426220f1635350440" TO "PK_e64ff0f1a3473d150163af52e6a"`,
    );
    await queryRunner.query(
      `ALTER TABLE "woolworths_store" RENAME COLUMN "id" TO "location"`,
    );
    await queryRunner.query(
      `CREATE INDEX "IDX_f75de36d0d30611d95d6247fd1" ON "location" ("type") `,
    );
  }
}
