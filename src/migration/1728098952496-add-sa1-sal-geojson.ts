import type { MigrationInterface, QueryRunner } from "typeorm";

export class AddSa1SalGeojson1728098952496 implements MigrationInterface {
  name = "AddSa1SalGeojson1728098952496";

  public async up(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(
      `CREATE TABLE "sal" ("code" character varying NOT NULL, "name" character varying NOT NULL, "stateCode" character varying NOT NULL, "stateName" character varying NOT NULL, "countryCode" character varying NOT NULL, "countryName" character varying NOT NULL, "areaSqKm" double precision NOT NULL, "lociUri" character varying NOT NULL, "shapeLength" double precision NOT NULL, "shapeArea" double precision NOT NULL, "geometry" geometry(MultiPolygon,4326) NOT NULL, CONSTRAINT "PK_0c749f9af14b005fe392e5528b3" PRIMARY KEY ("code"))`,
    );
    await queryRunner.query(
      `CREATE TABLE "sa1" ("code" character varying NOT NULL, "changeFlag" character varying NOT NULL, "changeLabel" character varying NOT NULL, "sa2Code" character varying NOT NULL, "sa2Name" character varying NOT NULL, "sa3Code" character varying NOT NULL, "sa3Name" character varying NOT NULL, "sa4Code" character varying NOT NULL, "sa4Name" character varying NOT NULL, "gccCode" character varying NOT NULL, "gccName" character varying NOT NULL, "stateCode" character varying NOT NULL, "stateName" character varying NOT NULL, "countryCode" character varying NOT NULL, "countryName" character varying NOT NULL, "areaSqKm" double precision NOT NULL, "lociUri" character varying NOT NULL, "geometry" geometry(MultiPolygon,4326) NOT NULL, CONSTRAINT "PK_4ca1da08c5658c4497ce92cfe8c" PRIMARY KEY ("code"))`,
    );
  }

  public async down(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(`DROP TABLE "sa1"`);
    await queryRunner.query(`DROP TABLE "sal"`);
  }
}
