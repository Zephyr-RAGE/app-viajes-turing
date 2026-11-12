import { Component, OnInit, inject, signal, computed } from '@angular/core';

import { CatalogoService } from '../../services/catalogo.service';
import { Pais, Ciudad, Moneda } from '../../models/catalogo.model';

import { HistorialService } from '../../services/historial.service';
import { HistorialResponse } from '../../models/historial.model';

import { ClimaService } from '../../services/clima.service';
import { ClimaResponse } from '../../models/clima.model';

import { AuthService } from '../../services/auth.service';
import { Router } from '@angular/router';

import { DatePipe } from '@angular/common';

type DashboardSection = 'monedas' | 'clima' | 'historial';

@Component({
  selector: 'app-dashboard',
  standalone: true,
  imports: [DatePipe],
  templateUrl: './dashboard.html',
  styleUrl: './dashboard.css',
})
export class Dashboard implements OnInit {
  private catalogoService = inject(CatalogoService);
  private historialService = inject(HistorialService);
  private climaService = inject(ClimaService);

  private authService = inject(AuthService);
  private router = inject(Router);

  paises = signal<Pais[]>([]);
  isLoadingPaises = signal(false);
  errorPaises = signal('');

  ciudades = signal<Ciudad[]>([]);
  isLoadingCiudades = signal(false);
  errorCiudades = signal('');
  selectedPaisId = signal<number | null>(null);

  monedas = signal<Moneda[]>([]);
  isLoadingMonedas = signal(false);
  errorMonedas = signal('');

  // Ciudad seleccionada
  selectedCiudadId = signal<number | null>(null);

  // Presupuesto en COP
  presupuesto = signal<number | null>(null);

  clima = signal<ClimaResponse | null>(null);
  isLoadingClima = signal(false);
  errorClima = signal('');

  // Estados de conversión
  isLoadingConversion = signal(false);
  errorConversion = signal('');
  resultadoConversion = signal<HistorialResponse | null>(null);

  historial = signal<HistorialResponse[]>([]);
  isLoadingHistorial = signal(false);
  errorHistorial = signal('');

  activeSection = signal<DashboardSection>('monedas');

  ngOnInit(): void {
    this.loadPaises();
    this.loadMonedas();
  }

  changeSection(section: DashboardSection): void {
    this.activeSection.set(section);

    if (section === 'historial') {
      this.cargarHistorial();
    }
  }

  loadPaises(): void {
    this.isLoadingPaises.set(true);
    this.errorPaises.set('');

    this.catalogoService.getPaises().subscribe({
      next: (response) => {
        this.paises.set(response);
        this.isLoadingPaises.set(false);

        console.log('Países obtenidos:', response);
      },
      error: (error) => {
        console.error('Error al obtener países:', error);

        this.errorPaises.set('No fue posible cargar los países.');
        this.isLoadingPaises.set(false);
      },
    });
  }

  onCountryChange(event: Event): void {
    const select = event.target as HTMLSelectElement;
    const paisId = Number(select.value);

    this.ciudades.set([]);
    this.selectedPaisId.set(null);
    this.errorCiudades.set('');

    if (!paisId) {
      return;
    }

    this.selectedPaisId.set(paisId);
    this.isLoadingCiudades.set(true);

    this.catalogoService.getCiudades(paisId).subscribe({
      next: (response) => {
        this.ciudades.set(response);
        this.isLoadingCiudades.set(false);

        console.log('Ciudades obtenidas:', response);
      },
      error: (error) => {
        console.error('Error al obtener ciudades:', error);

        this.errorCiudades.set('No fue posible cargar las ciudades.');
        this.isLoadingCiudades.set(false);
      },
    });
  }

  loadMonedas(): void {
    this.isLoadingMonedas.set(true);
    this.errorMonedas.set('');

    this.catalogoService.getMonedas().subscribe({
      next: (response) => {
        this.monedas.set(response);
        this.isLoadingMonedas.set(false);

        console.log('Monedas obtenidas:', response);
      },
      error: (error) => {
        console.error('Error al obtener monedas:', error);

        this.errorMonedas.set('No fue posible cargar las monedas.');
        this.isLoadingMonedas.set(false);
      },
    });
  }

