export interface DeviceLog {
    DEVICE_LOG_ID: number;
    DEVICE_ID: number;
    LOG_TIMESTAMP: string;
    LOG_MESSAGE: string;
  }
  
  export interface DeviceLogResponse {
    message: string;
    deviceLogs: DeviceLog[];
  }