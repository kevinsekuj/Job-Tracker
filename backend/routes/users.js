import { Router } from "express";
import user from "../controllers/userController.js";

const router = Router();

router.route("/").get(user.getAll).post(user.create).delete(user.removeAll);

router.route("/:id").get(user.getById).put(user.update).delete(user.remove);

export default router;
