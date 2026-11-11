import { Component, signal } from '@angular/core';

type DashboardSection = 'monedas' | 'clima' | 'historial';

@Component({
  selector: 'app-dashboard',
  standalone: true,
  imports: [],
  templateUrl: './dashboard.html',
  styleUrl: './dashboard.css',
})
export class Dashboard {
  activeSection = signal<DashboardSection>('monedas');

  changeSection(section: DashboardSection): void {
    this.activeSection.set(section);
  }
}
