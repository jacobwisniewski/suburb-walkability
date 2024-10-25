import { MigrationInterface, QueryRunner } from "typeorm";

export class AddAldiType1728997288110 implements MigrationInterface {
    name = 'AddAldiType1728997288110'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`CREATE TABLE "aldi" ("id" integer NOT NULL, "name" character varying NOT NULL, "street" character varying NOT NULL, "suburb" character varying NOT NULL, "state" character varying NOT NULL, "postcode" character varying NOT NULL, CONSTRAINT "PK_baa83c3a8540fd7432474175fa6" PRIMARY KEY ("id"))`);
        await queryRunner.query(`ALTER TABLE "aldi" ADD CONSTRAINT "FK_baa83c3a8540fd7432474175fa6" FOREIGN KEY ("id") REFERENCES "location"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "aldi" DROP CONSTRAINT "FK_baa83c3a8540fd7432474175fa6"`);
        await queryRunner.query(`DROP TABLE "aldi"`);
    }

}
