import dotenv from "dotenv";

if (process.env.NODE_ENV !== "production") dotenv.config();

import cors from "cors";
import express from "express";
import { PORT } from "./utils/constants.js";
import connectToDb from "./utils/dbConnect.js";
import defineModels from "./utils/defineModels.js";
import HTTPError from "./utils/error.js";

const app = express();
app.use(cors());
app.use(express.json());

app.listen(PORT, () => {
  console.log(`Listening on port ${PORT}`);
});

// Connect to database
const sequelize = await connectToDb();
try {
  await sequelize.authenticate();
  console.log("Connected to RDS MySQL database.");
} catch (error) {
  console.error("Unable to connect to the database:", error);
  process.exit(1);
}
// Drop database tables if needed and synchronize
try {
  const drop_and_resync = process.env.NODE_ENV === "production" ? true : false;
  await sequelize.sync({ force: drop_and_resync });
  console.log("Synced database.");
} catch (error) {
  console.error("Failed to sync database: " + error.message);
  process.exit(1);
}
// Define models with Sequelize instance
defineModels(sequelize);

import users from "./routes/users.js";
app.use("/users", users);

app.all("*", (_req, _res, next) => {
  next(new HTTPError("Resource not found.", 404));
});

app.use((err, _req, res, _next) => {
  res.status(err.status).json({ error: err.message, status: err.status });
});
