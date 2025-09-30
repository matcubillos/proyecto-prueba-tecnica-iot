import { Component } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { SidebarComponent } from "./shared/sidebar/sidebar.component";
import { FilterBarComponent } from "./shared/filter-bar/filter-bar.component";

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [RouterOutlet, SidebarComponent, FilterBarComponent],
  templateUrl: './app.component.html',
  styleUrl: './app.component.css'
})
export class AppComponent {
  title = 'prueba-tecnica-iot-frontend';
  selectedDeviceType = 'all';

  onDeviceTypeSelected(deviceType: string) {
    this.selectedDeviceType = deviceType;
    // Aquí puedes comunicar con el dashboard si es necesario
  }
}
