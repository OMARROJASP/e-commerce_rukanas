"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.getAllByOrder = exports.remove = exports.update = exports.create = exports.getById = exports.getAll = void 0;
const conexion_1 = require("../config/conexion");
const orderDetailRepository = conexion_1.AppDataSource.getRepository("OrderDetailEntity");
// Renombramos aquí 👇
const getAll = async () => {
    return await orderDetailRepository.find();
};
exports.getAll = getAll;
const getById = async (id) => {
    const response = await orderDetailRepository.findOneBy({ ord_det_id: id });
    console.log("Response from getById:", response);
    return response;
};
exports.getById = getById;
const create = async (data) => {
    return await orderDetailRepository.save(data);
};
exports.create = create;
const update = async (data, id) => {
    const response = await orderDetailRepository.update(id, data);
    return response;
};
exports.update = update;
const remove = async (id) => {
    await orderDetailRepository.delete(id);
    return { deleted: true };
};
exports.remove = remove;
// Para la plataforma de Admin
const getAllByOrder = async (id) => {
    return await orderDetailRepository.find({
        where: {
            ord_det_order_id: id
        },
        relations: ['ord_det_product']
    });
};
exports.getAllByOrder = getAllByOrder;
