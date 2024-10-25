import { MigrationInterface, QueryRunner } from "typeorm";

export class AddLocationType1728972969942 implements MigrationInterface {
    name = 'AddLocationType1728972969942'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`CREATE TABLE "location_type" ("id" SERIAL NOT NULL, "name" character varying NOT NULL, CONSTRAINT "PK_f765ccd86804048e9c1ea71db99" PRIMARY KEY ("id"))`);
        await queryRunner.query(`ALTER TABLE "location" ADD "locationTypeId" integer`);
        await queryRunner.query(`ALTER TABLE "location" ADD CONSTRAINT "FK_84ea3d2e2ec24158c09e2b85d12" FOREIGN KEY ("locationTypeId") REFERENCES "location_type"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "location" DROP CONSTRAINT "FK_84ea3d2e2ec24158c09e2b85d12"`);
        await queryRunner.query(`ALTER TABLE "location" DROP COLUMN "locationTypeId"`);
        await queryRunner.query(`DROP TABLE "location_type"`);
    }

}
