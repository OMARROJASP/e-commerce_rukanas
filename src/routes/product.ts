import { Router } from "express";
import { deleteProductController, getProductByIdController, getProductsController, saveProductController, updateProductController } from "../controllers/product";

const router  = Router();

router.get("/", getProductsController)
router.post("/",saveProductController )
router.get("/:id",getProductByIdController )
router.put("/:id",updateProductController )
router.delete("/:id",deleteProductController )

export { router  }; 