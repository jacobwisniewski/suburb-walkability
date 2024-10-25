import { MigrationInterface, QueryRunner } from "typeorm";

export class AddSTIntersectionArrayFunction1728981434123
  implements MigrationInterface
{
  public async up(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(`
            CREATE OR REPLACE FUNCTION ST_IntersectionArray(geoms geometry[]) RETURNS geometry AS $$
            DECLARE
                i INTEGER;
                tmpGeom geometry;
            BEGIN
                tmpGeom := geoms[1];
                FOR i IN 1..array_length(geoms, 1) LOOP
                    tmpGeom := ST_Intersection(tmpGeom, geoms[i]);
                END LOOP;
                RETURN tmpGeom;
            END;
            $$ LANGUAGE plpgsql;
        `);
  }

  public async down(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(`
            DROP FUNCTION IF EXISTS ST_IntersectionArray(geoms geometry[]);
        `);
  }
}
