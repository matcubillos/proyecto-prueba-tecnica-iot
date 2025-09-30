import { Routes } from '@angular/router';
import { DashboardComponent } from './pages/dashboard/dashboard.component';
import { ConnectionLogsComponent } from './pages/connection-logs/connection-logs.component';

export const routes: Routes = [
    { path: '', redirectTo: '/dashboard', pathMatch: 'full' },
    { path: 'dashboard', component: DashboardComponent },
    { path: 'cameras', component: DashboardComponent },
    { path: 'plcs', component: DashboardComponent },
    { path: 'temperature', component: DashboardComponent },
    { path: 'beacons', component: DashboardComponent },
    { path: 'valves', component: DashboardComponent },
    { path: 'connection-logs', component: ConnectionLogsComponent }
  ];
