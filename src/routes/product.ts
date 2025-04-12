import { Router } from "express";
import { getProductsController, saveProductController } from "../controllers/product";

const router  = Router();

router.get("/", getProductsController)
router.post("/",saveProductController )

export { router  }; 