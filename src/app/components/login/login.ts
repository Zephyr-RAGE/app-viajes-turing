import { Component, inject, signal } from '@angular/core';
import { Router, RouterLink } from '@angular/router';
import { FormBuilder, FormGroup, Validators, ReactiveFormsModule } from '@angular/forms';

import { AuthService } from '../../services/auth.service';
import { LoginRequest } from '../../models/auth.model';

@Component({
  selector: 'app-login',
  standalone: true,
  imports: [RouterLink, ReactiveFormsModule],
  templateUrl: './login.html',
  styleUrl: './login.css',
})
export class Login {
  private fb = inject(FormBuilder);
  private authService = inject(AuthService);
  private router = inject(Router);

  isLoading = signal(false);
  errorMessage = signal('');
  hidePassword = signal(true);

  loginForm: FormGroup = this.fb.group({
    correo: ['', [Validators.required, Validators.email]],
    password: ['', [Validators.required, Validators.minLength(8)]],
  });

  togglePasswordVisibility(): void {
    this.hidePassword.update((visible) => !visible);
  }

  onSubmit(): void {
    if (this.loginForm.invalid) {
      this.loginForm.markAllAsTouched();
      return;
    }

    this.isLoading.set(true);
    this.errorMessage.set('');

    const credentials: LoginRequest = this.loginForm.getRawValue();

    this.authService.login(credentials).subscribe({
      next: (response) => {
        this.authService.saveTokens(response.data.access_token, response.data.refresh_token);

        this.authService.me().subscribe({
          next: (user) => {
            console.log('Usuario autenticado:', user);

            this.isLoading.set(false);
            this.router.navigate(['/dashboard']);
          },
          error: (error) => {
            console.error('Error al validar sesión:', error);

            this.authService.clearTokens();
            this.errorMessage.set('No fue posible validar la sesión.');
            this.isLoading.set(false);
          },
        });
      },

      error: (error) => {
        console.error('Error de autenticación:', error);
        this.errorMessage.set(error.error?.detail || 'No fue posible iniciar sesión.');
        this.isLoading.set(false);
      },
    });
  }
}
