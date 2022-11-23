import { Router } from "express";
import job from "../controllers/jobController.js";

const router = Router();

router.route("/").get(job.getByUserId).post(job.create).delete(job.removeById);

router.route("/:id").put(job.update);

export default router;
