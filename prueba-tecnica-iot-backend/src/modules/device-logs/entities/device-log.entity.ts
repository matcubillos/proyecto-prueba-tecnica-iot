import { Column, Entity } from "typeorm";
import { ManyToOne, JoinColumn } from "typeorm";
import { Device } from "src/modules/devices/entities/device.entity";

@Entity('tbl_device_log')
export class DeviceLog {
    @Column({ primary: true, generated: true })
    DEVICE_LOG_ID: number;

    @Column({ type: 'int', nullable: false })
    DEVICE_ID: number;

    @Column({ type: 'timestamp', default: () => 'CURRENT_TIMESTAMP' })
    LOG_TIMESTAMP: Date;

    @Column({ type: 'text', nullable: false })
    LOG_MESSAGE: string;

    @ManyToOne( () => Device )
    @JoinColumn({ name: 'DEVICE_ID' })
    device: Device;
}
