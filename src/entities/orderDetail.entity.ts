import { Column, Entity, JoinColumn, ManyToOne, PrimaryGeneratedColumn } from "typeorm";
import { OrderEntity } from "./order.entity";
import { ProductEntity } from "./product.entity";

@Entity('order_details')
export class OrderDetailEntity{
    @PrimaryGeneratedColumn()
    ord_det_id!: number; // ID del detalle del pedido (clave primaria)

    @Column()
    ord_det_order_id!: number;

    @ManyToOne(() => OrderEntity, order => order.orderDetails,{ onDelete: 'CASCADE' })
    @JoinColumn({ name: "ord_det_order_id" })
    ord_det_order!: OrderEntity; // Relación muchos a uno con OrderEntity

    @Column()
    ord_det_product_id!: number;

    @ManyToOne(() => ProductEntity, product => product.prod_id)
    @JoinColumn({ name: "ord_det_product_id" })
    ord_det_product!: ProductEntity; // Relación muchos a uno con ProductEntity
    
    @Column()
    ord_det_quantity!: number; // Cantidad de productos en el detalle del pedido

    @Column({type: "decimal", precision: 10, scale: 2})   
    ord_det_unit_price!: number; // Precio del producto en el detalle del pedido

    @Column({ default: 0 })
    ord_det_discount!: number; // Precio total del detalle del pedido (cantidad * precio unitario)

    @Column({ type: "decimal", precision: 10, scale: 2 })
    ord_det_subtotal!: number;
}