import { Column, Entity, PrimaryGeneratedColumn } from "typeorm";

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
}