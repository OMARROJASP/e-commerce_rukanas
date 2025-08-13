"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.router = void 0;
const express_1 = require("express");
const banner_1 = require("../controllers/banner");
const imageUploadMiddleware_1 = require("../middlewares/imageUploadMiddleware");
const router = (0, express_1.Router)();
exports.router = router;
//router.get("/",authMiddleware , getProductsController)
router.get("/", banner_1.getBannerController);
router.post("/", (0, imageUploadMiddleware_1.uploadBannerImage)(), imageUploadMiddleware_1.resizeAndUploadImage, banner_1.saveBannerController);
router.get("/:id", banner_1.getBannerByIdController);
router.put("/:id", (0, imageUploadMiddleware_1.uploadBannerImage)(), imageUploadMiddleware_1.resizeAndUploadImage, banner_1.updateBannerController);
router.delete("/:id", banner_1.deleteBannerController);
