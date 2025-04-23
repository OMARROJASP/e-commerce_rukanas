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

    @Column()   
    cat_imageUrl!: string;  

    @Column()   
    cat_status!: number;

    @OneToMany(() => ProductEntity, product => product.prod_category)
    products!: ProductEntity[]; // Relación uno a muchos con ProductEntity
}