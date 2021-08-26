import * as bcrypt from 'bcrypt';
import * as Knex from 'knex';
import { v4 as uuidv4 } from 'uuid';

export async function seed(knex: Knex): Promise<void> {
  // Deletes ALL existing entries
  // await knex('users').del();

  // Inserts seed entries
  await knex('users').insert([
   
    {
      id: uuidv4(),
      name: 'Shreyansh',
      email: 'shreyansh@mail.com',
      password: await bcrypt.hash('pass', 1),
      role: 'ADMIN',
    },
  ]);
}