import { MigrationInterface, QueryRunner } from "typeorm";

export class AddNewPropertyPriceType1729164543951 implements MigrationInterface {
    name = 'AddNewPropertyPriceType1729164543951'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`CREATE TABLE "property_price" ("id" SERIAL NOT NULL, "type" character varying NOT NULL, "bedrooms" integer NOT NULL, "value" double precision NOT NULL, "fromDate" date NOT NULL, "toDate" date NOT NULL, "salCode" character varying, CONSTRAINT "PK_9c031caafbc3892ad5401197c34" PRIMARY KEY ("id"))`);
        await queryRunner.query(`ALTER TABLE "property_price" ADD CONSTRAINT "FK_a97c77e3188d06b97192c9644e4" FOREIGN KEY ("salCode") REFERENCES "sal"("code") ON DELETE NO ACTION ON UPDATE NO ACTION`);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "property_price" DROP CONSTRAINT "FK_a97c77e3188d06b97192c9644e4"`);
        await queryRunner.query(`DROP TABLE "property_price"`);
    }

}
