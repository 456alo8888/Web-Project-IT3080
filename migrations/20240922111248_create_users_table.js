/**
 * @param {import('knex').Knex} knex
 * @returns {Promise<void>}
 */
export function up(knex) {
  return knex.schema.createTable("users", function (table) {
    table.increments("id");
    table.string("username", 255).notNullable();
    table.string("password", 255).notNullable();
  });
}

/**
 * @param {import('knex').Knex} knex
 * @returns {Promise<void>}
 */
export function down(knex) {
  return knex.schema.dropTableIfExists("users");
}
