"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.getOrderByDay = exports.getAllOrderByCustomerId = exports.getInfoOrderAndCustomerId = exports.getFullOrderByCustomerId = exports.remove = exports.update = exports.create = exports.getById = exports.getAll = void 0;
const conexion_1 = require("../config/conexion");
const order_entity_1 = require("../entities/order.entity");
const orderRepository = conexion_1.AppDataSource.getRepository(order_entity_1.OrderEntity);
// Renombramos aquí 👇
const getAll = async () => {
    return await orderRepository.find();
};
exports.getAll = getAll;
const getById = async (id) => {
    return await orderRepository.findOneBy({ ord_id: id });
};
exports.getById = getById;
const create = async (data) => {
    return await orderRepository.save(data);
};
exports.create = create;
const update = async (data, id) => {
    const response = await orderRepository.update(id, data);
    return response;
};
exports.update = update;
const remove = async (id) => {
    await orderRepository.delete(id);
    return { deleted: true };
};
exports.remove = remove;
const getFullOrderByCustomerId = async (customerId) => {
    const order = await orderRepository.findOne({
        where: {
            ord_customer: { cx_id: customerId },
            ord_status: 'CREATED'
        },
        relations: ['orderDetails', 'orderDetails.ord_det_product']
    });
    return order;
};
exports.getFullOrderByCustomerId = getFullOrderByCustomerId;
// Para admin
const getInfoOrderAndCustomerId = async () => {
    return await orderRepository.find({
        relations: ['ord_customer']
    });
};
exports.getInfoOrderAndCustomerId = getInfoOrderAndCustomerId;
const getAllOrderByCustomerId = async (customerId) => {
    return await orderRepository.find({
        where: {
            ord_customer: { cx_id: customerId },
        },
        relations: ['ord_customer']
    });
};
exports.getAllOrderByCustomerId = getAllOrderByCustomerId;
const getOrderByDay = async () => {
    const fromDate = new Date();
    fromDate.setDate(fromDate.getDate() - 10);
    const result = await orderRepository
        .createQueryBuilder("order")
        .select("DATE(order.ord_date)", "date")
        .addSelect("COUNT(*)", "total")
        .where("order.ord_status = :status", { status: 'CREATED' })
        .andWhere("order.ord_date >= :fromDate", { fromDate })
        .groupBy("DATE(order.ord_date)")
        .orderBy("DATE(order.ord_date)", "ASC") // orden ascendente para mostrar en gráfica
        .getRawMany();
    const formatted = result.map(row => ({
        date: row.date,
        total: Number(row.total),
    }));
    return formatted;
};
exports.getOrderByDay = getOrderByDay;
