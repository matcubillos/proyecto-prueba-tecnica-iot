import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable, map } from 'rxjs';
import { environment } from '../environments/enviroment';
import { DeviceLog, DeviceLogResponse } from '../models/device/device-log.model';


@Injectable({
  providedIn: 'root'
})
export class DeviceLogService {
  private apiUrl = environment.apiUrl;

  constructor(private http: HttpClient) { }

  getDeviceLogs(): Observable<DeviceLog[]> {
    return this.http.get<DeviceLogResponse>(`${this.apiUrl}/device-logs`)
      .pipe(
        map(response => response.deviceLogs)
      );
  }

  getLogsByDeviceId(deviceId: number): Observable<DeviceLog[]> {
    return this.getDeviceLogs().pipe(
      map(logs => logs.filter(log => log.DEVICE_ID === deviceId))
    );
  }
}