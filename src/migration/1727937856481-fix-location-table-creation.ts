import type { MigrationInterface, QueryRunner } from "typeorm";

export class FixLocationTableCreation1727937856481
  implements MigrationInterface
{
  name = "FixLocationTableCreation1727937856481";

  public async up(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(
      `ALTER TABLE "location" ADD "type" character varying NOT NULL`,
    );
    await queryRunner.query(
      `CREATE INDEX "IDX_f75de36d0d30611d95d6247fd1" ON "location" ("type") `,
    );
  }

  public async down(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(
      `DROP INDEX "public"."IDX_f75de36d0d30611d95d6247fd1"`,
    );
    await queryRunner.query(`ALTER TABLE "location" DROP COLUMN "type"`);
  }
}
