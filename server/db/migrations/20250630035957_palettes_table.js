/**
 * @param { import("knex").Knex } knex
 * @returns { Promise<void> }
 */
exports.up = function (knex) {
  return knex.schema.createTable("palettes", function (table) {
    table.increments("id").primary();
    table.integer("user_id").unsigned().references("id").inTable("users");
    table.text("title", 25).notNullable();
    table.specificType("colors", "text[]").notNullable();
    table.text("temperature").notNullable();
    table.timestamp("date_made").defaultTo(knex.fn.now()).notNullable();
  });
};

/**
 * @param { import("knex").Knex } knex
 * @returns { Promise<void> }
 */
exports.down = function (knex) {
  return knex.schema.dropTableIfExists("palettes");
};
