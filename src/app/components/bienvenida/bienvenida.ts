import { Component, OnInit, OnDestroy, signal } from '@angular/core';
import { RouterLink } from '@angular/router';
import { Informacion } from '../informacion/informacion';

@Component({
  selector: 'app-bienvenida',
  standalone: true,
  imports: [RouterLink, Informacion],
  templateUrl: './bienvenida.html',
  styleUrl: './bienvenida.css',
})
export class Bienvenida implements OnInit, OnDestroy {
  imagenes = signal([
    {
      src: 'paisaje1.jpg',
      alt: 'Paisaje de un destino turístico',
    },
    {
      src: 'paisaje2.jpg',
      alt: 'Montañas rodeadas de naturaleza',
    },
    {
      src: 'paisaje3.jpg',
      alt: 'Playa de aguas turquesas',
    },
    {
      src: 'paisaje4.jpg',
      alt: 'Destino para una nueva aventura',
    },
  ]);

  indiceActual = signal(0);

  private intervalo?: ReturnType<typeof setInterval>;

  ngOnInit(): void {
    this.intervalo = setInterval(() => {
      this.siguiente();
    }, 5000);
  }

  ngOnDestroy(): void {
    if (this.intervalo) {
      clearInterval(this.intervalo);
    }
  }

  imagenEn(posicion: number) {
    const lista = this.imagenes();
    const indice = (this.indiceActual() + posicion) % lista.length;

    return lista[indice];
  }

  siguiente(): void {
    this.indiceActual.update((indice) => (indice + 1) % this.imagenes().length);
  }

  anterior(): void {
    this.indiceActual.update(
      (indice) => (indice - 1 + this.imagenes().length) % this.imagenes().length,
    );
  }
}
