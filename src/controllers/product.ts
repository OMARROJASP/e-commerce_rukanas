import { Request, Response } from "express";
import { getProducts } from "../services/product";


const getProductsController = async (req: Request, res:Response) => {
    try{
      const  responseProducts = await getProducts();
      const data = responseProducts ? responseProducts : "No hay productos";
      res.send({message: "GET_ALL_PRODUCTS", data: data});

    }catch(e){
        console.log(e)
    }
}

export { getProductsController };