import { Router } from "express";
import company from "../controllers/companyController.js";

const router = Router();

router
  .route("/")
  .get(company.getAll)
  .post(company.create)
  .delete(company.removeAll);

router
  .route("/:id")
  .get(company.getById)
  .put(company.update)
  .delete(company.remove);

export default router;
