import dotenv from "dotenv";
if (process.env.NODE_ENV !== "production") dotenv.config();

import pg from "pg";
import { Sequelize } from "sequelize";
import addAssociations from "./addAssociations.js";
import defineModels from "./defineModels.js";

async function connectToDb() {
  const dialect = process.env.DB_DIALECT;
  const username = process.env.DB_USER;
  const password = process.env.DB_PASS;
  const host = process.env.DB_HOST;
  const port = process.env.DB_PORT;
  const database = process.env.DB_NAME;

  // Connect to database.
  const sequelize = new Sequelize(
    `${dialect}://${username}:${password}@${host}:${port}/${database}`,
    {
      dialectModule: pg,
    }
  );

  return sequelize;
}

const db = {};
db.Sequelize = Sequelize;
db.sequelize = await connectToDb();

defineModels(db.sequelize);
addAssociations(db.sequelize);

export { db };
