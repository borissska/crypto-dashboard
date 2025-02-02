import type { Knex } from "knex";


export async function up(knex: Knex): Promise<void> {
    return knex.schema.createTable("tickers", (table) => {
        table.increments("id").primary();
        table.string('ticker').notNullable().unique();
        table.string('name').nullable();
      });
}


export async function down(knex: Knex): Promise<void> {
    return knex.schema.dropTableIfExists("tickers");
}

