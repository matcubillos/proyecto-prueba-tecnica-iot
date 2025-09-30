import { Component, OnInit, OnDestroy } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Subscription } from 'rxjs';
import { DeviceService } from '../../core/services/device.service';
import { DeviceMetricsService } from '../../core/services/device-metrics.service';
import { Device } from '../../core/models/device/device.model';
import { DashboardCommunicationService } from '../../core/services/dashboards-comms';
import { FilterBarComponent, FilterOptions } from '../../shared/filter-bar/filter-bar.component';
import { NgApexchartsModule } from 'ng-apexcharts';
import { ApexOptions, ApexAxisChartSeries, ApexChart, ApexXAxis, ApexYAxis, ApexTitleSubtitle, ApexFill } from 'ng-apexcharts';
import { DeviceMetric } from '../../core/models/device/device-metric.model';

@Component({
  selector: 'app-dashboard',
  standalone: true,
  imports: [CommonModule, FilterBarComponent, NgApexchartsModule],
  templateUrl: './dashboard.component.html',
  styleUrl: './dashboard.component.css'
})
export class DashboardComponent implements OnInit, OnDestroy {
  devices: Device[] = [];
  filteredDevices: Device[] = [];
  loading = true;
  currentFilters: FilterOptions = {
    deviceType: 'all',
    status: 'all',
    searchTerm: ''
  };
  selectedDevice: Device | null = null;
  deviceMetrics: DeviceMetric[] = [];
  deviceHistoricMetrics: DeviceMetric[] = [];
  showMetricsModal = false;
  chartMetricKey: string = '';
  chartMetricLabel: string = '';
  alertMessage: string | null = null; // Para el toast

  // Configuración del gráfico
  chartOptions: ApexOptions = {
    chart: {
      type: 'line',
      height: 300,
      zoom: { enabled: true },
      animations: {
        enabled: true,
        easing: 'linear',
        speed: 200,
        animateGradually: { enabled: true, delay: 100 }
      },
      background: 'transparent',
      foreColor: '#f1f5f9'
    } as ApexChart,
    series: [{ name: '', data: [] }] as ApexAxisChartSeries,
    xaxis: {
      type: 'datetime',
      title: { text: 'Fecha', style: { color: '#cbd5e1' } },
      labels: {
        style: { colors: '#94a3b8' },
        datetimeFormatter: {
          year: 'yyyy',
          month: "MMM 'yy",
          day: 'dd MMM',
          hour: 'HH:mm'
        }
      }
    } as ApexXAxis,
    yaxis: {
      title: { text: '', style: { color: '#cbd5e1' } },
      labels: { style: { colors: '#94a3b8' } },
      decimalsInFloat: 1
    } as ApexYAxis,
    title: {
      text: '',
      align: 'center',
      style: { color: '#f1f5f9', fontSize: '16px' }
    } as ApexTitleSubtitle,
    colors: ['#22d3ee'], // Cyan suave para la línea
    stroke: { width: 3, curve: 'smooth' },
    fill: {
      type: 'gradient',
      gradient: {
        shade: 'dark',
        type: 'vertical',
        shadeIntensity: 0.5,
        opacityFrom: 0.7,
        opacityTo: 0.3
      }
    } as ApexFill,
    grid: {
      borderColor: '#334155',
      strokeDashArray: 4
    },
    tooltip: {
      enabled: true,
      theme: 'dark',
      x: { format: 'dd MMM yyyy HH:mm' },
      y: {
        formatter: (val: number) => `${val.toFixed(1)}`
      },
      style: {
        fontSize: '14px',
        fontFamily: 'Inter, sans-serif'
      },
      marker: { show: true }
    }
  };

  private deviceTypeSubscription?: Subscription;

  constructor(
    private deviceService: DeviceService,
    private deviceMetricsService: DeviceMetricsService,
    private dashboardService: DashboardCommunicationService
  ) {}

  ngOnInit() {
    this.loadDevices();

    // Actualizar estado devices
    this.deviceService.onDeviceStateChange((data) => {
      const device = this.devices.find(d => d.DEVICE_ID === data.deviceId);
      if (device) {
        device.DEVICE_STATE = data.newState;
        this.applyFilters();
      }
    });

    // Actualizar métricas, gráfico y mostrar alerta
    this.deviceService.onMetricUpdate((data) => {
      if (data.metric?.METRICS) {
        const newMetric: DeviceMetric = {
          DEVICE_METRIC_ID: data.metric.DEVICE_METRIC_ID || Date.now(),
          DEVICE_ID: data.deviceId,
          METRIC_TIMESTAMP: data.metric.METRIC_TIMESTAMP || new Date().toISOString(),
          METRICS: data.metric.METRICS
        };

        // Mostrar alerta con la información del métrico
        this.alertMessage = `Nueva métrica para DEVICE_ID: ${newMetric.DEVICE_ID} - ${Object.entries(newMetric.METRICS).map(([key, value]) => `${key}: ${value}`).join(', ')}`;
        setTimeout(() => this.alertMessage = null, 5000); // Desaparece en 5 segundos

        // Actualizar métricas y gráfico si el modal está abierto
        if (this.showMetricsModal && this.selectedDevice?.DEVICE_ID === data.deviceId) {
          this.deviceMetrics = [newMetric, ...this.deviceMetrics].slice(0, 2);
          this.deviceMetricsService.getDeviceHistoricMetrics(this.selectedDevice.DEVICE_ID).subscribe({
            next: (historicMetrics) => {
              this.deviceHistoricMetrics = historicMetrics;
              this.updateChartData();
            },
            error: (error) => {
              console.error('Error fetching historic metrics on WebSocket update:', error);
            }
          });
        }
      }
    });
  }

