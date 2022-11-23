import { Router } from "express";
import contact from "../controllers/contactController.js";

const router = Router();

router
  .route("/")
  .get(contact.getByUserId)
  .post(contact.create)
  .delete(contact.removeById);

router
  .route("/:id")
  .put(contact.update);

export default router;
