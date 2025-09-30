import { Component, EventEmitter, Output, Input } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

export interface FilterOptions {
  deviceType: string;
  status: string;
  searchTerm: string;
}

@Component({
  selector: 'app-filter-bar',
  standalone: true,
  imports: [CommonModule, FormsModule],
  templateUrl: './filter-bar.component.html',
  styleUrl: './filter-bar.component.css'
})
export class FilterBarComponent {
  @Output() filtersChanged = new EventEmitter<FilterOptions>();
  @Input() availableDeviceTypes: string[] = [];

  filters: FilterOptions = {
    deviceType: 'all',
    status: 'all',
    searchTerm: ''
  };

  get deviceTypes() {
    const baseTypes = [{ value: 'all', label: 'Todos los tipos' }];
    const dynamicTypes = this.availableDeviceTypes.map(type => ({
      value: type,
      label: type
    }));
    return [...baseTypes, ...dynamicTypes];
  }

  statusOptions = [
    { value: 'all', label: 'Todos los estados' },
    { value: 'Online', label: 'En línea' },
    { value: 'Offline', label: 'Fuera de línea' },
    { value: 'Warning', label: 'Advertencia' }
  ];

  onFilterChange() {
    this.filtersChanged.emit({ ...this.filters });
  }

  clearFilters() {
    this.filters = {
      deviceType: 'all',
      status: 'all',
      searchTerm: ''
    };
    this.onFilterChange();
  }
}