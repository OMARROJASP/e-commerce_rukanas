import { DeepPartial, Like } from "typeorm";
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
    const response = await customerRepo.update( {cx_id:id}, data);
    return response;
}

const remove = async (id: number) => {
  await customerRepo.delete(id);
  return { deleted: true };
};

const getFilterCustomers = async (limit:number = 10, page:number = 1, text?:string) => {

  const where: any = {};

  // para la busqueda por texto
  if (text) {
    where.cx_first_name = Like(`%${text}%`)
  }

   const skip = (page - 1) * limit;

  // 1. obtengo customers del filtro

  const totalItems = await customerRepo.find({where,order: { cx_first_name: 'asc' }});

  // 2. Customers Paginados

  const customersTotal = await customerRepo.find({
    where,
    skip, 
    take: limit,
    order: { cx_first_name: 'asc' }
  })
  // 3. Obtengo filtro de customers

  const db = customerRepo.createQueryBuilder('customer');

  // 4 . Obtengo total de paginas
  const totalPages = Math.ceil(totalItems.length / limit);

  return {
    customersTotal,
    pagination: {
      totalItems: totalItems,
      currentPage: page,
      totalPages: totalPages,
      itemsPerPage: limit
    }
  }
}

// 👇 Exportamos con los nombres que espera el controlador genérico
export { getAll, getById, create, update, remove, getFilterCustomers };
