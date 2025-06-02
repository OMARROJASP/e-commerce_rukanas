import { DeepPartial } from "typeorm";
import { AppDataSource } from "../config/conexion";
import { OrderDetailEntity } from "../entities/orderDetail.entity";

const orderDetailRepository  = AppDataSource.getRepository("OrderDetailEntity");

// Renombramos aquí 👇

const getAll = async () => {
  return await orderDetailRepository.find();
};

const getById = async(id: number) => {
    const response = await orderDetailRepository.findOneBy({ ord_det_id: id });
    console.log("Response from getById:", response);
    return response;
}

const create = async(data: DeepPartial<OrderDetailEntity>) => {
    return await orderDetailRepository.save(data);
}

const update  = async(data: DeepPartial<OrderDetailEntity>, id: number) => {   
    const response = await orderDetailRepository.update(id, data);
    return response;
}

const remove = async(id: number) => {
    await orderDetailRepository.delete(id);
    return { deleted: true };
}

// 👇 Exportamos con los nombres que espera el controlador genérico
export { getAll, getById, create, update, remove };