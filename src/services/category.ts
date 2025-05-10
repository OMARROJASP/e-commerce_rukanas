import { AppDataSource } from "../config/conexion";
import { Category } from "../interface/category.interface";

const categoryRepo = AppDataSource.getRepository("CategoryEntity");

const getCategories = async () => {
    const response = await categoryRepo.find();
    return response;

}

const getCategoryById = async (id:number) => {
    const response = await categoryRepo.findOneBy({cat_id: id})
    return response;
}

const insertCategory = async (category:Category) => {
    console.log("llego hasta qui", category)
    const response = await categoryRepo.save(category);
    console.log("response", response)
    return response;
}

const updateCategory = async (category:Category, id:number) => {
    const response = await categoryRepo.update(id, category);
    return response;
}

const deleteCategory = async (id:number) => {
    const response = await categoryRepo.delete(id);
    return response
}

export { getCategories, getCategoryById, insertCategory, updateCategory, deleteCategory };
