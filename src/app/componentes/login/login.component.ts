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

  // Credenciais de teste
  adminEmail = 'admin@kall.store';
  adminPassword = 'Kall@2025!';
  clientEmail = 'cliente@demo.com';
  clientPassword = 'Demo123!';
  clientEmail2 = 'joao@teste.com';
  clientPassword2 = 'Joao123!';

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
        const loginResult = this.authService.login(email, password);
        
        if (loginResult.success) {
          this.showSuccessMessage = true;
          setTimeout(() => {
            // Redirecionar baseado no tipo de usuário
            if (loginResult.user?.role === 'admin') {
              this.router.navigate(['/admin/dashboard']);
            } else {
              this.router.navigate(['/home']);
            }
          }, 1500);
        } else {
          this.loginError = loginResult.error || 'Email ou senha incorretos.';
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

  // Métodos para as credenciais de teste
  copyToClipboard(text: string): void {
    if (navigator.clipboard && window.isSecureContext) {
      // Usar a API moderna do Clipboard
      navigator.clipboard.writeText(text).then(() => {
        this.showToast('Copiado para a área de transferência!');
      }).catch(err => {
        console.error('Erro ao copiar: ', err);
        this.fallbackCopyTextToClipboard(text);
      });
    } else {
      // Fallback para navegadores mais antigos
      this.fallbackCopyTextToClipboard(text);
    }
  }

  private fallbackCopyTextToClipboard(text: string): void {
    const textArea = document.createElement('textarea');
    textArea.value = text;
    textArea.style.position = 'fixed';
    textArea.style.left = '-999999px';
    textArea.style.top = '-999999px';
    document.body.appendChild(textArea);
    textArea.focus();
    textArea.select();
    
    try {
      document.execCommand('copy');
      this.showToast('Copiado para a área de transferência!');
    } catch (err) {
      console.error('Fallback: Erro ao copiar: ', err);
      this.showToast('Erro ao copiar. Tente selecionar manualmente.');
    } finally {
      document.body.removeChild(textArea);
    }
  }

  fillCredentials(email: string, password: string): void {
    this.loginForm.patchValue({
      email: email,
      password: password
    });
    this.showToast('Credenciais preenchidas!');
  }

  private showToast(message: string): void {
    // Criar elemento de toast
    const toast = document.createElement('div');
    toast.className = 'credential-toast';
    toast.innerHTML = `
      <i class="bi bi-check-circle-fill"></i>
      <span>${message}</span>
    `;
    
    // Adicionar ao body
    document.body.appendChild(toast);
    
    // Mostrar com animação
    setTimeout(() => toast.classList.add('show'), 100);
    
    // Remover após 3 segundos
    setTimeout(() => {
      toast.classList.remove('show');
      setTimeout(() => {
        if (document.body.contains(toast)) {
          document.body.removeChild(toast);
        }
      }, 300);
    }, 3000);
  }
}
