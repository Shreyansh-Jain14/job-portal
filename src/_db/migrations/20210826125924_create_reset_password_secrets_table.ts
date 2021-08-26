import * as Knex from "knex";
import { timestamps } from "../helpers";


export async function up(knex: Knex): Promise<void> {

    return knex.schema.createTable('resetPasswordSecrets', (table) => {
        table.uuid('id').notNullable().primary();
        timestamps(knex, table);
        table.string('userId').notNullable().references('id').inTable('users');
        table.string('secret').notNullable();
        table.dateTime('expiresAt').notNullable();
        table.integer('isUsed').nullable().defaultTo(0);
      });
}


export async function down(knex: Knex): Promise<void> {
    return knex.schema.dropTableIfExists('resetPasswordSecrets');
}

