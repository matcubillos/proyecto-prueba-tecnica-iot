import { Device } from "src/modules/devices/entities/device.entity";
import { Column, Entity, JoinColumn, ManyToOne } from "typeorm";

@Entity('tbl_device_location')
export class DeviceLocation {
    @Column({ primary: true, generated: true })
    DEVICE_LOCATION_ID: number;

    @Column({ type: 'int', nullable: false })
    DEVICE_ID: number;

    @Column({ type: 'varchar', length: 100, nullable: false })
    DEVICE_LAT: string;

    @Column({ type: 'varchar', length: 100, nullable: false })
    DEVICE_LON: string;

    @Column({type: 'timestamp', default: () => 'CURRENT_TIMESTAMP' })
    DEVICE_LOCATION_TIMESTAMP: Date;
    
    @ManyToOne( () => Device )
    @JoinColumn({ name: 'DEVICE_ID' })
    device: Device;
}
