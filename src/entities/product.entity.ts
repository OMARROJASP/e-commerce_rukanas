import { Column, Entity, PrimaryColumn, PrimaryGeneratedColumn } from "typeorm";

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
}
