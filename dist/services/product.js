"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.getProductsByOfert = exports.getFilterProducts = exports.deleteProduct = exports.updateProduct = exports.getProductById = exports.insertProduct = exports.getProducts = void 0;
const typeorm_1 = require("typeorm");
const conexion_1 = require("../config/conexion");
const product_entity_1 = require("../entities/product.entity");
const typeorm_2 = require("typeorm");
const productRepo = conexion_1.AppDataSource.getRepository(product_entity_1.ProductEntity);
const getProducts = async () => {
    const response = await productRepo.find();
    return response;
};
exports.getProducts = getProducts;
const getProductsByOfert = async () => {
    const response = await productRepo.find({
        where: {
            prod_ofert: (0, typeorm_2.MoreThan)(0),
        },
    });
    return response;
};
exports.getProductsByOfert = getProductsByOfert;
const getProductById = async (id) => {
    if (isNaN(id)) {
        throw new Error("El ID del producto no es un número válido");
    }
    const response = await productRepo.findOneBy({ prod_id: id });
    return response;
};
exports.getProductById = getProductById;
const insertProduct = async (product) => {
    const response = await productRepo.save(product);
    return response;
};
exports.insertProduct = insertProduct;
const updateProduct = async (product, id) => {
    const response = await productRepo.update(id, product);
    return response;
};
exports.updateProduct = updateProduct;
const deleteProduct = async (id) => {
    const response = await productRepo.delete(id);
    return response;
};
exports.deleteProduct = deleteProduct;
// Peticiones para filtrado de productos por categoria
const getFilterProducts = async (category, min, max, page = 1, limit = 10, ofert = false) => {
    const where = {};
    if (category) {
        where.prod_category = (0, typeorm_1.Equal)(category);
    }
    if (ofert) {
        where.prod_ofert = (0, typeorm_2.MoreThan)(0);
    }
    if (min != null && max != null) {
        where.prod_price = (0, typeorm_1.Between)(min, max);
    }
    else if (min != null) {
        where.prod_price = (0, typeorm_1.Between)(min, Number.MAX_SAFE_INTEGER);
    }
    else if (max != null) {
        where.prod_price = (0, typeorm_1.Between)(0, max);
    }
    const skip = (page - 1) * limit;
    // 1. obtengo productos del filtro
    const totalItems = await productRepo.find({ where });
    // 2. Productos Paginados
    const products = await productRepo.find({
        where,
        skip,
        take: limit,
        order: { prod_price: 'asc' }
    });
    // 3. Obtener min y max de precio con filtros aplicados
    const qb = productRepo.createQueryBuilder('product');
    if (category) {
        qb.andWhere('product.prod_category = :category', { category });
    }
    if (min != null) {
        qb.andWhere('product.prod_price >= :min', { min });
    }
    if (max != null) {
        qb.andWhere('product.prod_price <= :max', { max });
    }
    const { min: minPrice, max: maxPrice } = await qb
        .select('MIN(product.prod_price)', 'min')
        .addSelect('MAX(product.prod_price)', 'max')
        .getRawOne();
    // totalitems  es prosucts en el antiguo
    return {
        products,
        pagination: {
            totalItems,
            currentPage: page,
            totalPages: Math.ceil(totalItems.length / limit),
            itemsPerPage: limit
        },
        priceRange: {
            min: Number(minPrice),
            max: Number(maxPrice),
        },
    };
};
exports.getFilterProducts = getFilterProducts;
