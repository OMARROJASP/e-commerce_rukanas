import { Request, Response } from "express";
import { getProducts, insertProduct,getProductById } from "../services/product";


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
        const data = responseProducts ? responseProducts : "No hay productos";
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



export { getProductsController, saveProductController,getProductByIdController };