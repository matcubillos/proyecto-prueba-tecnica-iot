import { Column, Entity } from "typeorm";

@Entity('tbl_device')
export class Device {
    @Column({ primary: true, generated: true })
    DEVICE_ID: number;

    @Column({ type: 'varchar', length: 100, nullable: false })
    DEVICE_NAME: string;

    @Column({ type: 'varchar', length: 100, nullable: false })
    DEVICE_TYPE: string;

    @Column({type: 'varchar', length: 100, nullable: false })
    DEVICE_STATE: string;

    @Column({ type: 'boolean', default: true })
    DEVICE_IS_ACTIVE: boolean;

    @Column({ type: 'timestamp', default: () => 'CURRENT_TIMESTAMP' })
    CREATED_AT: Date;

    @Column({ type: 'timestamp', default: () => 'CURRENT_TIMESTAMP', onUpdate: 'CURRENT_TIMESTAMP' })
    UPDATED_AT: Date;

}
