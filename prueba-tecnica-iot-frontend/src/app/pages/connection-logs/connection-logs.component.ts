import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { DeviceLogService } from '../../core/services/device-log.service';
import { DeviceService } from '../../core/services/device.service';
import { Device } from '../../core/models/device/device.model';
import { DeviceLog } from '../../core/models/device/device-log.model';

@Component({
  selector: 'app-connection-logs',
  standalone: true,
  imports: [CommonModule, FormsModule],
  templateUrl: './connection-logs.component.html',
  styleUrl: './connection-logs.component.css'
})
export class ConnectionLogsComponent implements OnInit {
  logs: DeviceLog[] = [];
  filteredLogs: DeviceLog[] = [];
  devices: Device[] = [];
  selectedDeviceId: number | string = 'all';
  loading = true;

  constructor(
    private deviceLogService: DeviceLogService,
    private deviceService: DeviceService
  ) {}

  ngOnInit() {
    this.loadDevices();
    this.loadLogs();
  }

  loadDevices() {
    this.deviceService.getDevices().subscribe({
      next: (devices) => {
        this.devices = devices;
      },
      error: (error) => {
        console.error('Error loading devices:', error);
      }
    });
  }

  loadLogs() {
    this.loading = true;
    this.deviceLogService.getDeviceLogs().subscribe({
      next: (logs) => {
        this.logs = logs.sort((a, b) => 
          new Date(b.LOG_TIMESTAMP).getTime() - new Date(a.LOG_TIMESTAMP).getTime()
        );
        this.filteredLogs = [...this.logs];
        this.loading = false;
      },
      error: (error) => {
        console.error('Error loading logs:', error);
        this.loading = false;
      }
    });
  }

  onDeviceFilterChange() {
    if (this.selectedDeviceId === 'all') {
      this.filteredLogs = [...this.logs];
    } else {
      this.filteredLogs = this.logs.filter(log => 
        log.DEVICE_ID === Number(this.selectedDeviceId)
      );
    }
  }

  getLogLevel(message: string): string {
    if (message.includes('[ERROR]')) return 'error';
    if (message.includes('[WARNING]')) return 'warning';
    if (message.includes('[INFO]')) return 'info';
    return 'default';
  }

  getDeviceName(deviceId: number): string {
    const device = this.devices.find(d => d.DEVICE_ID === deviceId);
    return device?.DEVICE_NAME || `Device ${deviceId}`;
  }
}