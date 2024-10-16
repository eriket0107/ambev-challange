import { MigrationInterface, QueryRunner } from "typeorm";

export class UpdateSaleTem1729034237017 implements MigrationInterface {
    name = 'UpdateSaleTem1729034237017'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`CREATE TABLE "temporary_sale_item" ("id" varchar PRIMARY KEY NOT NULL, "quantity" integer NOT NULL, "saleId" varchar, "itemId" varchar, "discount" integer NOT NULL, "totalValue" integer NOT NULL, "unitPrice" integer NOT NULL, CONSTRAINT "FK_9aab199361626720353ca67f825" FOREIGN KEY ("itemId") REFERENCES "item" ("id") ON DELETE CASCADE ON UPDATE NO ACTION, CONSTRAINT "FK_59208ed392dd61056abbcf1482e" FOREIGN KEY ("saleId") REFERENCES "sale" ("id") ON DELETE CASCADE ON UPDATE NO ACTION)`);
        await queryRunner.query(`INSERT INTO "temporary_sale_item"("id", "quantity", "saleId", "itemId") SELECT "id", "quantity", "saleId", "itemId" FROM "sale_item"`);
        await queryRunner.query(`DROP TABLE "sale_item"`);
        await queryRunner.query(`ALTER TABLE "temporary_sale_item" RENAME TO "sale_item"`);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "sale_item" RENAME TO "temporary_sale_item"`);
        await queryRunner.query(`CREATE TABLE "sale_item" ("id" varchar PRIMARY KEY NOT NULL, "quantity" integer NOT NULL, "saleId" varchar, "itemId" varchar, CONSTRAINT "FK_9aab199361626720353ca67f825" FOREIGN KEY ("itemId") REFERENCES "item" ("id") ON DELETE CASCADE ON UPDATE NO ACTION, CONSTRAINT "FK_59208ed392dd61056abbcf1482e" FOREIGN KEY ("saleId") REFERENCES "sale" ("id") ON DELETE CASCADE ON UPDATE NO ACTION)`);
        await queryRunner.query(`INSERT INTO "sale_item"("id", "quantity", "saleId", "itemId") SELECT "id", "quantity", "saleId", "itemId" FROM "temporary_sale_item"`);
        await queryRunner.query(`DROP TABLE "temporary_sale_item"`);
    }

}
