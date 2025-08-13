"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.remove = exports.update = exports.create = exports.getById = exports.getAll = void 0;
const conexion_1 = require("../config/conexion");
const supplier_entity_1 = require("../entities/supplier.entity");
const supplierRepository = conexion_1.AppDataSource.getRepository(supplier_entity_1.SupplierEntity);
// Renombramos aquí 👇
const getAll = async () => {
    return await supplierRepository.find();
};
exports.getAll = getAll;
const getById = async (id) => {
    return await supplierRepository.findOneBy({ sup_id: id });
};
exports.getById = getById;
const create = async (data) => {
    return await supplierRepository.save(data);
};
exports.create = create;
const update = async (data, id) => {
    const response = await supplierRepository.update(id, data);
    return response;
};
exports.update = update;
const remove = async (id) => {
    await supplierRepository.delete(id);
    return { deleted: true };
};
exports.remove = remove;
