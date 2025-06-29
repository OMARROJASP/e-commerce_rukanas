import { Router } from "express";
import { getCategoriesController,getCategoryByIdController,saveCategoryController,updateCategoryController,deleteCategoryController } from "../controllers/category";
import { uploadCategoryImage, resizeAndUploadImage, resizeAndUploadImage1 } from "../middlewares/imageUploadMiddleware";


const router = Router();

router.get("/", getCategoriesController) 
router.get("/:id", getCategoryByIdController)
router.post("/", 
    uploadCategoryImage, // Middleware para subir archivos
    resizeAndUploadImage1, // Middleware para procesar imágenes
    saveCategoryController
);
router.put("/:id",
    uploadCategoryImage, // Middleware para subir archivos
    resizeAndUploadImage1, // Middleware para procesar imágenes
    updateCategoryController)
router.delete("/:id", deleteCategoryController)

export { router}