import { Column, Entity, PrimaryGeneratedColumn, CreateDateColumn, UpdateDateColumn } from "typeorm";

@Entity('banners')
export class BannerEntity {
    @PrimaryGeneratedColumn()
    bnn_id?: number;
    
    @Column()
    bnn_title?: string;

    @Column()
    bnn_description?: string;

    @Column()
    bnn_image_url_desktop?: string;

    @Column()
    bnn_image_url_mobile?: string;

    @Column()
    bnn_is_active?: boolean;

    @Column()
    bnn_position?: number;

    @CreateDateColumn({ type: "timestamp" })
    bnn_created_at?: Date

    @UpdateDateColumn({ type: "timestamp" })
    bnn_updated_at?: Date;

}