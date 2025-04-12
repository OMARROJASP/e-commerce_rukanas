import { AppDataSource } from "../config/conexion";
import { ProductEntity } from "../entities/product.entity";
import { Product } from "../interface/product.interface";

const getProducts = async () => {
    const productRepo = AppDataSource.getRepository(ProductEntity);
    const response = await productRepo.find();
   return response;
}

const insertProduct = async (product:Product) => {
    console.log("Ingresa Aqui")
    const productRepo = AppDataSource.getRepository(ProductEntity);
    const response = await productRepo.save(product);
    return response;
}

export { getProducts,insertProduct };