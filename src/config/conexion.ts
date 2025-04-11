import { DataSource } from "typeorm";
import { ProductEntity } from "../entities/product.entity";
import { Customer } from "../entities/customer.entity";


export const AppDataSource = new DataSource({
    type: "mysql",
    host: "localhost",
    port: 3306,
    username: "root",
    password: "Rojas#$70",
    database: "rukanas_web",
    synchronize: true,
    logging: false,
    entities: [Customer, ProductEntity],
    migrations: [],
    subscribers: [],
})