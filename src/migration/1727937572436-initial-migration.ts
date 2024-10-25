import type { MigrationInterface, QueryRunner } from "typeorm";

export class InitialMigration1727937572436 implements MigrationInterface {
  name = "InitialMigration1727937572436";

  public async up(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(
      `CREATE TABLE "isochrone" ("id" SERIAL NOT NULL, "transportType" character varying NOT NULL, "method" character varying NOT NULL, "value" integer NOT NULL, "geom" geometry(Polygon,4326) NOT NULL, CONSTRAINT "PK_d113eacff60341fb0b5a78b99b9" PRIMARY KEY ("id"))`,
    );
    await queryRunner.query(
      `CREATE TABLE "location" ("id" SERIAL NOT NULL, "geom" geometry(Point,4326) NOT NULL, CONSTRAINT "PK_876d7bdba03c72251ec4c2dc827" PRIMARY KEY ("id"))`,
    );
    await queryRunner.query(
      `CREATE TABLE "ptv_station" ("id" SERIAL NOT NULL, "geom" geometry(Point,4326) NOT NULL, "stopId" character varying NOT NULL, "stopName" character varying NOT NULL, "lineName" character varying NOT NULL, CONSTRAINT "PK_4190e8461dafeeb904af92c999b" PRIMARY KEY ("id"))`,
    );
    await queryRunner.query(
      `CREATE TABLE "woolworths_store" ("id" SERIAL NOT NULL, "geom" geometry(Point,4326) NOT NULL, "name" character varying NOT NULL, "streetName" character varying NOT NULL, "town" character varying NOT NULL, "state" character varying NOT NULL, "postcode" character varying NOT NULL, CONSTRAINT "PK_183ed4350c426220f1635350440" PRIMARY KEY ("id"))`,
    );
    await queryRunner.query(
      `CREATE TABLE "location_with_isochrone" ("id" SERIAL NOT NULL, "isochroneId" integer, CONSTRAINT "PK_03c2727c633f935e3430af23c90" PRIMARY KEY ("id"))`,
    );
    await queryRunner.query(
      `ALTER TABLE "location_with_isochrone" ADD CONSTRAINT "FK_3f08538140207107ae0ee855e07" FOREIGN KEY ("isochroneId") REFERENCES "isochrone"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`,
    );
  }

  public async down(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(
      `ALTER TABLE "location_with_isochrone" DROP CONSTRAINT "FK_3f08538140207107ae0ee855e07"`,
    );
    await queryRunner.query(`DROP TABLE "location_with_isochrone"`);
    await queryRunner.query(`DROP TABLE "woolworths_store"`);
    await queryRunner.query(`DROP TABLE "ptv_station"`);
    await queryRunner.query(`DROP TABLE "location"`);
    await queryRunner.query(`DROP TABLE "isochrone"`);
  }
}
