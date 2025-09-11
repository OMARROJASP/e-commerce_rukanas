import { Request, Response,NextFunction } from "express";
import { deleteCategory, getCategories, getCategoryById, getFilterCategory, insertCategory, updateCategory } from "../services/category";
import { handleHttp } from "../utils/error.handler";
import { cloudinary } from "../config/cloudinaryConfig";

const getCategoriesController = async (req:Request, res:Response) => {
    try{
        const responseCategories = await getCategories();
        const data = responseCategories ? responseCategories : "No hay categorias";
        res.send({message: "GET_ALL_CATEGORIES", data: data});
    }catch(e){
        handleHttp(res, "ERROR_GET_CATEGORIES")
    }
}

const getCategoryByIdController = async (req:Request, res:Response) => {
    try{
        const { id } = req.params;
        const idNumber = parseInt(id);
        const responseCategories = await getCategoryById(idNumber);
        const data = responseCategories ? responseCategories : "No hay categorias";
        res.send({message: "GET_ALL_CATEGORIES", data: data});
    }catch(e){
        handleHttp(res, "ERROR_GET_CATEGORIES")
    }
}
 // Ajusta la ruta según tu estructura

const saveCategoryController = async (req: Request, res: Response, next: NextFunction): Promise<void> => {
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
    const responseCategories = await insertCategory(categoryData);
    
    res.status(201).json({
      message: "Categoría creada exitosamente",
      data: responseCategories,
      imageUrl: mainImageUrl
    });
  } catch (e) {
    console.error("Error al guardar categoría:", e);
    handleHttp(res, "ERROR_POST_CATEGORIES");
  }
};

const updateCategoryController = async (req:Request, res:Response,  next: NextFunction): Promise<void> => {
    try{
         // obtenemos el id de la categoria
        const { id } = req.params;
        const idNumber = parseInt(id);
        // 1. Verificar si la categoría existe
        const existingCategory = await getCategoryById(idNumber);
        if(!existingCategory){
            res.status(404).json({
                message: "Categoria no encontrada"
            });
            return;
        }
        // 2. Verificar si hay imágenes subidas
        let mainImageUrl = existingCategory.cat_imageUrl;

        if( req.body.imageUrls && req.body.imageUrls.length > 0){
            mainImageUrl = req.body.imageUrls[0];

            // 3. Opcional: Si se subieron nuevas imágenes, puedes eliminar las antiguas
            if ( existingCategory.cat_imageUrl ){
                try{
                    const publicId = extractPublicId(existingCategory.cat_imageUrl);
                    await cloudinary.uploader.destroy(publicId);    
                }catch(error){
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
        const updatedCategory = await updateCategory(categoryData, idNumber);
        res.status(200).json({
            message: "Categoria actualizada exitosamente",
            data: updatedCategory,
        })
    }catch(e){
        console.error("Error al actualizar categoria", e)
        handleHttp(res, "ERROR_GET_CATEGORIES")
    }
}

const deleteCategoryController = async (req:Request, res:Response) => {
    try{
        const { id } = req.params;
        const idNumber = parseInt(id);
        const responseCategories = await deleteCategory(idNumber);
        const data = responseCategories ? responseCategories : "No se pudo eliminar la categoria";
        res.send({message: "DELETE_CATEGORY", data: data});        
    }catch(e){
        handleHttp(res, "ERROR_GET_CATEGORIES")
    }
}

 const filterCustomersController = async (req: Request, res: Response, next: NextFunction): Promise<void> => {
    
    try {
        const{limit, page, text} = req.query;

        const customers = await getFilterCategory(
            limit ? parseInt(limit as string): 10,
            page ? parseInt(page as string): 1,
            text as string
        );
        res.status(200).json({ success: true, data: customers });

    } catch (error) {
        res.status(500).json({ sucess: false, message: "Error interno del servidor" });
        handleHttp(res, "ERROR_FILTER_CATEGORIES");
    }
}


function extractPublicId(imageUrl: string): string {
  const matches = imageUrl.match(/upload\/(?:v\d+\/)?([^\.]+)/);
  return matches ? matches[1] : '';
}

export { getCategoriesController, getCategoryByIdController, saveCategoryController, updateCategoryController,deleteCategoryController,filterCustomersController };