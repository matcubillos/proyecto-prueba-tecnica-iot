import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { DeviceStats } from '../../core/models/device/device.model';
import { DeviceService } from '../../core/services/device.service';
import { DashboardCommunicationService } from '../../core/services/dashboards-comms';
import { RouterLink } from '@angular/router';

@Component({
  selector: 'app-sidebar',
  standalone: true,
  imports: [CommonModule, RouterLink],
  templateUrl: './sidebar.component.html',
  styleUrl: './sidebar.component.css'
})
export class SidebarComponent implements OnInit {
  menuItems = [
    { icon: 'bi-grid-fill', label: 'Todos', route: '/dashboard', active: true, deviceType: 'all' },
    { icon: 'bi-camera-video-fill', label: 'Cámaras IP', route: '/cameras', active: false, deviceType: 'IP Camera' },
    { icon: 'bi-cpu-fill', label: 'PLCs', route: '/plcs', active: false, deviceType: 'PLC' },
    { icon: 'bi-thermometer-half', label: 'Sensores de Temperatura', route: '/temperature', active: false, deviceType: 'Temperature Sensor' },
    { icon: 'bi-lightbulb-fill', label: 'Balizas LED', route: '/beacons', active: false, deviceType: 'LED Beacon' },
    { icon: 'bi-gear-fill', label: 'Válvulas', route: '/valves', active: false, deviceType: 'Motorized Valve' }
  ];

  deviceStats: DeviceStats = {
    total: 0,
    online: 0,
    offline: 0,
    warning: 0
  };

  loading = true;

  constructor(
    private deviceService: DeviceService,
    private dashboardService: DashboardCommunicationService
  ) { }

  ngOnInit() {
    this.loadDeviceStats();
  }

  loadDeviceStats() {
    this.deviceService.getDeviceStats().subscribe({
      next: (stats) => {
        this.deviceStats = stats;
        this.loading = false;
      },
      error: (error) => {
        console.error('Error loading device stats:', error);
        this.loading = false;
      }
    });
  }

  onMenuItemClick(item: any) {
    this.menuItems.forEach(menuItem => menuItem.active = false);
    item.active = true;
    this.dashboardService.setDeviceType(item.deviceType);
  }
}