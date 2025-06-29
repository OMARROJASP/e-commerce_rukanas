import { Router } from "express";
import { deleteProductController, getProductByIdController, getProductsController, saveProductController, updateProductController,getProductsByFilterController, getProductsByOfertController } from "../controllers/product";
import { uploadProductImage, resizeAndUploadImage,resizeAndUploadImage1  } from "../middlewares/imageUploadMiddleware";
import { authMiddleware } from '../middlewares/auth.middleware';


const router  = Router();

//router.get("/",authMiddleware , getProductsController)
router.get("/" , getProductsController)
router.get("/all" , getProductsByOfertController)
router.get("/filtro", getProductsByFilterController)
router.post("/",uploadProductImage, resizeAndUploadImage1 ,saveProductController )
router.get("/:id",getProductByIdController )
router.put("/:id",uploadProductImage, resizeAndUploadImage ,updateProductController )
router.delete("/:id",deleteProductController )

export { router  };  