import { Request, Response } from "express";
import { deleteCategory, getCategories, getCategoryById, insertCategory, updateCategory } from "../services/category";
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

const saveCategoryController = async (req:Request, res:Response) => {
    try{
        const { body } = req;
        const responseCategories = await insertCategory(body);
        const data = responseCategories ? responseCategories : "No se pudo guardar la categoria";
        res.send({message: "POST_CATEGORY", data: data});
    }catch(e){
        handleHttp(res, "ERROR_GET_CATEGORIES")
    }
}

const updateCategoryController = async (req:Request, res:Response) => {
    try{
        const { id } = req.params;
        const idNumber = parseInt(id);
        const { body } = req;
        const responseCategories = await updateCategory(body, idNumber);
        const data = responseCategories ? responseCategories : "No se pudo actualizar la categoria";
        res.send({message: "PUT_CATEGORY", data: data});
    }catch(e){
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

export { getCategoriesController, getCategoryByIdController, saveCategoryController, updateCategoryController,deleteCategoryController };