import { Request, Response } from "express";
import { getCategories } from "../services/category";
import { handleHttp } from "../utils/error.handler";

const getCategoriesController = async (req:Request, res:Response) => {
    try{
        const responseCategories = await getCategories();
        const data = responseCategories ? responseCategories : "No hay categorias";
        res.send({message: "GET_ALL_CATEGORIES", data: data});
    }catch(e){
        handleHttp(res, "ERROR_GET_CATEGORIES")
    }
}

export { getCategoriesController };