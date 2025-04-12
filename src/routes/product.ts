import { Router } from "express";
import { getProductByIdController, getProductsController, saveProductController } from "../controllers/product";

const router  = Router();

router.get("/", getProductsController)
router.post("/",saveProductController )
router.get("/:id",getProductByIdController )

export { router  }; 