  monedaSeleccionada = computed(() => {
    const pais = this.paises().find((pais) => pais.id === this.selectedPaisId());

    if (!pais) {
      return null;
    }

    return this.monedas().find((moneda) => moneda.id === pais.moneda_id) ?? null;
  });

  convertir(): void {
    const ciudadId = this.selectedCiudadId();
    const presupuesto = this.presupuesto();

    if (!ciudadId || !presupuesto) {
      this.errorConversion.set('Selecciona una ciudad e ingresa un presupuesto válido.');
      return;
    }

    this.isLoadingConversion.set(true);
    this.errorConversion.set('');

    this.resultadoConversion.set(null);

    this.historialService
      .crear({
        ciudad_id: ciudadId,
        presupuesto_cop: presupuesto,
      })
      .subscribe({
        next: (response) => {
          this.resultadoConversion.set(response);
          this.isLoadingConversion.set(false);
        },
        error: (error) => {
          console.error('Error al realizar la conversión:', error);

          this.errorConversion.set(
            error.error?.detail?.message || 'No fue posible realizar la conversión.',
          );

          this.isLoadingConversion.set(false);
        },
      });
  }

  onCityChange(event: Event): void {
    const select = event.target as HTMLSelectElement;
    const ciudadId = Number(select.value);

    this.selectedCiudadId.set(ciudadId || null);
    this.resultadoConversion.set(null);
    this.errorConversion.set('');
  }

  onBudgetChange(event: Event): void {
    const input = event.target as HTMLInputElement;
    const presupuesto = Number(input.value);

    this.presupuesto.set(Number.isFinite(presupuesto) && presupuesto > 0 ? presupuesto : null);
  }

  consultarClima(): void {
    const ciudadId = this.selectedCiudadId();

    if (!ciudadId) {
      this.errorClima.set('Primero selecciona una ciudad en Conversión de monedas.');
      return;
    }

    this.isLoadingClima.set(true);
    this.errorClima.set('');
    this.clima.set(null);

    this.climaService.obtenerClima(ciudadId).subscribe({
      next: (response) => {
        this.clima.set(response);
        this.isLoadingClima.set(false);
      },
      error: (error) => {
        console.error('Error al consultar el clima:', error);

        this.errorClima.set(error.error?.detail?.message || 'No fue posible consultar el clima.');

        this.isLoadingClima.set(false);
      },
    });
  }

  cargarHistorial(): void {
    this.isLoadingHistorial.set(true);
    this.errorHistorial.set('');

    this.historialService.obtenerTodos().subscribe({
      next: (response) => {
        this.historial.set(response);
        this.isLoadingHistorial.set(false);
      },
      error: (error) => {
        console.error('Error al cargar historial:', error);

        this.errorHistorial.set(
          error.error?.detail?.message || 'No fue posible cargar tu historial.',
        );

        this.isLoadingHistorial.set(false);
      },
    });
  }
  eliminarHistorial(id: number): void {
    const confirmar = window.confirm('¿Estás seguro de eliminar este registro?');

    if (!confirmar) {
      return;
    }

    this.historialService.eliminar(id).subscribe({
      next: () => {
        this.historial.update((registros) => registros.filter((registro) => registro.id !== id));
      },
      error: (error) => {
        console.error('Error al eliminar registro:', error);
        this.errorHistorial.set('No fue posible eliminar el registro.');
      },
    });
  }

  cerrarSesion(): void {
    const refreshToken = this.authService.getRefreshToken();

    if (!refreshToken) {
      this.authService.clearTokens();
      this.router.navigate(['/login']);
      return;
    }

    this.authService
      .logout({
        refresh_token: refreshToken,
      })
      .subscribe({
        next: () => {
          this.authService.clearTokens();
          this.router.navigate(['/login']);
        },
        error: (error) => {
          console.error('Error al cerrar sesión:', error);

          // Aunque falle la petición, cerramos la sesión local.
          this.authService.clearTokens();
          this.router.navigate(['/login']);
        },
      });
  }
}
