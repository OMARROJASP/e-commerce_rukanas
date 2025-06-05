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
 return await customerRepo.findOne({
    where: { cx_id: id },
    select: {
      cx_id: true,
      cx_first_name: true,
      cx_last_name:true,
      cx_phone: true,
      cx_address: true,
      cx_city: true,
      cx_postal_code: true,
      cx_email: true,
      // cx_password no lo incluyes
    }
  });
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
