import { DataSource } from "typeorm";
import { ProductEntity } from "../entities/product.entity";
import { CustomerEntity } from "../entities/customer.entity";
import { CategoryEntity } from "../entities/category.entity";
import { OrderEntity } from "../entities/order.entity";
import { SupplierEntity } from "../entities/supplier.entity";
import { OrderDetailEntity } from "../entities/orderDetail.entity";
import { BannerEntity } from "../entities/banner.entity";


export const AppDataSource = new DataSource({
    type: "mysql",
    host: process.env.DB_HOST,
    port: parseInt(process.env.DB_PORT || "3306"),
    username: process.env.DB_USER,
    password: process.env.DB_PASSWORD,
    database: process.env.DB_NAME,
    synchronize: true,
    logging: false,
    entities: [CustomerEntity, ProductEntity,CategoryEntity, OrderEntity, SupplierEntity, OrderDetailEntity, BannerEntity],
    migrations: [],
    subscribers: [],
})