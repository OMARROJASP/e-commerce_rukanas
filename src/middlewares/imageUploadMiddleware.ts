import multer from 'multer';
import { cloudinary } from '../config/cloudinaryConfig';
import { Request, Response, NextFunction } from 'express';

// Configuración de Multer
const uploadPhoto = multer({
    storage: multer.memoryStorage(),
    limits: { fileSize: 5 * 1024 * 1024 }, // 5 MB limit
    fileFilter: (req: Request, file: Express.Multer.File, cb: multer.FileFilterCallback) => {
        if(file.mimetype.startsWith('image/')) {  // Corregido: verifica tipos de imagen
            cb(null, true);
        } else {
            cb(new Error('Por favor sube un archivo de imagen (JPEG, PNG, etc.)'));
        }
    }
}).array('cat_imageUrl', 5); // Acepta hasta 5 archivos con el campo 'cat_imageUrl'

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

export { uploadPhoto, resizeAndUploadImage };