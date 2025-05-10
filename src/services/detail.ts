import { DeepPartial } from "typeorm";
import { AppDataSource } from "../config/conexion";
import { OrderDetailEntity } from "../entities/orderDetail.entity";

const orderRepository = AppDataSource.getRepository("OrderEntity");

// Renombramos aquí 👇

const getAll = async () => {
  return await orderRepository.find();
};

const getById = async(id: number) => {
    return await orderRepository.findOneBy({ ord_id: id });
}

const create = async(data: DeepPartial<OrderDetailEntity>) => {
    return await orderRepository.save(data);
}

const update  = async(data: DeepPartial<OrderDetailEntity>, id: number) => {   
    const response = await orderRepository.update(id, data);
    return response;
}

const remove = async(id: number) => {
    await orderRepository.delete(id);
    return { deleted: true };
}

// 👇 Exportamos con los nombres que espera el controlador genérico
export { getAll, getById, create, update, remove };