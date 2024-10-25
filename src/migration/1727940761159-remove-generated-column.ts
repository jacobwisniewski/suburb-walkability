import type { MigrationInterface, QueryRunner } from "typeorm";

export class RemoveGeneratedColumn1727940761159 implements MigrationInterface {
  name = "RemoveGeneratedColumn1727940761159";

  public async up(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(
      `ALTER TABLE "woolworths_store" DROP CONSTRAINT "FK_183ed4350c426220f1635350440"`,
    );
    await queryRunner.query(
      `ALTER TABLE "woolworths_store" ALTER COLUMN "id" DROP DEFAULT`,
    );
    await queryRunner.query(`DROP SEQUENCE "woolworths_store_id_seq"`);
    await queryRunner.query(
      `ALTER TABLE "ptv_station" DROP CONSTRAINT "FK_4190e8461dafeeb904af92c999b"`,
    );
    await queryRunner.query(
      `ALTER TABLE "ptv_station" ALTER COLUMN "id" DROP DEFAULT`,
    );
    await queryRunner.query(`DROP SEQUENCE "ptv_station_id_seq"`);
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
    await queryRunner.query(
      `CREATE SEQUENCE IF NOT EXISTS "ptv_station_id_seq" OWNED BY "ptv_station"."id"`,
    );
    await queryRunner.query(
      `ALTER TABLE "ptv_station" ALTER COLUMN "id" SET DEFAULT nextval('"ptv_station_id_seq"')`,
    );
    await queryRunner.query(
      `ALTER TABLE "ptv_station" ADD CONSTRAINT "FK_4190e8461dafeeb904af92c999b" FOREIGN KEY ("id") REFERENCES "location"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`,
    );
    await queryRunner.query(
      `CREATE SEQUENCE IF NOT EXISTS "woolworths_store_id_seq" OWNED BY "woolworths_store"."id"`,
    );
    await queryRunner.query(
      `ALTER TABLE "woolworths_store" ALTER COLUMN "id" SET DEFAULT nextval('"woolworths_store_id_seq"')`,
    );
    await queryRunner.query(
      `ALTER TABLE "woolworths_store" ADD CONSTRAINT "FK_183ed4350c426220f1635350440" FOREIGN KEY ("id") REFERENCES "location"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`,
    );
  }
}
