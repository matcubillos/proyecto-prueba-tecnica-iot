import { Injectable, inject } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable, map } from 'rxjs';
import { io, Socket } from 'socket.io-client';
import { environment } from '../environments/enviroment';
import { Device, DeviceResponse, DeviceStats } from '../models/device/device.model';
import { DeviceMetric } from '../models/device/device-metric.model';

@Injectable({
  providedIn: 'root'
})
export class DeviceService {
  private apiUrl = environment.apiUrl;
  private socket: Socket;

  constructor(private http: HttpClient) {
    this.socket = io(this.apiUrl, { transports: ['websocket'] });
  }

  getDevices(): Observable<Device[]> {
    return this.http.get<DeviceResponse>(`${this.apiUrl}/devices`)
      .pipe(
        map(response => response.devices)
      );
  }

  getDevicesByType(deviceType: string): Observable<Device[]> {
    return this.http.get<DeviceResponse>(`${this.apiUrl}/devices/type/${encodeURIComponent(deviceType)}`)
      .pipe(
        map(response => response.devices)
      );
  }

  getDeviceStats(): Observable<DeviceStats> {
    return this.getDevices().pipe(
      map(devices => {
        const total = devices.length;
        const online = devices.filter(d => d.DEVICE_STATE === 'Online').length;
        const offline = devices.filter(d => d.DEVICE_STATE === 'Offline').length;
        const warning = devices.filter(d => d.DEVICE_STATE === 'Warning').length;

        return { total, online, offline, warning };
      })
    );
  }

  getDeviceById(id: number): Observable<Device> {
    return this.http.get<Device>(`${this.apiUrl}/devices/${id}`);
  }

  // WebSocket listeners
  onDeviceUpdate(callback: (device: Device) => void) {
    this.socket.on('device:update', callback);
  }

  onDeviceStateChange(callback: (data: { deviceId: number, newState: string }) => void) {
    this.socket.on('device:state-change', callback);
  }

  onMetricUpdate(callback: (data: { deviceId: number, metric: DeviceMetric }) => void) {
    this.socket.on('metric:new', (data) => {
      console.log('Received metric:new:', data); // Debug
      callback(data);
    });
  }

  disconnect() {
    if (this.socket) {
      this.socket.disconnect();
    }
  }
}