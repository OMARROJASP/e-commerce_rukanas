import { AppDataSource } from "../config/conexion";
import { ProductEntity } from "../entities/product.entity";
import { Product } from "../interface/product.interface";

const productRepo = AppDataSource.getRepository(ProductEntity);

const getProducts = async () => {
    const response = await productRepo.find();
   return response;
}

const getProductById = async (id:number) => {
    const response = await productRepo.findOneBy({ prod_id: id });
    return response;
}

const insertProduct = async (product:Product) => {
    const response = await productRepo.save(product);
    return response;
}


export { getProducts,insertProduct,getProductById };   