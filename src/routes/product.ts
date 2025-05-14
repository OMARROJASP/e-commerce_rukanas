import { Router } from "express";
import { deleteProductController, getProductByIdController, getProductsController, saveProductController, updateProductController } from "../controllers/product";
import { uploadProductImage, resizeAndUploadImage } from "../middlewares/imageUploadMiddleware";
import { authMiddleware } from '../middlewares/auth.middleware';


const router  = Router();

router.get("/",authMiddleware , getProductsController)
router.post("/",uploadProductImage, resizeAndUploadImage ,saveProductController )
router.get("/:id",getProductByIdController )
router.put("/:id",uploadProductImage, resizeAndUploadImage ,updateProductController )
router.delete("/:id",deleteProductController )

export { router  }; 