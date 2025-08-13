"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.deleteCategory = exports.updateCategory = exports.insertCategory = exports.getCategoryById = exports.getCategories = void 0;
const conexion_1 = require("../config/conexion");
const categoryRepo = conexion_1.AppDataSource.getRepository("CategoryEntity");
const getCategories = async () => {
    const response = await categoryRepo.find();
    return response;
};
exports.getCategories = getCategories;
const getCategoryById = async (id) => {
    const response = await categoryRepo.findOneBy({ cat_id: id });
    return response;
};
exports.getCategoryById = getCategoryById;
const insertCategory = async (category) => {
    const response = await categoryRepo.save(category);
    return response;
};
exports.insertCategory = insertCategory;
const updateCategory = async (category, id) => {
    const response = await categoryRepo.update(id, category);
    return response;
};
exports.updateCategory = updateCategory;
const deleteCategory = async (id) => {
    const response = await categoryRepo.delete(id);
    return response;
};
exports.deleteCategory = deleteCategory;
