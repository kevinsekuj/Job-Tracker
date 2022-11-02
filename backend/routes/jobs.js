import { Router } from "express";
import job from "../controllers/jobController.js";

const router = Router();

router.route("/").get(job.read).post(job.create).delete(job.removeAll);

router.route("/:id").get(job.getById).put(job.update);

export default router;
