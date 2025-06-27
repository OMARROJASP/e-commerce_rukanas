import { createCrudController } from "./crud.controller";
import * as bannerService from "../services/banner"
import { NextFunction, Request, Response } from "express";
import { cloudinary } from "../config/cloudinaryConfig";

export const {
      getAll: getBannerController,
    getById: getBannerByIdController
} = createCrudController(bannerService)


const saveBannerController =async (req:Request, res: Response, next: NextFunction) => {
 try{

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
    }catch(e){
          console.error("Error al guardar banner:", e);
    res.status(500).json({ error: "Error interno al guardar banner" });
    }
}    
const updateBannerController = async (req: Request, res:Response): Promise<void> =>{
    try{
        const { id } = req.params;
        const bannerId  = parseInt(id);

        if (isNaN(bannerId)) {
            res.status(400).json({ message: "ID inválido" });
            return
        }

        // 1. Verificar si la producto existe
        const existingBanner = await bannerService.getById(bannerId);
            if (!existingBanner) {
            res.status(404).json({ message: "Banner no encontrado" });
            return
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
          await cloudinary.uploader.destroy(publicId);
        } catch (error) {
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
          await cloudinary.uploader.destroy(publicId);
        } catch (error) {
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
    return

  } catch (error) {
    console.error("Error al actualizar banner:", error);
    res.status(500).json({ message: "Error interno del servidor" });
    return 
  }
}

 const deleteBannerController = async (req: Request, res: Response): Promise<void> =>{
  try {
    const { id } = req.params;
    const bannerId = parseInt(id);

    if (isNaN(bannerId)) {
      res.status(400).json({ message: "ID inválido" });
      return 
    }

    // 1. Verificar si el banner existe
    const existingBanner = await bannerService.getById(bannerId);
    if (!existingBanner) {
      res.status(404).json({ message: "Banner no encontrado" });
      return 
    }

    // 2. Eliminar imágenes en Cloudinary si existen
    const deleteImageFromCloudinary = async (url: string | null) => {
      if (!url) return;
      try {
        const publicId = extractPublicId(url);
        await cloudinary.uploader.destroy(publicId);
      } catch (error) {
        console.warn(`Error al eliminar imagen en Cloudinary: ${url}`, error);
      }
    };

    await deleteImageFromCloudinary(existingBanner.bnn_image_url_desktop ?? null);
    await deleteImageFromCloudinary(existingBanner.bnn_image_url_mobile ?? null);


    // 3. Eliminar banner de la base de datos
    await bannerService.remove(bannerId);

    res.status(200).json({ message: "Banner eliminado correctamente" });
    return 

  } catch (error) {
    console.error("Error al eliminar banner:", error);
    res.status(500).json({ message: "Error interno del servidor" });
    return 
  }
};


function extractPublicId(imageUrl: string): string {
  const matches = imageUrl.match(/upload\/(?:v\d+\/)?([^\.]+)/);
  return matches ? matches[1] : '';
}

export {saveBannerController, updateBannerController, deleteBannerController}