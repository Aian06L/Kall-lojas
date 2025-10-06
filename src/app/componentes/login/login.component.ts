import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators, ReactiveFormsModule } from '@angular/forms';
import { Router } from '@angular/router';
import { CommonModule } from '@angular/common';
import { AuthService } from '../../services/auth.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss'],
  standalone: true,
  imports: [CommonModule, ReactiveFormsModule]
})
export class LoginComponent implements OnInit {
  loginForm!: FormGroup;
  isSubmitting = false;
  showPassword = false;
  loginError = '';
  showSuccessMessage = false;

  constructor(
    private formBuilder: FormBuilder,
    private router: Router,
    private authService: AuthService
  ) { }

  ngOnInit(): void {
    this.loginForm = this.formBuilder.group({
      email: ['', [Validators.required, Validators.email]],
      password: ['', [Validators.required, Validators.minLength(6)]],
      rememberMe: [false]
    });
  }

  togglePasswordVisibility(): void {
    this.showPassword = !this.showPassword;
  }

  onSubmit(): void {
    if (this.loginForm.valid) {
      this.isSubmitting = true;
      this.loginError = '';
      
      const { email, password, rememberMe } = this.loginForm.value;
      
      // Simulate API call
      setTimeout(() => {
        // Demo credentials - update to match auth service
        if (email === 'user@example.com' && password === 'password') {
          const loginSuccess = this.authService.login(email, password);
          if (loginSuccess) {
            this.showSuccessMessage = true;
            setTimeout(() => {
              this.router.navigate(['/home']);
            }, 1500);
          } else {
            this.loginError = 'Erro interno. Tente novamente.';
            this.isSubmitting = false;
          }
        } else {
          this.loginError = 'Email ou senha incorretos. Tente: user@example.com / password';
          this.isSubmitting = false;
        }
      }, 1500);
    } else {
      this.markFormGroupTouched();
    }
  }

  private markFormGroupTouched(): void {
    Object.keys(this.loginForm.controls).forEach(key => {
      const control = this.loginForm.get(key);
      if (control) {
        control.markAsTouched();
      }
    });
  }

  getFieldError(fieldName: string): string {
    const field = this.loginForm.get(fieldName);
    if (field && field.touched && field.errors) {
      if (field.errors['required']) {
        return 'Este campo é obrigatório';
      }
      if (field.errors['email']) {
        return 'Email inválido';
      }
      if (field.errors['minlength']) {
        return 'Senha deve ter pelo menos 6 caracteres';
      }
    }
    return '';
  }

  isFieldInvalid(fieldName: string): boolean {
    const field = this.loginForm.get(fieldName);
    return !!(field && field.touched && field.errors);
  }

  navigateToRegister(): void {
    this.router.navigate(['/cadastro']);
  }

  resetPassword(): void {
    const email = this.loginForm.get('email')?.value;
    if (email && this.loginForm.get('email')?.valid) {
      alert(`Link de recuperacção enviado para: ${email}`);
    } else {
      alert('Digite um email válido para recuperar a senha.');
    }
  }
}
