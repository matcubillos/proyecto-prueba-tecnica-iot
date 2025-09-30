import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable, map } from 'rxjs';
import { environment } from '../environments/enviroment';
import { DeviceMetric, DeviceMetricsResponse } from '../models/device/device-metric.model';

@Injectable({
  providedIn: 'root'
})
export class DeviceMetricsService {
  private apiUrl = environment.apiUrl;

  constructor(private http: HttpClient) {}

  getDeviceMetrics(deviceId: number): Observable<DeviceMetric[]> {
    return this.http.get<DeviceMetricsResponse>(`${this.apiUrl}/device-metrics/device/${deviceId}`)
      .pipe(
        map(response => response.deviceMetrics)
      );
  }

  getDeviceHistoricMetrics(deviceId: number): Observable<DeviceMetric[]> {
    return this.http.get<DeviceMetricsResponse>(`${this.apiUrl}/device-metrics/device/historic/${deviceId}`)
      .pipe(
        map(response => response.deviceMetrics)
      );
  }
}