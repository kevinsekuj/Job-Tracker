// TODO connect to mysql db

import { Sequelize } from "sequelize";

export default async function connectToDb() {
  const dialect = process.env.DB_DIALECT;
  const username = process.env.DB_USER;
  const password = process.env.DB_PASS;
  const host = process.env.DB_HOST;
  const port = process.env.DB_PORT;
  const database = process.env.DB_NAME;

  // Connect to database.
  const sequelize = new Sequelize(
    `${dialect}://${username}:${password}@${host}:${port}/${database}`
  );

  return sequelize;
}
