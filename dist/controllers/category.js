"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.deleteCategoryController = exports.updateCategoryController = exports.saveCategoryController = exports.getCategoryByIdController = exports.getCategoriesController = void 0;
const category_1 = require("../services/category");
const error_handler_1 = require("../utils/error.handler");
const cloudinaryConfig_1 = require("../config/cloudinaryConfig");
const getCategoriesController = async (req, res) => {
    try {
        const responseCategories = await (0, category_1.getCategories)();
        const data = responseCategories ? responseCategories : "No hay categorias";
        res.send({ message: "GET_ALL_CATEGORIES", data: data });
    }
    catch (e) {
        (0, error_handler_1.handleHttp)(res, "ERROR_GET_CATEGORIES");
    }
};
exports.getCategoriesController = getCategoriesController;
const getCategoryByIdController = async (req, res) => {
    try {
        const { id } = req.params;
        const idNumber = parseInt(id);
        const responseCategories = await (0, category_1.getCategoryById)(idNumber);
        const data = responseCategories ? responseCategories : "No hay categorias";
        res.send({ message: "GET_ALL_CATEGORIES", data: data });
    }
    catch (e) {
        (0, error_handler_1.handleHttp)(res, "ERROR_GET_CATEGORIES");
    }
};
exports.getCategoryByIdController = getCategoryByIdController;
// Ajusta la ruta según tu estructura
const saveCategoryController = async (req, res, next) => {
    try {
        // Verificar si hay imágenes subidas
        if (!req.body.imageUrls || req.body.imageUrls.length === 0) {
            res.status(400).json({
                message: "No se proporcionaron imágenes válidas",
                receivedBody: req.body
            });
            return;
        }
        // Tomar la primera imagen del array
        const mainImageUrl = req.body.imageUrls[0];
        // Preparar los datos para la base de datos
        const categoryData = {
            cat_name: req.body.cat_name,
            cat_description: req.body.cat_description,
            cat_area: req.body.cat_area,
            cat_status: req.body.cat_status,
            cat_imageUrl: mainImageUrl
        };
        // Insertar en la base de datos
        const responseCategories = await (0, category_1.insertCategory)(categoryData);
        res.status(201).json({
            message: "Categoría creada exitosamente",
            data: responseCategories,
            imageUrl: mainImageUrl
        });
    }
    catch (e) {
        console.error("Error al guardar categoría:", e);
        (0, error_handler_1.handleHttp)(res, "ERROR_POST_CATEGORIES");
    }
};
exports.saveCategoryController = saveCategoryController;
const updateCategoryController = async (req, res, next) => {
    try {
        // obtenemos el id de la categoria
        const { id } = req.params;
        const idNumber = parseInt(id);
        // 1. Verificar si la categoría existe
        const existingCategory = await (0, category_1.getCategoryById)(idNumber);
        if (!existingCategory) {
            res.status(404).json({
                message: "Categoria no encontrada"
            });
            return;
        }
        // 2. Verificar si hay imágenes subidas
        let mainImageUrl = existingCategory.cat_imageUrl;
        if (req.body.imageUrls && req.body.imageUrls.length > 0) {
            mainImageUrl = req.body.imageUrls[0];
            // 3. Opcional: Si se subieron nuevas imágenes, puedes eliminar las antiguas
            if (existingCategory.cat_imageUrl) {
                try {
                    const publicId = extractPublicId(existingCategory.cat_imageUrl);
                    await cloudinaryConfig_1.cloudinary.uploader.destroy(publicId);
                }
                catch (error) {
                    console.warn("Error al eliminar la imagen anterior:", error);
                }
            }
        }
        // 4. Preparar datos para actualización
        const categoryData = {
            cat_name: req.body.cat_name || existingCategory.cat_name,
            cat_description: req.body.cat_description || existingCategory.cat_description,
            cat_area: req.body.cat_area || existingCategory.cat_area,
            cat_status: req.body.cat_status || existingCategory.cat_status,
            cat_imageUrl: mainImageUrl
        };
        // 5. Actualizar en base de datos
        const updatedCategory = await (0, category_1.updateCategory)(categoryData, idNumber);
        res.status(200).json({
            message: "Categoria actualizada exitosamente",
            data: updatedCategory,
        });
    }
    catch (e) {
        console.error("Error al actualizar categoria", e);
        (0, error_handler_1.handleHttp)(res, "ERROR_GET_CATEGORIES");
    }
};
exports.updateCategoryController = updateCategoryController;
const deleteCategoryController = async (req, res) => {
    try {
        const { id } = req.params;
        const idNumber = parseInt(id);
        const responseCategories = await (0, category_1.deleteCategory)(idNumber);
        const data = responseCategories ? responseCategories : "No se pudo eliminar la categoria";
        res.send({ message: "DELETE_CATEGORY", data: data });
    }
    catch (e) {
        (0, error_handler_1.handleHttp)(res, "ERROR_GET_CATEGORIES");
    }
};
exports.deleteCategoryController = deleteCategoryController;
function extractPublicId(imageUrl) {
    const matches = imageUrl.match(/upload\/(?:v\d+\/)?([^\.]+)/);
    return matches ? matches[1] : '';
}
