import { Router } from "express";
import job from "../controllers/jobController.js";

const router = Router();

router.route("/").get(job.read).post(job.getById).delete(job.removeAll);

router.route("/:id").get(job.getById).put(job.update).delete(job.remove);

export default router;
