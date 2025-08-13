"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.remove = exports.update = exports.create = exports.getById = exports.getAll = void 0;
const conexion_1 = require("../config/conexion");
const banner_entity_1 = require("../entities/banner.entity");
const bannerRepo = conexion_1.AppDataSource.getRepository(banner_entity_1.BannerEntity);
const getAll = async () => {
    const response = await bannerRepo.find();
    return response;
};
exports.getAll = getAll;
const getById = async (id) => {
    const response = await bannerRepo.findOneBy({ bnn_id: id });
    return response;
};
exports.getById = getById;
const create = async (data) => {
    const response = await bannerRepo.save(data);
    return response;
};
exports.create = create;
const update = async (data, id) => {
    const response = await bannerRepo.update(id, data);
    return response;
};
exports.update = update;
const remove = async (id) => {
    const response = await bannerRepo.delete(id);
    return response;
};
exports.remove = remove;
