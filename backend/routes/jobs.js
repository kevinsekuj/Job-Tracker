import { Router } from "express";
import job from "../controllers/jobController.js";

const router = Router();

router
  .route("/")
  .get(job.read)
  .post(job.create)
  .put(job.update)
  .delete(job.del);

export default router;
