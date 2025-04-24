import { Column, Entity, ManyToOne, PrimaryGeneratedColumn } from "typeorm";
import { CustomerEntity } from "./customer.entity";

@Entity('orders')
export class OrderEntity {
    @PrimaryGeneratedColumn()
    ord_id!: number;

    @Column()
    ord_date!: Date; // Fecha del pedido    

    @Column()
    ord_status!: string; // Estado del pedido (ej. "Pendiente", "Enviado", "Entregado")

    @ManyToOne(() => CustomerEntity, customer => customer.orders)
    ord_customer!: CustomerEntity; // Relación muchos a uno con CustomerEntity
}