import { DataSource } from "typeorm";
import { ProductEntity } from "../entities/product.entity";
import { CustomerEntity } from "../entities/customer.entity";
import { CategoryEntity } from "../entities/category.entity";
import { OrderEntity } from "../entities/order.entity";
import { SupplierEntity } from "../entities/supplier.entity";
import { OrderDetailEntity } from "../entities/orderDetail.entity";
import { BannerEntity } from "../entities/banner.entity";
import { PasswordResetToken } from "../entities/PasswordResetToken ";


export const AppDataSource = new DataSource({
    type: "mysql",
    host: process.env.DB_HOST || "localhost",
    port: parseInt(process.env.DB_PORT || '3306'),
    username: process.env.DB_USER || "root",
    password: process.env.DB_PASSWORD || "example",
    database: process.env.DB_NAME || "ecommerce",
    synchronize: true,
    logging: false,
    entities: [CustomerEntity, ProductEntity,CategoryEntity, OrderEntity, SupplierEntity, OrderDetailEntity, BannerEntity, PasswordResetToken],
    migrations: [],
    subscribers: [],
})