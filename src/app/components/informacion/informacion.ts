import { Component, OnInit, OnDestroy, signal } from '@angular/core';

@Component({
  selector: 'app-informacion',
  standalone: true,
  imports: [],
  templateUrl: './informacion.html',
  styleUrl: './informacion.css',
})
export class Informacion implements OnInit, OnDestroy {
  paises = ['MÉXICO', 'ESPAÑA', 'EEUU', 'COLOMBIA', 'ECUADOR', 'COSTA RICA'];

  indicePais = signal(0);
  animando = signal(false);

  private intervalo?: ReturnType<typeof setInterval>;
  private timeoutAnimacion?: ReturnType<typeof setTimeout>;

  ngOnInit(): void {
    this.intervalo = setInterval(() => {
      this.cambiarPais();
    }, 350);
  }

  cambiarPais(): void {
    this.animando.set(true);

    this.timeoutAnimacion = setTimeout(() => {
      this.indicePais.update((indice) => (indice + 1) % this.paises.length);

      this.animando.set(false);
    }, 250);
  }

  ngOnDestroy(): void {
    if (this.intervalo) {
      clearInterval(this.intervalo);
    }

    if (this.timeoutAnimacion) {
      clearTimeout(this.timeoutAnimacion);
    }
  }
}
