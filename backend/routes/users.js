import { Router } from "express";
import user from "../controllers/userController.js";

const router = Router();

router.route("/").post(user.create).put(user.update).delete(user.del);

export default router;
