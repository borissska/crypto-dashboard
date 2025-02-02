import type { Knex } from "knex";

export async function up(knex: Knex): Promise<void> {
  return knex.schema.createTable("portfolios", (table) => {
    table.increments("id").primary();
    table
      .integer("user_id")
      .unsigned()
      .notNullable()
      .references("id")
      .inTable("users")
      .onDelete("CASCADE")
      .onUpdate("CASCADE");
    table
      .integer("ticker_id")
      .unsigned()
      .notNullable()
      .references("id")
      .inTable("tickers")
      .onDelete("CASCADE")
      .onUpdate("CASCADE");
    table.string("amount").notNullable();
  });
}

export async function down(knex: Knex): Promise<void> {
  return knex.schema.dropTableIfExists("portfolios");
}
