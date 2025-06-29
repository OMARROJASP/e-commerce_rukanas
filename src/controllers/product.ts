import { NextFunction, Request, Response } from "express";
import { getProducts, insertProduct,getProductById, updateProduct, deleteProduct, getFilterProducts, getProductsByOfert } from "../services/product";
import { Product } from "../interface/product.interface";
import { cloudinary } from "../config/cloudinaryConfig";


const getProductsController = async (req: Request, res:Response) => {
    try{
      const  responseProducts = await getProducts();
      const data = responseProducts ? responseProducts : "No hay productos";
      res.send({message: "GET_ALL_PRODUCTS", data: data});

    }catch(e){
        console.log(e)
    }
}

const getProductsByOfertController = async (req: Request, res:Response) => {
    try{
      const  responseProducts = await getProductsByOfert();
      const data = responseProducts ? responseProducts : "No hay productos con ofertas";
      res.send({message: "GET_ALL_PRODUCTS", data: data});

    }catch(e){
        console.log(e)
    }
}

const getProductByIdController = async (req: Request, res:Response) => {
    try{       
        const { id } = req.params;
        const idNumber = parseInt(id);
        const responseProducts = await getProductById(idNumber);
        const data = responseProducts ? responseProducts : "No hay producto";
        res.send({message: "GET_PRODUCT_BY_ID", data: data});
    }catch(e){   
      console.log(e)
       }
      }

const saveProductController = async (req: Request, res:Response, next: NextFunction) => {
    try{
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
        const productData= {
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
        const responseProducts = await insertProduct(productData);
       res.status(201).json({
            message: "producto creada exitosamente",
            data: responseProducts
        });
    }catch(e){
         console.error("Error al guardar producto:", e);
    }
}

const updateProductController = async (req: Request, res:Response) => {
    try{
        const { id } = req.params;
        const idNumber = parseInt(id);
        // 1. Verificar si la producto existe
        const existingProduct = await getProductById(idNumber);
        if(!existingProduct){
            res.status(404).json({
                message: "Producto no encontrada"
            });
            return;
        }
        // 2. Verificar si hay imágenes subidas
        let mainImageUrl = existingProduct.prod_imageUrl;

         if( req.body.imageUrls && req.body.imageUrls.length > 0){
                    mainImageUrl = req.body.imageUrls[0];
        
                    // 3. Opcional: Si se subieron nuevas imágenes, puedes eliminar las antiguas
                    if ( existingProduct.prod_imageUrl ){
                        try{
                            const publicId = extractPublicId(existingProduct.prod_imageUrl);
                            await cloudinary.uploader.destroy(publicId);    
                        }catch(error){
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

        const responseProducts = await updateProduct(productData, idNumber);
        res.status(200).json({
            message: "Producto actualizado exitosamente",
            data: responseProducts,
        })
    }catch(e){  
        console.log(e)
    }
}

const deleteProductController = async (req: Request, res:Response) => { 
    try{
        const { id } = req.params;
        const idNumber = parseInt(id);
        const responseProducts = await deleteProduct(idNumber);
        const data = responseProducts ? responseProducts : "No se pudo eliminar el producto";
        res.send({message: "DELETE_PRODUCT", data: data});        
    }catch(e){  
        console.log(e)
    }
}

const getProductsByFilterController = async (req: Request, res: Response, next: NextFunction): Promise<void> => {
  try {
    const { category, min, max, page,limit, ofert } = req.query;

    // if (!category || typeof category !== "string") {
    //    res.status(400).json({ message: "Parámetro 'category' inválido o faltante" });
    //    return;
    // }
 

    const responseProducts = await getFilterProducts(
        category as string,
        min ? parseFloat(min as string) : undefined,
        max ? parseFloat(max as string) : undefined,
        page ? parseInt(page as string) : 1,
        limit ? parseInt(limit as string) : 10,
        ofert ?  true : false
    ); 

    if (!responseProducts.products.length) {

       res.status(404).json({ message: "No se encontraron productos para esta filtro", data: responseProducts });
    }

   

    res.status(200).json({ message: "LIST_PRODUCTS_BY_producto", data: responseProducts });
  } catch (e) {
    res.status(500).json({ message: "Error interno del servidor" });
  }
};


function extractPublicId(imageUrl: string): string {
  const matches = imageUrl.match(/upload\/(?:v\d+\/)?([^\.]+)/);
  return matches ? matches[1] : '';
}

export { getProductsController, saveProductController,getProductByIdController, updateProductController, deleteProductController,getProductsByFilterController, getProductsByOfertController};