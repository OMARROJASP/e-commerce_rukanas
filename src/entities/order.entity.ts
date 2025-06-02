import { Column, CreateDateColumn, Entity, JoinColumn, ManyToOne, OneToMany, PrimaryGeneratedColumn } from "typeorm";
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
    @JoinColumn({ name: "ord_customer" }) // Opcionalmente puedes especificar el nombre si quieres un FK claro
    ord_customer!: CustomerEntity;
    @OneToMany(() => OrderDetailEntity, orderDetail => orderDetail.ord_det_order, { cascade: true})
    orderDetails!: OrderDetailEntity[]; // Relación uno a muchos con OrderDetailEntity
}