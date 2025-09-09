import { Entity, PrimaryGeneratedColumn, Column, ManyToOne, CreateDateColumn } from "typeorm";
import { CustomerEntity } from "./customer.entity";

@Entity()
export class PasswordResetToken {
  @PrimaryGeneratedColumn()
  id!: number;

  @Column()
  token!: string;

  @Column()
  expiresAt!: Date;

  @CreateDateColumn()
  createdAt!: Date;

  @ManyToOne(() => CustomerEntity, customer => customer.passwordResetTokens, { onDelete: "CASCADE" })
  customer!: CustomerEntity;
}