  ngOnDestroy() {
    this.deviceTypeSubscription?.unsubscribe();
    this.deviceService.disconnect();
  }

  loadDevices(deviceType?: string) {
    this.loading = true;
    const service$ = deviceType && deviceType !== 'all'
      ? this.deviceService.getDevicesByType(deviceType)
      : this.deviceService.getDevices();

    service$.subscribe({
      next: (devices) => {
        this.devices = devices;
        this.filteredDevices = [...devices];
        this.loading = false;
      },
      error: (error) => {
        console.error('Error loading devices:', error);
        this.loading = false;
      }
    });
  }

  private resetFilters() {
    this.currentFilters = {
      deviceType: 'all',
      status: 'all',
      searchTerm: ''
    };
  }

  onFiltersChanged(filters: FilterOptions) {
    this.currentFilters = filters;
    this.applyFilters();
  }

  getUniqueDeviceTypes(): string[] {
    return [...new Set(this.devices.map(device => device.DEVICE_TYPE))];
  }

  private applyFilters() {
    this.filteredDevices = this.devices.filter(device => {
      const matchesType = this.currentFilters.deviceType === 'all' ||
                         device.DEVICE_TYPE === this.currentFilters.deviceType;
      
      const matchesStatus = this.currentFilters.status === 'all' ||
                           device.DEVICE_STATE === this.currentFilters.status;
      
      const matchesSearch = this.currentFilters.searchTerm === '' ||
                           device.DEVICE_NAME.toLowerCase().includes(this.currentFilters.searchTerm.toLowerCase()) ||
                           device.DEVICE_TYPE.toLowerCase().includes(this.currentFilters.searchTerm.toLowerCase());
      
      return matchesType && matchesStatus && matchesSearch;
    });
  }

  getStatusClass(status: string): string {
    switch(status.toLowerCase()) {
      case 'online': return 'text-success';
      case 'offline': return 'text-danger';
      case 'warning': return 'text-warning';
      default: return 'text-secondary';
    }
  }

  getStatusIcon(status: string): string {
    switch(status.toLowerCase()) {
      case 'online': return 'bi-circle-fill';
      case 'offline': return 'bi-circle';
      case 'warning': return 'bi-exclamation-triangle-fill';
      default: return 'bi-question-circle';
    }
  }

  showDeviceMetrics(device: Device) {
    this.selectedDevice = device;
    this.setChartConfig(device.DEVICE_TYPE);
    this.deviceMetricsService.getDeviceMetrics(device.DEVICE_ID).subscribe({
      next: (metrics) => {
        this.deviceMetrics = metrics.slice(0, 2);
        this.deviceMetricsService.getDeviceHistoricMetrics(device.DEVICE_ID).subscribe({
          next: (historicMetrics) => {
            this.deviceHistoricMetrics = historicMetrics;
            this.updateChartData();
            this.showMetricsModal = true;
          },
          error: (error) => {
            console.error('Error fetching historic metrics:', error);
          }
        });
      },
      error: (error) => {
        console.error('Error fetching device metrics:', error);
      }
    });
  }

  closeMetricsModal() {
    this.showMetricsModal = false;
    this.selectedDevice = null;
    this.deviceMetrics = [];
    this.deviceHistoricMetrics = [];
    this.chartOptions.series = [{ name: '', data: [] }] as ApexAxisChartSeries;
  }

  private setChartConfig(deviceType: string) {
    const metricConfigs: Record<string, { key: string, label: string }> = {
      'IP Camera': { key: 'fps', label: 'FPS' },
      'PLC': { key: 'cpu_usage', label: 'Uso de CPU (%)' },
      'Temperature Sensor': { key: 'temperature_c', label: 'Temperatura (°C)' },
      'LED Beacon': { key: 'brightness', label: 'Brillo (%)' },
      'Motorized Valve': { key: 'pressure_bar', label: 'Presión (bar)' }
    };
    const config = metricConfigs[deviceType] || { key: 'status', label: 'Estado' };
    this.chartMetricKey = config.key;
    this.chartMetricLabel = config.label;
    this.chartOptions = {
      ...this.chartOptions,
      series: [{ name: config.label, data: [] }] as ApexAxisChartSeries,
      title: { text: `Histórico de ${config.label}`, align: 'center' } as ApexTitleSubtitle,
      yaxis: { title: { text: config.label }, decimalsInFloat: 1 } as ApexYAxis
    };
  }

  private updateChartData() {
    const uniqueMetrics = Array.from(
      new Map(
        this.deviceHistoricMetrics.map(metric => [metric.DEVICE_METRIC_ID, metric])
      ).values()
    ).sort((a, b) => new Date(a.METRIC_TIMESTAMP).getTime() - new Date(b.METRIC_TIMESTAMP).getTime());

    this.chartOptions = {
      ...this.chartOptions,
      series: [{
        name: this.chartMetricLabel,
        data: uniqueMetrics
          .filter(metric => metric.METRICS && this.chartMetricKey in (metric.METRICS as Record<string, any>))
          .map(metric => ({
            x: new Date(metric.METRIC_TIMESTAMP).getTime(),
            y: Number((metric.METRICS as Record<string, any>)[this.chartMetricKey])
          }))
      }] as ApexAxisChartSeries
    };
  }

  // Helper para el template
  getMetricEntries(metric: DeviceMetric): { key: string, value: any }[] {
    return Object.entries(metric.METRICS || {}).map(([key, value]) => ({ key, value }));
  }
}