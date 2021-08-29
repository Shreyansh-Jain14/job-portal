import * as Knex from 'knex';
import { timestamps } from '../helpers';

export async function up(knex: Knex): Promise<void> {
  return knex.schema.createTable('applications', (table) => {
    table.uuid('id').index().primary();
    table.string('jobId').notNullable().references('id').inTable('jobs');
    table.string('userId').notNullable().references('id').inTable('users');
    timestamps(knex, table);
  });
}

export async function down(knex: Knex): Promise<void> {
  return knex.schema.dropTableIfExists('applications');
}

