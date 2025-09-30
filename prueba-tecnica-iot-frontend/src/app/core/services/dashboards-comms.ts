import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class DashboardCommunicationService {
  private deviceTypeSubject = new BehaviorSubject<string>('all');
  deviceType$ = this.deviceTypeSubject.asObservable();

  setDeviceType(type: string) {
    this.deviceTypeSubject.next(type);
  }
}