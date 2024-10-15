import { MigrationInterface, QueryRunner } from 'typeorm'

export class AddSlug1729027128698 implements MigrationInterface {
  name = 'AddSlug1729027128698'

  public async up(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(
      `CREATE TABLE "temporary_item" ("id" varchar PRIMARY KEY NOT NULL, "name" varchar NOT NULL, "price" integer NOT NULL, "stock" integer NOT NULL, "slug" varchar NOT NULL)`,
    )
    await queryRunner.query(
      `INSERT INTO "temporary_item"("id", "name", "price", "stock") SELECT "id", "name", "price", "stock" FROM "item"`,
    )
    await queryRunner.query(`DROP TABLE "item"`)
    await queryRunner.query(`ALTER TABLE "temporary_item" RENAME TO "item"`)
  }

  public async down(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(`ALTER TABLE "item" RENAME TO "temporary_item"`)
    await queryRunner.query(
      `CREATE TABLE "item" ("id" varchar PRIMARY KEY NOT NULL, "name" varchar NOT NULL, "price" integer NOT NULL, "stock" integer NOT NULL)`,
    )
    await queryRunner.query(
      `INSERT INTO "item"("id", "name", "price", "stock") SELECT "id", "name", "price", "stock" FROM "temporary_item"`,
    )
    await queryRunner.query(`DROP TABLE "temporary_item"`)
  }
}
