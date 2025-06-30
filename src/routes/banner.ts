import { Router } from "express";
import { deleteBannerController, getBannerByIdController, getBannerController, saveBannerController, updateBannerController } from "../controllers/banner";
import { uploadProductImage, resizeAndUploadImage, uploadBannerImage } from "../middlewares/imageUploadMiddleware";
import { authMiddleware } from '../middlewares/auth.middleware';


const router  = Router();

//router.get("/",authMiddleware , getProductsController)
router.get("/" , getBannerController)
router.post("/",uploadBannerImage(), resizeAndUploadImage ,saveBannerController )
router.get("/:id",getBannerByIdController )
router.put("/:id",uploadBannerImage(), resizeAndUploadImage ,updateBannerController )
router.delete("/:id",deleteBannerController )

export { router  }; 