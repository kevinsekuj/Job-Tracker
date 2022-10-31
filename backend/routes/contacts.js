import { Router } from "express";
import contact from "../controllers/contactController.js";

const router = Router();

router
  .route("/")
  .get(contact.getAll)
  .post(contact.create)
  .delete(contact.removeAll);

router
  .route("/:id")
  .get(contact.getById)
  .put(contact.update)
  .delete(contact.remove);

export default router;
