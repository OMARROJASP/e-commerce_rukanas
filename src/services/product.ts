import { AppDataSource } from "../config/conexion";
import { ProductEntity } from "../entities/product.entity";
import { Product } from "../interface/product.interface";

const productRepo = AppDataSource.getRepository(ProductEntity);

const getProducts = async () => {
    const response = await productRepo.find();
   return response;
}

const getProductById = async (id: number) => {
    if (isNaN(id)) {
        throw new Error("El ID del producto no es un número válido");
    }

    const response = await productRepo.findOneBy({ prod_id: id });
    return response;
}


const insertProduct = async (product:Product) => {
    const response = await productRepo.save(product);
    return response;
}

const updateProduct = async (product:Product, id:number) => {
    const response = await productRepo.update(id, product);
    return response;
}

const deleteProduct = async (id:number) => {
    const response = await productRepo.delete(id);
    return response
}

// Peticiones para filtrado de productos por categoria

const getProductsByCategory = async (category: string) => {
  return await productRepo.find({
    where: { prod_category: category }
  });
};


export { getProducts,insertProduct,getProductById,updateProduct, deleteProduct, getProductsByCategory };   