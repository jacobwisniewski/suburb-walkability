import { MigrationInterface, QueryRunner } from "typeorm";

export class AddColesTable1728981431683 implements MigrationInterface {
    name = 'AddColesTable1728981431683'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`CREATE TABLE "coles" ("id" integer NOT NULL, "name" character varying NOT NULL, "address" character varying NOT NULL, CONSTRAINT "PK_b8b66ede9facee1165efcafe78d" PRIMARY KEY ("id"))`);
        await queryRunner.query(`ALTER TABLE "coles" ADD CONSTRAINT "FK_b8b66ede9facee1165efcafe78d" FOREIGN KEY ("id") REFERENCES "location"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "coles" DROP CONSTRAINT "FK_b8b66ede9facee1165efcafe78d"`);
        await queryRunner.query(`DROP TABLE "coles"`);
    }

}
