import { Component, inject, signal } from '@angular/core';
import { FormBuilder, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { Router, RouterModule } from '@angular/router';
import { CommonModule } from '@angular/common';

import { AuthService } from '../../services/auth.service';
import { RegisterRequest } from '../../models/auth.model';

@Component({
  imports: [CommonModule, RouterModule, ReactiveFormsModule],
  selector: 'app-registro',
  styleUrl: './registro.css',
  templateUrl: './registro.html',
})
export class Registro {
  private fb = inject(FormBuilder);
  private router = inject(Router);

  private authService = inject(AuthService);

  // Señales nativas simétricas al Login
  isLoading = signal(false);
  errorMessage = signal<string | null>(null);
  hidePassword = signal(true);

  // Formulario reactivo con la estructura simétrica
  form: FormGroup = this.fb.group({
    nombre: ['', [Validators.required, Validators.minLength(3)]],
    correo: ['', [Validators.required, Validators.email]],
    password: ['', [Validators.required, Validators.minLength(8)]],
    aceptaTerminos: [false, [Validators.requiredTrue]],
  });

  togglePasswordVisibility(): void {
    this.hidePassword.update((val) => !val);
  }

  onSubmit(): void {
    if (this.form.invalid) {
      this.form.markAllAsTouched();
      return;
    }

    this.isLoading.set(true);
    this.errorMessage.set(null);

    const data: RegisterRequest = {
      nombre: this.form.value.nombre,
      correo: this.form.value.correo,
      password: this.form.value.password,
      password_confirmation: this.form.value.password,
      idioma: 'es',
    };

    this.authService.register(data).subscribe({
      next: (response) => {
        console.log('Usuario registrado correctamente:', response);

        this.isLoading.set(false);
        this.router.navigate(['/login']);
      },

      error: (error) => {
        console.error('Error al registrar usuario:', error);

        const detail = error.error?.detail;

        if (error.status === 409) {
          this.errorMessage.set('Este correo electrónico ya está registrado.');
        } else if (typeof detail === 'string') {
          this.errorMessage.set(detail);
        } else if (detail?.message) {
          this.errorMessage.set(detail.message);
        } else {
          this.errorMessage.set('Hubo un problema al crear la cuenta. Inténtalo de nuevo.');
        }

        this.isLoading.set(false);
      },
    });
  }
}
