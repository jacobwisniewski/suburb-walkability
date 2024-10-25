import type { MigrationInterface, QueryRunner } from "typeorm";

export class MakeAreaNullable1728218286494 implements MigrationInterface {
  name = "MakeAreaNullable1728218286494";

  public async up(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(
      `ALTER TABLE "sa1" ALTER COLUMN "areaSqKm" DROP NOT NULL`,
    );
  }

  public async down(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(
      `ALTER TABLE "sa1" ALTER COLUMN "areaSqKm" SET NOT NULL`,
    );
  }
}
