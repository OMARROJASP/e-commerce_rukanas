"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.router = void 0;
const express_1 = require("express");
const category_1 = require("../controllers/category");
const imageUploadMiddleware_1 = require("../middlewares/imageUploadMiddleware");
const router = (0, express_1.Router)();
exports.router = router;
router.get("/", category_1.getCategoriesController);
router.get("/:id", category_1.getCategoryByIdController);
router.post("/", imageUploadMiddleware_1.uploadCategoryImage, // Middleware para subir archivos
imageUploadMiddleware_1.resizeAndUploadImage1, // Middleware para procesar imágenes
category_1.saveCategoryController);
router.put("/:id", imageUploadMiddleware_1.uploadCategoryImage, // Middleware para subir archivos
imageUploadMiddleware_1.resizeAndUploadImage1, // Middleware para procesar imágenes
category_1.updateCategoryController);
router.delete("/:id", category_1.deleteCategoryController);
