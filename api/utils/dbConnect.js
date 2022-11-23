import dotenv from "dotenv";
if (process.env.NODE_ENV !== "production") dotenv.config();

import { Sequelize } from "sequelize";
import defineModels from "./defineModels.js";
import addAssociations from "./addAssociations.js";

async function connectToDb() {
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

const db = {};
db.Sequelize = Sequelize;
db.sequelize = await connectToDb();

defineModels(db.sequelize);
addAssociations(db.sequelize);

export { db };
