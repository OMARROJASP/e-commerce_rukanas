"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.remove = exports.update = exports.create = exports.getById = exports.getAll = void 0;
const conexion_1 = require("../config/conexion");
const customer_entity_1 = require("../entities/customer.entity");
const customerRepo = conexion_1.AppDataSource.getRepository(customer_entity_1.CustomerEntity);
// Renombramos aquí 👇
const getAll = async () => {
    return await customerRepo.find();
};
exports.getAll = getAll;
const getById = async (id) => {
    return await customerRepo.findOne({
        where: { cx_id: id },
        select: {
            cx_id: true,
            cx_first_name: true,
            cx_last_name: true,
            cx_phone: true,
            cx_address: true,
            cx_city: true,
            cx_postal_code: true,
            cx_email: true,
            // cx_password no lo incluyes
        }
    });
};
exports.getById = getById;
const create = async (data) => {
    return await customerRepo.save(data);
};
exports.create = create;
const update = async (data, id) => {
    const response = await customerRepo.update(id, data);
    return response;
};
exports.update = update;
const remove = async (id) => {
    await customerRepo.delete(id);
    return { deleted: true };
};
exports.remove = remove;
