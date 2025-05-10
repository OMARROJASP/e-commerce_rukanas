import { DataSource } from "typeorm";
import { ProductEntity } from "../entities/product.entity";
import { CustomerEntity } from "../entities/customer.entity";
import { CategoryEntity } from "../entities/category.entity";
import { OrderEntity } from "../entities/order.entity";
import { SupplierEntity } from "../entities/supplier.entity";
import { OrderDetailEntity } from "../entities/orderDetail.entity";


export const AppDataSource = new DataSource({
    type: "mysql",
    host: "localhost",
    port: 3306,
    username: "root",
    password: "Rojas#$70",
    database: "rukanas_web",
    synchronize: true,
    logging: false,
    entities: [CustomerEntity, ProductEntity,CategoryEntity, OrderEntity, SupplierEntity, OrderDetailEntity],
    migrations: [],
    subscribers: [],
})