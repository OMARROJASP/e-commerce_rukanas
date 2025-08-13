"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.resizeAndUploadImage1 = exports.resizeAndUploadImage = exports.uploadBannerImage = exports.uploadProductImage = exports.uploadCategoryImage = void 0;
const multer_1 = __importDefault(require("multer"));
const cloudinaryConfig_1 = require("../config/cloudinaryConfig");
// Configuración de Multer
const createUploader = (fieldName, maxCount = 1) => {
    return (0, multer_1.default)({
        storage: multer_1.default.memoryStorage(),
        limits: { fileSize: 5 * 1024 * 1024 }, // 5 MB
        fileFilter: (req, file, cb) => {
            if (file.mimetype.startsWith('image/')) {
                cb(null, true);
            }
            else {
                cb(new Error('Solo se permiten archivos de imagen (JPEG, PNG, etc.)'));
            }
        }
    }).array(fieldName, maxCount);
};
// Función para subir a Cloudinary
const uploadToCloudinary = (buffer, options = {}) => {
    return new Promise((resolve, reject) => {
        cloudinaryConfig_1.cloudinary.uploader.upload_stream(options, (error, result) => {
            if (error)
                reject(error);
            else
                resolve(result);
        }).end(buffer);
    });
};
// Middleware para procesar imágenes
const resizeAndUploadImage = async (req, res, next) => {
    if (!req.files || Object.keys(req.files).length === 0)
        return next();
    try {
        const files = req.files;
        const imageUrls = {};
        for (const field in files) {
            const uploaded = await uploadToCloudinary(files[field][0].buffer, {
                transformation: [{ width: 500, height: 500, crop: 'limit' }]
            });
            imageUrls[field] = uploaded.secure_url;
        }
        req.body.imageUrls = imageUrls;
        next();
    }
    catch (error) {
        console.error('Error subiendo imagen:', error);
        res.status(500).json({ error: 'Error subiendo imagen' });
    }
};
exports.resizeAndUploadImage = resizeAndUploadImage;
const resizeAndUploadImage1 = async (req, res, next) => {
    if (!req.files || req.files.length === 0)
        return next();
    try {
        const uploadPromises = req.files.map(file => uploadToCloudinary(file.buffer, {
            transformation: [
                { width: 500, height: 500, crop: 'limit' },
            ]
        }));
        const results = await Promise.all(uploadPromises);
        req.body.imageUrls = results.map((result) => result.secure_url);
        next();
    }
    catch (error) {
        console.error('Error subiendo imagen:', error);
        res.status(500).json({ error: 'Error subiendo imagen' });
    }
};
exports.resizeAndUploadImage1 = resizeAndUploadImage1;
const createUploaderForBanner = () => {
    return (0, multer_1.default)({
        storage: multer_1.default.memoryStorage(),
        limits: { fileSize: 5 * 1024 * 1024 },
        fileFilter: (req, file, cb) => {
            if (file.mimetype.startsWith('image/')) {
                cb(null, true);
            }
            else {
                cb(new Error('Solo se permiten archivos de imagen (JPEG, PNG, etc.)'));
            }
        }
    }).fields([
        { name: 'bnn_image_url_desktop', maxCount: 1 },
        { name: 'bnn_image_url_mobile', maxCount: 1 }
    ]);
};
exports.uploadCategoryImage = createUploader('cat_imageUrl', 1);
exports.uploadProductImage = createUploader('prod_imageUrl', 1);
const uploadBannerImage = () => createUploaderForBanner();
exports.uploadBannerImage = uploadBannerImage;
