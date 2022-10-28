import dotenv from "dotenv";

if (process.env.NODE_ENV !== "production") dotenv.config();

import express from "express";
import cors from "cors";
import { PORT } from "./utils/constants.js";
import HTTPError from "./utils/error.js";
import connectToDb from "./utils/dbConnect.js";

const app = express();
app.use(cors());
app.use(express.json());

app.listen(PORT, () => {
  console.log(`Listening on port ${PORT}`);
});

(async () => {
  console.log(await connectToDb());
})();

import jobs from "./routes/jobs.js";

app.use("/jobs", jobs);

app.all("*", (_req, _res, next) => {
  next(new HTTPError("Resource not found.", 404));
});

app.use((err, _req, res, _next) => {
  res.status(err.status).json({ error: err.message, status: err.status });
});
