import multer, { FileFilterCallback } from 'multer';
import { cloudinary } from '../config/cloudinaryConfig';
import { Request, Response, NextFunction } from 'express';

// Configuración de Multer
const createUploader = (fieldName: string, maxCount: number = 1) => {
  return multer({
    storage: multer.memoryStorage(),
    limits: { fileSize: 5 * 1024 * 1024 }, // 5 MB
    fileFilter: (req: Request, file: Express.Multer.File, cb: FileFilterCallback) => {
      if (file.mimetype.startsWith('image/')) {
        cb(null, true);
      } else {
        cb(new Error('Solo se permiten archivos de imagen (JPEG, PNG, etc.)'));
      }
    }
  }).array(fieldName, maxCount);
};
// Función para subir a Cloudinary
const uploadToCloudinary = (buffer: Buffer, options = {}) => {
    return new Promise((resolve, reject) => {
        cloudinary.uploader.upload_stream(options, (error, result) => {
            if (error) reject(error);
            else resolve(result);    
        }).end(buffer);
    });
};

// Middleware para procesar imágenes
const resizeAndUploadImage = async (req: Request, res: Response, next: NextFunction) => {
    if (!req.files || req.files.length === 0) return next();

    try {
        const uploadPromises = (req.files as Express.Multer.File[]).map(file => 
            uploadToCloudinary(file.buffer, {
                transformation: [
                    { width: 500, height: 500, crop: 'limit' },
                ]
            })
        );
        
        const results = await Promise.all(uploadPromises);
        req.body.imageUrls = results.map((result: any) => result.secure_url);
        next();
    } catch (error) {
        console.error('Error subiendo imagen:', error);
        res.status(500).json({ error: 'Error subiendo imagen' });
    }
};
export const uploadCategoryImage = createUploader('cat_imageUrl', 1);
export const uploadProductImage = createUploader('prod_imageUrl', 1);
export { resizeAndUploadImage };