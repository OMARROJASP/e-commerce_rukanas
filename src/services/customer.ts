import { DeepPartial } from "typeorm";
import { AppDataSource } from "../config/conexion";
import { CustomerEntity } from "../entities/customer.entity";
import { Customer } from "../interface/customer.interface";

const customerRepo = AppDataSource.getRepository(CustomerEntity);

// Renombramos aquí 👇
const getAll = async () => {
  return await customerRepo.find();
};

const getById = async (id: number) => {
  return await customerRepo.findOneBy({ cx_id: id });
};

const create = async (data: DeepPartial<CustomerEntity>) => {
    return await customerRepo.save(data);
};  

const update = async (data: Partial<CustomerEntity>, id: number) => {
    const response = await customerRepo.update(id, data);
    return response;
}

const remove = async (id: number) => {
  await customerRepo.delete(id);
  return { deleted: true };
};

// 👇 Exportamos con los nombres que espera el controlador genérico
export { getAll, getById, create, update, remove };
