import { DeepPartial } from "typeorm";
import { AppDataSource } from "../config/conexion";
import { SupplierEntity } from "../entities/supplier.entity";

const supplierRepository = AppDataSource.getRepository(SupplierEntity);

// Renombramos aquí 👇

const getAll = async () => {
  return await supplierRepository.find();
};

const getById = async(id: number) => {
    return await supplierRepository.findOneBy({ sup_id: id });
}

const create = async(data: DeepPartial<SupplierEntity>) => {
    return await supplierRepository.save(data);
}

const update  = async(data: DeepPartial<SupplierEntity>, id: number) => {   
    const response = await supplierRepository.update(id, data);
    return response;
}

const remove = async(id: number) => {
    await supplierRepository.delete(id);
    return { deleted: true };
}

// 👇 Exportamos con los nombres que espera el controlador genérico
export { getAll, getById, create, update, remove };