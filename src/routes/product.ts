import { Router } from "express";
import { getProductsController } from "../controllers/product";

const router  = Router();

router .get("/", getProductsController)

export { router  }; 