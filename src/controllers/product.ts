import { Request, Response } from "express";
import { getProducts, insertProduct,getProductById, updateProduct, deleteProduct } from "../services/product";


const getProductsController = async (req: Request, res:Response) => {
    try{
      const  responseProducts = await getProducts();
      const data = responseProducts ? responseProducts : "No hay productos";
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

const saveProductController = async (req: Request, res:Response) => {
    try{
        const { body } = req;
        const responseProducts = await insertProduct(body);
        const data = responseProducts ? responseProducts : "No se pudo guardar el producto";
        res.send({message: "POST_PRODUCT", data: data});
    }catch(e){
        console.log(e)
    }
}

const updateProductController = async (req: Request, res:Response) => {
    try{
        const { id } = req.params;
        const idNumber = parseInt(id);
        const { body } = req;
        const responseProducts = await updateProduct(body, idNumber);
        const data = responseProducts ? responseProducts : "No se pudo actualizar el producto";
        res.send({message: "PUT_PRODUCT", data: data});
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



export { getProductsController, saveProductController,getProductByIdController, updateProductController, deleteProductController};