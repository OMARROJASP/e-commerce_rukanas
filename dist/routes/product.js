"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.router = void 0;
const express_1 = require("express");
const product_1 = require("../controllers/product");
const imageUploadMiddleware_1 = require("../middlewares/imageUploadMiddleware");
const router = (0, express_1.Router)();
exports.router = router;
//router.get("/",authMiddleware , getProductsController)
router.get("/", product_1.getProductsController);
router.get("/all", product_1.getProductsByOfertController);
router.get("/filtro", product_1.getProductsByFilterController);
router.post("/", imageUploadMiddleware_1.uploadProductImage, imageUploadMiddleware_1.resizeAndUploadImage1, product_1.saveProductController);
router.get("/:id", product_1.getProductByIdController);
router.put("/:id", imageUploadMiddleware_1.uploadProductImage, imageUploadMiddleware_1.resizeAndUploadImage, product_1.updateProductController);
router.delete("/:id", product_1.deleteProductController);
