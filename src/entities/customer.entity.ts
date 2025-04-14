import { Column, Entity, PrimaryGeneratedColumn } from "typeorm";

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
}
