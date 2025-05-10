import { Router } from "express";
import { getCategoriesController,getCategoryByIdController,saveCategoryController,updateCategoryController,deleteCategoryController } from "../controllers/category";
import { uploadPhoto, resizeAndUploadImage } from "../middlewares/imageUploadMiddleware";


const router = Router();

router.get("/", getCategoriesController) 
router.get("/:id", getCategoryByIdController)
router.post("/", 
    uploadPhoto, // Middleware para subir archivos
    resizeAndUploadImage, // Middleware para procesar imágenes
    saveCategoryController
);
router.put("/:id", updateCategoryController)
router.delete("/:id", deleteCategoryController)

export { router}