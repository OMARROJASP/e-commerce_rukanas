"use strict";
var __createBinding = (this && this.__createBinding) || (Object.create ? (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    var desc = Object.getOwnPropertyDescriptor(m, k);
    if (!desc || ("get" in desc ? !m.__esModule : desc.writable || desc.configurable)) {
      desc = { enumerable: true, get: function() { return m[k]; } };
    }
    Object.defineProperty(o, k2, desc);
}) : (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    o[k2] = m[k];
}));
var __setModuleDefault = (this && this.__setModuleDefault) || (Object.create ? (function(o, v) {
    Object.defineProperty(o, "default", { enumerable: true, value: v });
}) : function(o, v) {
    o["default"] = v;
});
var __importStar = (this && this.__importStar) || (function () {
    var ownKeys = function(o) {
        ownKeys = Object.getOwnPropertyNames || function (o) {
            var ar = [];
            for (var k in o) if (Object.prototype.hasOwnProperty.call(o, k)) ar[ar.length] = k;
            return ar;
        };
        return ownKeys(o);
    };
    return function (mod) {
        if (mod && mod.__esModule) return mod;
        var result = {};
        if (mod != null) for (var k = ownKeys(mod), i = 0; i < k.length; i++) if (k[i] !== "default") __createBinding(result, mod, k[i]);
        __setModuleDefault(result, mod);
        return result;
    };
})();
var _a;
Object.defineProperty(exports, "__esModule", { value: true });
exports.deleteBannerController = exports.updateBannerController = exports.saveBannerController = exports.getBannerByIdController = exports.getBannerController = void 0;
const crud_controller_1 = require("./crud.controller");
const bannerService = __importStar(require("../services/banner"));
const cloudinaryConfig_1 = require("../config/cloudinaryConfig");
_a = (0, crud_controller_1.createCrudController)(bannerService), exports.getBannerController = _a.getAll, exports.getBannerByIdController = _a.getById;
const saveBannerController = async (req, res, next) => {
    try {
        const images = req.body.imageUrls;
        // Verificar si hay imágenes subidas
        if (!images?.bnn_image_url_desktop || !images?.bnn_image_url_mobile) {
            res.status(400).json({
                message: "No se proporcionaron imágenes válidas",
                receivedBody: req.body
            });
            return;
        }
        const bannerData = {
            bnn_title: req.body.bnn_title,
            bnn_description: req.body.bnn_description,
            bnn_image_url_desktop: images.bnn_image_url_desktop,
            bnn_image_url_mobile: images.bnn_image_url_mobile,
            bnn_is_active: req.body.bnn_is_active,
            bnn_position: req.body.bnn_position,
            bnn_created_at: req.body.bnn_created_at,
            bnn_updated_at: req.body.bnn_updated_at
        };
        // Insertar en la base de datos
        const responseProducts = await bannerService.create(bannerData);
        res.status(201).json({
            message: "Banner creado exitosamente",
            data: responseProducts
        });
    }
    catch (e) {
        console.error("Error al guardar banner:", e);
        res.status(500).json({ error: "Error interno al guardar banner" });
    }
};
exports.saveBannerController = saveBannerController;
const updateBannerController = async (req, res) => {
    try {
        const { id } = req.params;
        const bannerId = parseInt(id);
        if (isNaN(bannerId)) {
            res.status(400).json({ message: "ID inválido" });
            return;
        }
        // 1. Verificar si la producto existe
        const existingBanner = await bannerService.getById(bannerId);
        if (!existingBanner) {
            res.status(404).json({ message: "Banner no encontrado" });
            return;
        }
        // 2. Obtener nuevas URLs si se subieron imágenes
        const images = req.body.imageUrls || {};
        let updatedImageDesktop = existingBanner.bnn_image_url_desktop;
        let updatedImageMobile = existingBanner.bnn_image_url_mobile;
        // 3. Reemplazar imagen de escritorio si hay nueva
        if (images.bnn_image_url_desktop) {
            if (existingBanner.bnn_image_url_desktop) {
                try {
                    const publicId = extractPublicId(existingBanner.bnn_image_url_desktop);
                    await cloudinaryConfig_1.cloudinary.uploader.destroy(publicId);
                }
                catch (error) {
                    console.warn("Error eliminando imagen desktop anterior:", error);
                }
            }
            updatedImageDesktop = images.bnn_image_url_desktop;
        }
        // 4. Reemplazar imagen mobile si hay nueva
        if (images.bnn_image_url_mobile) {
            if (existingBanner.bnn_image_url_mobile) {
                try {
                    const publicId = extractPublicId(existingBanner.bnn_image_url_mobile);
                    await cloudinaryConfig_1.cloudinary.uploader.destroy(publicId);
                }
                catch (error) {
                    console.warn("Error eliminando imagen mobile anterior:", error);
                }
            }
            updatedImageMobile = images.bnn_image_url_mobile;
        }
        // 5. Preparar datos actualizados
        const bannerData = {
            bnn_title: req.body.bnn_title,
            bnn_description: req.body.bnn_description,
            bnn_image_url_desktop: updatedImageDesktop,
            bnn_image_url_mobile: updatedImageMobile,
            bnn_is_active: req.body.bnn_is_active,
            bnn_position: req.body.bnn_position,
            bnn_created_at: req.body.bnn_created_at,
            bnn_updated_at: req.body.bnn_updated_at,
        };
        // 6. Actualizar en base de datos
        const updatedBanner = await bannerService.update(bannerData, bannerId);
        res.status(200).json({
            message: "Banner actualizado exitosamente",
            data: updatedBanner,
        });
        return;
    }
    catch (error) {
        console.error("Error al actualizar banner:", error);
        res.status(500).json({ message: "Error interno del servidor" });
        return;
    }
};
exports.updateBannerController = updateBannerController;
const deleteBannerController = async (req, res) => {
    try {
        const { id } = req.params;
        const bannerId = parseInt(id);
        if (isNaN(bannerId)) {
            res.status(400).json({ message: "ID inválido" });
            return;
        }
        // 1. Verificar si el banner existe
        const existingBanner = await bannerService.getById(bannerId);
        if (!existingBanner) {
            res.status(404).json({ message: "Banner no encontrado" });
            return;
        }
        // 2. Eliminar imágenes en Cloudinary si existen
        const deleteImageFromCloudinary = async (url) => {
            if (!url)
                return;
            try {
                const publicId = extractPublicId(url);
                await cloudinaryConfig_1.cloudinary.uploader.destroy(publicId);
            }
            catch (error) {
                console.warn(`Error al eliminar imagen en Cloudinary: ${url}`, error);
            }
        };
        await deleteImageFromCloudinary(existingBanner.bnn_image_url_desktop ?? null);
        await deleteImageFromCloudinary(existingBanner.bnn_image_url_mobile ?? null);
        // 3. Eliminar banner de la base de datos
        await bannerService.remove(bannerId);
        res.status(200).json({ message: "Banner eliminado correctamente" });
        return;
    }
    catch (error) {
        console.error("Error al eliminar banner:", error);
        res.status(500).json({ message: "Error interno del servidor" });
        return;
    }
};
exports.deleteBannerController = deleteBannerController;
function extractPublicId(imageUrl) {
    const matches = imageUrl.match(/upload\/(?:v\d+\/)?([^\.]+)/);
    return matches ? matches[1] : '';
}
