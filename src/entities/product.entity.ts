import { Column, Entity, ManyToOne, OneToMany, PrimaryColumn, PrimaryGeneratedColumn } from "typeorm";
import { CategoryEntity } from "./category.entity";
import { SupplierEntity } from "./supplier.entity";
import { OrderDetailEntity } from "./orderDetail.entity";

@Entity('products')
export class ProductEntity {
  @PrimaryGeneratedColumn()
  prod_id!: number;

  @Column({ type: "varchar", length: 100 })
  prod_name!: string;

  @Column({ type: 'decimal', precision: 10, scale: 2 })
  prod_price!: number;

  @Column({ type: "varchar", length: 100 })
  prod_description!: string;

  @Column()
  prod_imageUrl!: string;

  @Column()
  prod_category!: string;

  @Column()
  prod_stock!: number;

  @Column()
  prod_supplier!: string;

  @ManyToOne(() => CategoryEntity, category => category.products)
  category!: CategoryEntity; // Relación muchos a uno con CategoryEntity

  @ManyToOne(() => SupplierEntity, supplier => supplier.sup_id)
  supplier!: SupplierEntity; // Relación muchos a uno con SupplierEntity

  @OneToMany(() => OrderDetailEntity, orderDetail => orderDetail.ord_det_product)
  orderDetails!: OrderDetailEntity[]; // Relación uno a muchos con OrderDetailEntity
}
