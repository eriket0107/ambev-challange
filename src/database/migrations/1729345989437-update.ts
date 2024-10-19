import { MigrationInterface, QueryRunner } from "typeorm";

export class Update1729345989437 implements MigrationInterface {
    name = 'Update1729345989437'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`CREATE TABLE "temporary_sale" ("id" varchar PRIMARY KEY NOT NULL, "saleNumber" varchar NOT NULL, "executedAt" date NOT NULL, "totalValue" integer NOT NULL, "customerName" varchar NOT NULL, "branch" varchar NOT NULL, "discount" integer, "isCancelled" boolean NOT NULL DEFAULT (0), "updatedAt" date NOT NULL DEFAULT (datetime('now')), "createdAt" date NOT NULL DEFAULT (datetime('now')))`);
        await queryRunner.query(`INSERT INTO "temporary_sale"("id", "saleNumber", "executedAt", "totalValue", "customerName", "branch", "discount", "isCancelled", "updatedAt") SELECT "id", "saleNumber", "executedAt", "totalValue", "customerName", "branch", "discount", "isCancelled", "updatedAt" FROM "sale"`);
        await queryRunner.query(`DROP TABLE "sale"`);
        await queryRunner.query(`ALTER TABLE "temporary_sale" RENAME TO "sale"`);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "sale" RENAME TO "temporary_sale"`);
        await queryRunner.query(`CREATE TABLE "sale" ("id" varchar PRIMARY KEY NOT NULL, "saleNumber" varchar NOT NULL, "executedAt" date NOT NULL, "totalValue" integer NOT NULL, "customerName" varchar NOT NULL, "branch" varchar NOT NULL, "discount" integer, "isCancelled" boolean NOT NULL DEFAULT (0), "updatedAt" date NOT NULL DEFAULT (datetime('now')))`);
        await queryRunner.query(`INSERT INTO "sale"("id", "saleNumber", "executedAt", "totalValue", "customerName", "branch", "discount", "isCancelled", "updatedAt") SELECT "id", "saleNumber", "executedAt", "totalValue", "customerName", "branch", "discount", "isCancelled", "updatedAt" FROM "temporary_sale"`);
        await queryRunner.query(`DROP TABLE "temporary_sale"`);
    }

}
