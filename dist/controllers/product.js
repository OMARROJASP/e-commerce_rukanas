"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.getProductsByOfertController = exports.getProductsByFilterController = exports.deleteProductController = exports.updateProductController = exports.getProductByIdController = exports.saveProductController = exports.getProductsController = void 0;
const product_1 = require("../services/product");
const cloudinaryConfig_1 = require("../config/cloudinaryConfig");
const getProductsController = async (req, res) => {
    try {
        const responseProducts = await (0, product_1.getProducts)();
        const data = responseProducts ? responseProducts : "No hay productos";
        res.send({ message: "GET_ALL_PRODUCTS", data: data });
    }
    catch (e) {
        console.log(e);
    }
};
exports.getProductsController = getProductsController;
const getProductsByOfertController = async (req, res) => {
    try {
        const responseProducts = await (0, product_1.getProductsByOfert)();
        const data = responseProducts ? responseProducts : "No hay productos con ofertas";
        res.send({ message: "GET_ALL_PRODUCTS", data: data });
    }
    catch (e) {
        console.log(e);
    }
};
exports.getProductsByOfertController = getProductsByOfertController;
const getProductByIdController = async (req, res) => {
    try {
        const { id } = req.params;
        const idNumber = parseInt(id);
        const responseProducts = await (0, product_1.getProductById)(idNumber);
        const data = responseProducts ? responseProducts : "No hay producto";
        res.send({ message: "GET_PRODUCT_BY_ID", data: data });
    }
    catch (e) {
        console.log(e);
    }
};
exports.getProductByIdController = getProductByIdController;
const saveProductController = async (req, res, next) => {
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
        const productData = {
            //prod_id:0,
            prod_name: req.body.prod_name,
            prod_description: req.body.prod_description,
            prod_price: req.body.prod_price,
            prod_stock: req.body.prod_stock,
            prod_imageUrl: mainImageUrl,
            prod_category: req.body.prod_category,
            prod_supplier: req.body.prod_supplier,
            prod_ofert: req.body.prod_ofert
        };
        // Insertar en la base de datos
        const responseProducts = await (0, product_1.insertProduct)(productData);
        res.status(201).json({
            message: "producto creada exitosamente",
            data: responseProducts
        });
    }
    catch (e) {
        console.error("Error al guardar producto:", e);
    }
};
exports.saveProductController = saveProductController;
const updateProductController = async (req, res) => {
    try {
        const { id } = req.params;
        const idNumber = parseInt(id);
        // 1. Verificar si la producto existe
        const existingProduct = await (0, product_1.getProductById)(idNumber);
        if (!existingProduct) {
            res.status(404).json({
                message: "Producto no encontrada"
            });
            return;
        }
        // 2. Verificar si hay imágenes subidas
        let mainImageUrl = existingProduct.prod_imageUrl;
        if (req.body.imageUrls && req.body.imageUrls.length > 0) {
            mainImageUrl = req.body.imageUrls[0];
            // 3. Opcional: Si se subieron nuevas imágenes, puedes eliminar las antiguas
            if (existingProduct.prod_imageUrl) {
                try {
                    const publicId = extractPublicId(existingProduct.prod_imageUrl);
                    await cloudinaryConfig_1.cloudinary.uploader.destroy(publicId);
                }
                catch (error) {
                    console.warn("Error al eliminar la imagen anterior:", error);
                }
            }
        }
        // 4 . Preparar los datos para la base de datos
        const productData = {
            //prod_id: idNumber, // Añade el ID que falta
            prod_name: req.body.prod_name,
            prod_description: req.body.prod_description,
            prod_price: req.body.prod_price,
            prod_stock: req.body.prod_stock,
            prod_imageUrl: mainImageUrl,
            prod_supplier: req.body.prod_supplier,
            prod_ofert: req.body.prod_ofert,
            prod_category: req.body.prod_category || existingProduct.prod_category // Añade la producto
        };
        const responseProducts = await (0, product_1.updateProduct)(productData, idNumber);
        res.status(200).json({
            message: "Producto actualizado exitosamente",
            data: responseProducts,
        });
    }
    catch (e) {
        console.log(e);
    }
};
exports.updateProductController = updateProductController;
const deleteProductController = async (req, res) => {
    try {
        const { id } = req.params;
        const idNumber = parseInt(id);
        const responseProducts = await (0, product_1.deleteProduct)(idNumber);
        const data = responseProducts ? responseProducts : "No se pudo eliminar el producto";
        res.send({ message: "DELETE_PRODUCT", data: data });
    }
    catch (e) {
        console.log(e);
    }
};
exports.deleteProductController = deleteProductController;
const getProductsByFilterController = async (req, res, next) => {
    try {
        const { category, min, max, page, limit, ofert } = req.query;
        // if (!category || typeof category !== "string") {
        //    res.status(400).json({ message: "Parámetro 'category' inválido o faltante" });
        //    return;
        // }
        const responseProducts = await (0, product_1.getFilterProducts)(category, min ? parseFloat(min) : undefined, max ? parseFloat(max) : undefined, page ? parseInt(page) : 1, limit ? parseInt(limit) : 10, ofert ? true : false);
        if (!responseProducts.products.length) {
            res.status(404).json({ message: "No se encontraron productos para esta filtro", data: responseProducts });
        }
        res.status(200).json({ message: "LIST_PRODUCTS_BY_producto", data: responseProducts });
    }
    catch (e) {
        res.status(500).json({ message: "Error interno del servidor" });
    }
};
exports.getProductsByFilterController = getProductsByFilterController;
function extractPublicId(imageUrl) {
    const matches = imageUrl.match(/upload\/(?:v\d+\/)?([^\.]+)/);
    return matches ? matches[1] : '';
}
