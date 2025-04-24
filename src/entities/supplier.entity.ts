import { Column, Entity, OneToMany, PrimaryGeneratedColumn } from "typeorm";
import { ProductEntity } from "./product.entity";


@Entity('suppliers')
export class SupplierEntity {

    @PrimaryGeneratedColumn()
    sup_id!: number; // ID del proveedor    

    @Column()
    sup_name!: string; // Nombre del proveedor

    @Column()
    sup_contact_name!: string; // Nombre del contacto del proveedor

    @Column()
    sup_address!: string; // Dirección del proveedor    
    
    @Column()   
    sup_city!: string; // Ciudad del proveedor

    @Column()
    sup_postal_code!: string; // Código postal del proveedor

    @Column()
    sup_country!: string; // País del proveedor 

    @Column()   
    sup_phone!: string; // Teléfono del proveedor   

    @Column()
    sup_email!: string; // Email del proveedor
    
    @OneToMany(() => ProductEntity, product => product.prod_supplier)   
    products!: ProductEntity[]; // Relación uno a muchos con ProductEntity


}