import * as Knex from "knex";
import { timestamps } from '../helpers';

export async function up(knex: Knex): Promise<void> {
    return knex.schema.createTable('jobs', function (table) {
        table.uuid('id').index().primary();
        table.string('title');
        table.string('location').nullable();
        table.string('recruiterid').references('id').inTable('users');;
        table.string('CTC');
        timestamps(knex, table);
      });

}


export async function down(knex: Knex): Promise<void> {
    return knex.schema.dropTableIfExists('jobs');
}

