export interface IpCameraMetrics {
    status: 'Online' | 'Offline' | 'Warning';
    resolution: string;
    fps: number;
    storage_used_gb: number;
    bandwidth_mbps: number;
  }
  
  export interface PlcMetrics {
    status: 'Online' | 'Offline' | 'Warning';
    cpu_usage: number;
    memory_usage: number;
    io_modules_active: number;
    cycle_time_ms: number;
  }
  
  export interface TemperatureSensorMetrics {
    status: 'Online' | 'Offline' | 'Warning';
    temperature_c: number;
    humidity: number;
    battery: number;
  }
  
  export interface LedBeaconMetrics {
    status: 'Online' | 'Offline' | 'Warning';
    brightness: number;
    color: 'Red' | 'Green' | 'Blue' | 'Yellow' | 'Orange';
    flash_rate_hz: number;
  }
  
  export interface MotorizedValveMetrics {
    status: 'Online' | 'Offline' | 'Warning';
    position: 'Open' | 'Closed' | 'Partial';
    pressure_bar: number;
    flow_rate_lpm: number;
  }
  
  export type DeviceMetrics = 
    | IpCameraMetrics
    | PlcMetrics
    | TemperatureSensorMetrics
    | LedBeaconMetrics
    | MotorizedValveMetrics;
  
  export interface DeviceMetric {
    DEVICE_METRIC_ID: number;
    DEVICE_ID: number;
    METRIC_TIMESTAMP: string;
    METRICS: DeviceMetrics;
  }
  
  export interface DeviceMetricsResponse {
    message: string;
    deviceMetrics: DeviceMetric[];
  }