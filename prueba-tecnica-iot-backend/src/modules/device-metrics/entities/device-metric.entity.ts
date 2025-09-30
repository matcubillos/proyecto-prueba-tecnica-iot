import { Device } from "src/modules/devices/entities/device.entity";
import { Column, Entity, JoinColumn, ManyToOne } from "typeorm";

@Entity('tbl_device_metric')
export class DeviceMetric {
    @Column({ primary: true, generated: true })
    DEVICE_METRIC_ID: number;

    @Column({ type: 'int', nullable: false })
    DEVICE_ID: number;

    @Column({ type: 'timestamp', default: () => 'CURRENT_TIMESTAMP' })
    METRIC_TIMESTAMP: Date;

    @Column({ type: 'jsonb', nullable: true })
    METRICS: Record<string, any>;

    @ManyToOne( () => Device )
    @JoinColumn({ name: 'DEVICE_ID' })
    device: Device;
}
