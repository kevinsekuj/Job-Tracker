import { Router } from "express";
import company from "../controllers/companyController.js";

const router = Router();

router
  .route("/")
  .get(company.getAll)
  .post(company.create)
  .put(company.update)
  .delete(company.del);

export default router;
