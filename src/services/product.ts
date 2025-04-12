import { AppDataSource } from "../config/conexion";
import { ProductEntity } from "../entities/product.entity";

const getProducts = async () => {
    const productRepo = AppDataSource.getRepository(ProductEntity);
    const response = await productRepo.find();
   return response;
}

export { getProducts };