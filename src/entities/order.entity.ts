import { Column, CreateDateColumn, Entity, ManyToOne, OneToMany, PrimaryGeneratedColumn } from "typeorm";
import { CustomerEntity } from "./customer.entity";
import { OrderDetailEntity } from "./orderDetail.entity";

@Entity('orders')
export class OrderEntity {
    @PrimaryGeneratedColumn()
    ord_id!: number;

    @CreateDateColumn({ type: "timestamp" })
    ord_date!: Date; // Fecha del pedido    

    @Column()
    ord_status!: string; // Estado del pedido (ej. "Pendiente", "Enviado", "Entregado")

    @ManyToOne(() => CustomerEntity, customer => customer.orders)
    ord_customer!: CustomerEntity; // Relación muchos a uno con CustomerEntity

    @OneToMany(() => OrderDetailEntity, orderDetail => orderDetail.ord_det_order)
    orderDetails!: OrderDetailEntity[]; // Relación uno a muchos con OrderDetailEntity
}