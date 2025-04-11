import { Column, Entity, PrimaryColumn } from "typeorm";

@Entity('products')
export class ProductEntity {
  @PrimaryColumn()
  prod_id!: number;

  @Column({ type: "varchar", length: 100 })
  prod_name!: string;

  @Column()
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
