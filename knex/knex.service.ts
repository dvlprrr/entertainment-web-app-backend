import knex from "knex";

export const knexService = knex({
  client: "pg",
  connection: {
    host: process.env.HOST,
    user: process.env.USER,
    password: process.env.PASSWORD,
    database: process.env.DATABASE,
  },
});
