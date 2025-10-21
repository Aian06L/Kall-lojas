import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators, ReactiveFormsModule, AbstractControl } from '@angular/forms';
import { Router } from '@angular/router';
import { CommonModule } from '@angular/common';
import { AuthService } from '../../services/auth.service';

@Component({
  selector: 'app-cadastro',
  templateUrl: './cadastro.component.html',
  styleUrls: ['./cadastro.component.scss'],
  standalone: true,
  imports: [CommonModule, ReactiveFormsModule]
})
export class CadastroComponent implements OnInit {
  registerForm!: FormGroup;
  isSubmitting = false;
  showPassword = false;
  showConfirmPassword = false;
  registerError = '';
  showSuccessMessage = false;

  constructor(
    private formBuilder: FormBuilder,
    private router: Router,
    private authService: AuthService
  ) { }

  ngOnInit(): void {
    this.registerForm = this.formBuilder.group({
      name: ['', [Validators.required, Validators.minLength(2)]],
      email: ['', [Validators.required, Validators.email], [this.emailExistsValidator.bind(this)]],
      password: ['', [Validators.required, Validators.minLength(6), this.passwordStrengthValidator]],
      confirmPassword: ['', [Validators.required]],
      lgpdAccepted: [false, [Validators.requiredTrue]]
    }, { validators: this.passwordMatchValidator });
  }

  passwordMatchValidator(form: FormGroup) {
    const password = form.get('password');
    const confirmPassword = form.get('confirmPassword');
    if (password && confirmPassword && password.value !== confirmPassword.value) {
      confirmPassword.setErrors({ passwordMismatch: true });
      return { passwordMismatch: true };
    }
    return null;
  }

  togglePasswordVisibility(field: 'password' | 'confirmPassword'): void {
    if (field === 'password') {
      this.showPassword = !this.showPassword;
    } else {
      this.showConfirmPassword = !this.showConfirmPassword;
    }
  }

  // Validador de força da senha
  passwordStrengthValidator(control: AbstractControl): {[key: string]: any} | null {
    const value = control.value;
    if (!value) return null;

    const hasNumber = /[0-9]/.test(value);
    const hasUpper = /[A-Z]/.test(value);
    const hasLower = /[a-z]/.test(value);
    const valid = hasNumber && hasUpper && hasLower;

    if (!valid) {
      return { passwordStrength: true };
    }
    return null;
  }

  // Validador assíncrono para verificar se email já existe
  emailExistsValidator(control: AbstractControl): Promise<{[key: string]: any} | null> {
    if (!control.value) {
      return Promise.resolve(null);
    }

    return new Promise((resolve) => {
      setTimeout(() => {
        const emailExists = this.authService.emailExists(control.value);
        if (emailExists) {
          resolve({ emailExists: true });
        } else {
          resolve(null);
        }
      }, 500);
    });
  }

  onSubmit(): void {
    if (this.registerForm.valid) {
      this.isSubmitting = true;
      this.registerError = '';
      
      const formData = this.registerForm.value;
      
      // Simular API call
      setTimeout(() => {
        const registerResult = this.authService.register({
          name: formData.name,
          email: formData.email,
          password: formData.password
        });

        if (registerResult.success) {
          this.showSuccessMessage = true;
          setTimeout(() => {
            this.router.navigate(['/login'], { 
              queryParams: { registered: 'true', email: formData.email } 
            });
          }, 2000);
        } else {
          this.registerError = registerResult.error || 'Erro ao criar conta. Tente novamente.';
          this.isSubmitting = false;
        }
      }, 1500);
    } else {
      this.markFormGroupTouched();
    }
  }

  private markFormGroupTouched(): void {
    Object.keys(this.registerForm.controls).forEach(key => {
      const control = this.registerForm.get(key);
      if (control) {
        control.markAsTouched();
      }
    });
  }

  getFieldError(fieldName: string): string {
    const field = this.registerForm.get(fieldName);
    if (field && field.touched && field.errors) {
      if (field.errors['required']) {
        if (fieldName === 'lgpdAccepted') {
          return 'Você deve aceitar os termos da LGPD';
        }
        return 'Este campo é obrigatório';
      }
      if (field.errors['email']) {
        return 'Email inválido';
      }
      if (field.errors['emailExists']) {
        return 'Este email já está cadastrado';
      }
      if (field.errors['minlength']) {
        if (fieldName === 'name') {
          return 'Nome deve ter pelo menos 2 caracteres';
        }
        if (fieldName === 'password') {
          return 'Senha deve ter pelo menos 6 caracteres';
        }
      }
      if (field.errors['passwordStrength']) {
        return 'Senha deve conter letras maiúsculas, minúsculas e números';
      }
      if (field.errors['passwordMismatch']) {
        return 'Senhas não coincidem';
      }
    }
    return '';
  }

  isFieldInvalid(fieldName: string): boolean {
    const field = this.registerForm.get(fieldName);
    return !!(field && field.touched && field.errors);
  }

  navigateToLogin(): void {
    this.router.navigate(['/login']);
  }
}
