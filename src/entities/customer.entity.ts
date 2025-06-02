import { Column, Entity, JoinColumn, OneToMany, PrimaryGeneratedColumn } from "typeorm";
import { OrderEntity } from "./order.entity";
import { join } from "path";
import * as bcrypt from "bcryptjs";

@Entity("customers")
export class CustomerEntity {
  @PrimaryGeneratedColumn()
  cx_id!: number;

  @Column({ type: "varchar", length: 50 })
  cx_first_name!: string;

  @Column({ type: "varchar", length: 50 })
  cx_last_name!: string;

  @Column({ type: "varchar", length: 100 , unique: true }) // normalmente el email debe ser único
  cx_email!: string;

  @Column({ type: "varchar", length: 100 })
  cx_password!: string;

  @Column({ type: "varchar", length: 100, nullable: true })
  cx_phone!:  string | null;

  @Column({ type: "varchar", length: 100 , nullable: true })
  cx_address!: string ;

  @Column({ type: "varchar", length: 100 })
  cx_city!: string;

  @Column({ type: "varchar", length: 100 })
  cx_postal_code!: string;

  // @OneToMany(() => CartItemEntity, item => item.user)
  // cartItems!: CartItemEntity[]

  @OneToMany(() => OrderEntity, order => order.ord_customer)
  orders!: OrderEntity[];




  // Metodo para encriptar contraseña
  async hashPassword(): Promise<void>{
    this.cx_password = await bcrypt.hash(this.cx_password,12)
  } 

  // Método para comparar contraseñas
  async comparePassword(cantidadPassword: string): Promise<boolean> {
    return bcrypt.compare(cantidadPassword, this.cx_password)
  }
}
