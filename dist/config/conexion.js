"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.AppDataSource = void 0;
const typeorm_1 = require("typeorm");
const product_entity_1 = require("../entities/product.entity");
const customer_entity_1 = require("../entities/customer.entity");
const category_entity_1 = require("../entities/category.entity");
const order_entity_1 = require("../entities/order.entity");
const supplier_entity_1 = require("../entities/supplier.entity");
const orderDetail_entity_1 = require("../entities/orderDetail.entity");
const banner_entity_1 = require("../entities/banner.entity");
exports.AppDataSource = new typeorm_1.DataSource({
    type: "mysql",
    host: process.env.DB_HOST,
    port: parseInt(process.env.DB_PORT || "3306"),
    username: process.env.DB_USER,
    password: process.env.DB_PASSWORD,
    database: process.env.DB_NAME,
    synchronize: true,
    logging: false,
    entities: [customer_entity_1.CustomerEntity, product_entity_1.ProductEntity, category_entity_1.CategoryEntity, order_entity_1.OrderEntity, supplier_entity_1.SupplierEntity, orderDetail_entity_1.OrderDetailEntity, banner_entity_1.BannerEntity],
    migrations: [],
    subscribers: [],
    ssl: {
    rejectUnauthorized: false,
  }
});
