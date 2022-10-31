import { Router } from "express";
import skill from "../controllers/skillController.js";

const router = Router();

router.route("/").get(skill.getAll).post(skill.create).delete(skill.removeAll);

router.route("/:id").get(skill.getById).put(skill.update).delete(skill.remove);

export default router;
