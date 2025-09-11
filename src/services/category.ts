import { Like } from "typeorm";
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
    const response = await categoryRepo.save(category);
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

const getFilterCategory = async (limit:number = 10, page:number = 1, text?:string) => {

  const where: any = {};

  // para la busqueda por texto
  if (text) {
    where.cat_name = Like(`%${text}%`)
  }

   const skip = (page - 1) * limit;

  // 1. obtengo customers del filtro

  const totalItems = await categoryRepo.find({where,order: { cat_name: 'asc' }});

  // 2. Customers Paginados

  const categoriesTotal = await categoryRepo.find({
    where,
    skip, 
    take: limit,
    order: { cat_name: 'asc' }
  })
   // 4 . Obtengo total de paginas
  const totalPages = Math.ceil(totalItems.length / limit);

  return {
    categoriesTotal,
    pagination: {
      totalItems: totalItems,
      currentPage: page,
      totalPages: totalPages,
      itemsPerPage: limit
    }
  }
}
export { getCategories, getCategoryById, insertCategory, updateCategory, deleteCategory,getFilterCategory };
