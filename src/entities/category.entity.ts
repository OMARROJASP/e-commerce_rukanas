import { Column, Entity, OneToMany, PrimaryGeneratedColumn } from "typeorm";
import { ProductEntity } from "./product.entity";

@Entity('categories')
export class CategoryEntity {
    @PrimaryGeneratedColumn()
    cat_id!: number;

    @Column()
    cat_name!: string;

    @Column()
    cat_description!: string;   

    @Column({ type: 'varchar', length: 255, nullable: true })   
    cat_imageUrl!: string;  

    @Column()   
    cat_status!: number;

    @Column()   
    cat_area!: number; // 1: Tienda, 2: Lubricantes

    @OneToMany(() => ProductEntity, product => product.prod_category)
    products!: ProductEntity[]; // Relación uno a muchos con ProductEntity
}