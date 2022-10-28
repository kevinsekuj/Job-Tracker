import dotenv from "dotenv";

if (process.env.NODE_ENV !== "production") dotenv.config();

import cors from "cors";
import express from "express";
import { PORT } from "./utils/constants.js";
import connectToDb from "./utils/dbConnect.js";
import HTTPError from "./utils/error.js";

const app = express();
app.use(cors());
app.use(express.json());

app.listen(PORT, () => {
  console.log(`Listening on port ${PORT}`);
});

const sequelize = await connectToDb();
try {
  await sequelize.authenticate();
  console.log("Connected to RDS MySQL database.");
} catch (error) {
  console.error("Unable to connect to the database:", error);
  process.exit(1);
}

import jobs from "./routes/jobs.js";

app.use("/jobs", jobs);

app.all("*", (_req, _res, next) => {
  next(new HTTPError("Resource not found.", 404));
});

app.use((err, _req, res, _next) => {
  res.status(err.status).json({ error: err.message, status: err.status });
});
