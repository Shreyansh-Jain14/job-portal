import Knex = require('knex');
import { timestamps } from '../helpers';

export async function up(knex: Knex): Promise<void> {
  return knex.schema.createTable('users', function (table) {
    table.uuid('id').index().primary();
    table.string('name');
    table.string('email').nullable();
    table.string('password').nullable().index();
    table.string('role');
    timestamps(knex, table);
  });
}

export async function down(knex: Knex): Promise<void> {
  return knex.schema.dropTableIfExists('users');
}
