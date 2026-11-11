import { Component, inject, signal } from '@angular/core';
import { FormBuilder, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { Router, RouterModule } from '@angular/router';
import { CommonModule } from '@angular/common';

@Component({
  imports: [CommonModule, RouterModule, ReactiveFormsModule],
  selector: 'app-registro',
  styleUrl: './registro.css',
  templateUrl: './registro.html',
})
export class Registro {
  private fb = inject(FormBuilder);
  private router = inject(Router);

  // Señales nativas simétricas al Login
  isLoading = signal(false);
  errorMessage = signal<string | null>(null);
  hidePassword = signal(true);

  // Formulario reactivo con la estructura simétrica
  form: FormGroup = this.fb.group({
    nombre: ['', [Validators.required, Validators.minLength(3)]],
    correo: ['', [Validators.required, Validators.email]],
    password: ['', [Validators.required, Validators.minLength(6)]],
    aceptaTerminos: [false, [Validators.requiredTrue]],
  });

  togglePasswordVisibility(): void {
    this.hidePassword.update((val) => !val);
  }

  async onSubmit(): Promise<void> {
    if (this.form.invalid) {
      this.form.markAllAsTouched();
      return;
    }

    this.isLoading.set(true);
    this.errorMessage.set(null);

    try {
      console.log('Registro procesado:', this.form.value);
      // Simulación de retraso de red
      await new Promise((resolve) => setTimeout(resolve, 1500));
      this.router.navigate(['/login']);
    } catch (error) {
      this.errorMessage.set('Hubo un problema al crear la cuenta. Inténtalo de nuevo.');
      console.error('Error al registrar:', error);
    } finally {
      this.isLoading.set(false);
    }
  }
}
