import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators, ReactiveFormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';
import { AuthService } from '../../services/auth.service';
import { User } from '../../model/user.model';

@Component({
  selector: 'app-profile',
  templateUrl: './profile.component.html',
  styleUrls: ['./profile.component.scss'],
  standalone: true,
  imports: [CommonModule, ReactiveFormsModule, RouterModule]
})
export class ProfileComponent implements OnInit {
  user: User | null = null;
  profileForm!: FormGroup;
  addressForm!: FormGroup;
  passwordForm!: FormGroup;
  
  activeTab: string = 'personal';
  isEditing: boolean = false;
  isSubmitting: boolean = false;
  successMessage: string = '';
  errorMessage: string = '';

  constructor(
    private formBuilder: FormBuilder,
    private authService: AuthService
  ) {}

  ngOnInit(): void {
    this.user = this.authService.getCurrentUser();
    this.initializeForms();
    this.loadUserData();
  }

  initializeForms(): void {
    this.profileForm = this.formBuilder.group({
      name: ['', [Validators.required, Validators.minLength(2)]],
      email: ['', [Validators.required, Validators.email]]
    });

    this.addressForm = this.formBuilder.group({
      street: ['', Validators.required],
      number: ['', Validators.required],
      complement: [''],
      neighborhood: ['', Validators.required],
      city: ['', Validators.required],
      state: ['', Validators.required],
      zipCode: ['', [Validators.required, Validators.pattern(/^\d{5}-?\d{3}$/)]]
    });

    this.passwordForm = this.formBuilder.group({
      currentPassword: ['', Validators.required],
      newPassword: ['', [Validators.required, Validators.minLength(6)]],
      confirmPassword: ['', Validators.required]
    }, { validators: this.passwordMatchValidator });
  }

  loadUserData(): void {
    if (this.user) {
      this.profileForm.patchValue({
        name: this.user.name,
        email: this.user.email
      });

      if (this.user.address) {
        this.addressForm.patchValue(this.user.address);
      }
    }
  }

  passwordMatchValidator(form: FormGroup) {
    const newPassword = form.get('newPassword');
    const confirmPassword = form.get('confirmPassword');
    if (newPassword && confirmPassword && newPassword.value !== confirmPassword.value) {
      confirmPassword.setErrors({ passwordMismatch: true });
      return { passwordMismatch: true };
    }
    return null;
  }

  setActiveTab(tab: string): void {
    this.activeTab = tab;
    this.clearMessages();
  }

  toggleEdit(): void {
    this.isEditing = !this.isEditing;
    if (!this.isEditing) {
      this.loadUserData(); // Recarregar dados originais
    }
    this.clearMessages();
  }

  updateProfile(): void {
    if (this.profileForm.valid) {
      this.isSubmitting = true;
      this.clearMessages();

      const updatedData = {
        ...this.user,
        ...this.profileForm.value
      };

      this.authService.updateUserProfile(updatedData).subscribe({
        next: (user) => {
          this.user = user;
          this.isEditing = false;
          this.isSubmitting = false;
          this.successMessage = 'Perfil atualizado com sucesso!';
          setTimeout(() => this.clearMessages(), 3000);
        },
        error: (error) => {
          this.errorMessage = 'Erro ao atualizar perfil. Tente novamente.';
          this.isSubmitting = false;
          setTimeout(() => this.clearMessages(), 5000);
        }
      });
    } else {
      this.markFormGroupTouched(this.profileForm);
    }
  }

  updateAddress(): void {
    if (this.addressForm.valid) {
      this.isSubmitting = true;
      this.clearMessages();

      const updatedData = {
        ...this.user,
        address: this.addressForm.value
      };

      this.authService.updateUserProfile(updatedData).subscribe({
        next: (user) => {
          this.user = user;
          this.isSubmitting = false;
          this.successMessage = 'Endereço atualizado com sucesso!';
          setTimeout(() => this.clearMessages(), 3000);
        },
        error: (error) => {
          this.errorMessage = 'Erro ao atualizar endereço. Tente novamente.';
          this.isSubmitting = false;
          setTimeout(() => this.clearMessages(), 5000);
        }
      });
    } else {
      this.markFormGroupTouched(this.addressForm);
    }
  }

  updatePassword(): void {
    if (this.passwordForm.valid) {
      this.isSubmitting = true;
      this.clearMessages();

      // Simular verificação de senha atual
      setTimeout(() => {
        this.successMessage = 'Senha alterada com sucesso!';
        this.passwordForm.reset();
        this.isSubmitting = false;
        setTimeout(() => this.clearMessages(), 3000);
      }, 1000);
    } else {
      this.markFormGroupTouched(this.passwordForm);
    }
  }

  isAdmin(): boolean {
    return this.authService.isAdmin();
  }

  getFieldError(form: FormGroup, fieldName: string): string {
    const field = form.get(fieldName);
    if (field && field.touched && field.errors) {
      if (field.errors['required']) {
        return 'Este campo é obrigatório';
      }
      if (field.errors['email']) {
        return 'Email inválido';
      }
      if (field.errors['minlength']) {
        return fieldName === 'name' ? 'Nome deve ter pelo menos 2 caracteres' : 'Senha deve ter pelo menos 6 caracteres';
      }
      if (field.errors['pattern']) {
        return 'CEP inválido';
      }
      if (field.errors['passwordMismatch']) {
        return 'Senhas não coincidem';
      }
    }
    return '';
  }

  isFieldInvalid(form: FormGroup, fieldName: string): boolean {
    const field = form.get(fieldName);
    return !!(field && field.touched && field.errors);
  }

  private markFormGroupTouched(form: FormGroup): void {
    Object.keys(form.controls).forEach(key => {
      const control = form.get(key);
      if (control) {
        control.markAsTouched();
      }
    });
  }

  private clearMessages(): void {
    this.successMessage = '';
    this.errorMessage = '';
  }
}