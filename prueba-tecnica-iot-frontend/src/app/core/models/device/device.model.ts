export interface Device {
    DEVICE_ID: number;
    DEVICE_NAME: string;
    DEVICE_TYPE: string;
    DEVICE_STATE: string;
    DEVICE_IS_ACTIVE: boolean;
    CREATED_AT: string;
    UPDATED_AT: string;
  }
  
  export interface DeviceResponse {
    message: string;
    devices: Device[];
  }
  
  export interface DeviceStats {
    total: number;
    online: number;
    offline: number;
    warning: number;
  }