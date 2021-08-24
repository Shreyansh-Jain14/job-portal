import * as Knex from "knex";
import { timestamps } from '../helpers';


export async function up(knex: Knex): Promise<void> {
    return knex.schema.createTable('applications', function (table) {
        table.bigIncrements('id');
        table.uuid('uuid').index();
        table.integer('userid');
        table.integer('jobid');
        timestamps(knex, table);
    });
}


export async function down(knex: Knex): Promise<void> {
    return knex.schema.dropTableIfExists('applications');
}

