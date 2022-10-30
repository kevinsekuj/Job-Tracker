import { Router } from "express";
import user from "../controllers/userController.js";

const router = Router();

router
  .route("/")
  .get(user.getById)
  .post(user.create)
  .put(user.update)
  .delete(user.del);

export default router;
