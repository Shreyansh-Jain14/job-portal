import * as Knex from "knex";
import { timestamps } from '../helpers';

export async function up(knex: Knex): Promise<void> {
    return knex.schema.createTable('jobs', function (table) {
        table.bigIncrements('id');
        table.uuid('uuid').index();
        table.string('title');
        table.string('location').nullable();
        table.string('recruiterName');
        table.string('CTC');
        timestamps(knex, table);
      });

}


export async function down(knex: Knex): Promise<void> {
    return knex.schema.dropTableIfExists('jobs');
}
