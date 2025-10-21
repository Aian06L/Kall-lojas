import { Component, OnInit, OnDestroy } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule, Router } from '@angular/router';
import { ReactiveFormsModule, FormBuilder, FormGroup, Validators } from '@angular/forms';
import { CartService, CartItem } from '../../services/cart.service';
import { AuthService } from '../../services/auth.service';
import { Subscription } from 'rxjs';

@Component({
  selector: 'app-compra',
  standalone: true,
  imports: [CommonModule, RouterModule, ReactiveFormsModule],
  templateUrl: './compra.component.html',
  styleUrls: ['./compra.component.scss']
})
export class CompraComponent implements OnInit, OnDestroy {
  cartItems: CartItem[] = [];
  totalPrice: number = 0;
  totalQuantity: number = 0;
  
  checkoutForm: FormGroup;
  currentStep: number = 1;
  isProcessing: boolean = false;
  
  private subscriptions = new Subscription();

  constructor(
    private cartService: CartService,
    private authService: AuthService,
    private router: Router,
    private fb: FormBuilder
  ) {
    this.checkoutForm = this.fb.group({
      fullName: ['', [Validators.required, Validators.minLength(2)]],
      email: ['', [Validators.required, Validators.email]],
      phone: ['', [Validators.required]],
      zipCode: ['', [Validators.required, Validators.pattern(/^\d{5}-?\d{3}$/)]],
      street: ['', [Validators.required]],
      number: ['', [Validators.required]],
      complement: [''],
      neighborhood: ['', [Validators.required]],
      city: ['', [Validators.required]],
      state: ['', [Validators.required]],
      paymentMethod: ['credit', [Validators.required]],
      cardNumber: [''],
      cardHolder: [''],
      expiryDate: [''],
      cvv: ['']
    });
  }
  
  ngOnInit(): void {
    this.loadCartData();
    this.loadUserData();
  }
  
  ngOnDestroy(): void {
    this.subscriptions.unsubscribe();
  }
  
  private loadCartData(): void {
    this.subscriptions.add(
      this.cartService.cartItems$.subscribe(items => {
        this.cartItems = items;
      })
    );
    
    this.subscriptions.add(
      this.cartService.totalPrice$.subscribe(price => {
        this.totalPrice = price;
      })
    );
    
    this.subscriptions.add(
      this.cartService.totalQuantity$.subscribe(quantity => {
        this.totalQuantity = quantity;
      })
    );
    
    if (this.cartService.getTotalQuantity() === 0) {
      this.router.navigate(['/carrinho']);
    }
  }
  
  private loadUserData(): void {
    const currentUser = this.authService.getCurrentUser();
    if (currentUser) {
      this.checkoutForm.patchValue({
        fullName: currentUser.name,
        email: currentUser.email,
        phone: currentUser.phone,
        street: currentUser.address?.street,
        number: currentUser.address?.number,
        complement: currentUser.address?.complement,
        neighborhood: currentUser.address?.neighborhood,
        city: currentUser.address?.city,
        state: currentUser.address?.state,
        zipCode: currentUser.address?.zipCode
      });
    }
  }

  nextStep(): void {
    if (this.currentStep < 3) {
      if (this.validateCurrentStep()) {
        this.currentStep++;
      }
    }
  }

  previousStep(): void {
    if (this.currentStep > 1) {
      this.currentStep--;
    }
  }

  private validateCurrentStep(): boolean {
    switch (this.currentStep) {
      case 1:
        const personalFields = ['fullName', 'email', 'phone'];
        return personalFields.every(field => {
          const control = this.checkoutForm.get(field);
          return control && control.valid;
        });
        
      case 2:
        const addressFields = ['zipCode', 'street', 'number', 'neighborhood', 'city', 'state'];
        return addressFields.every(field => {
          const control = this.checkoutForm.get(field);
          return control && control.valid;
        });
        
      case 3:
        const paymentMethod = this.checkoutForm.get('paymentMethod')?.value;
        if (paymentMethod === 'credit') {
          const cardFields = ['cardNumber', 'cardHolder', 'expiryDate', 'cvv'];
          return cardFields.every(field => {
            const control = this.checkoutForm.get(field);
            return control && control.value && control.value.trim() !== '';
          });
        }
        return true;
        
      default:
        return false;
    }
  }

  async finalizePurchase(): Promise<void> {
    if (!this.validateCurrentStep()) {
      this.showErrorMessage('Por favor, preencha todos os campos obrigatórios.');
      return;
    }

    this.isProcessing = true;

    try {
      await this.simulatePaymentProcessing();
      
      const orderId = this.generateOrderId();
      this.showSuccessMessage(orderId);
      
      this.cartService.clearCart();
      
      setTimeout(() => {
        this.router.navigate(['/home']);
      }, 3000);
      
    } catch (error) {
      this.showErrorMessage('Erro ao processar pagamento. Tente novamente.');
    } finally {
      this.isProcessing = false;
    }
  }

  private async simulatePaymentProcessing(): Promise<void> {
    return new Promise((resolve) => {
      setTimeout(() => resolve(), 2000);
    });
  }

  private generateOrderId(): string {
    const timestamp = Date.now();
    const random = Math.floor(Math.random() * 1000);
    return `${timestamp}${random}`.slice(-8);
  }

  private showSuccessMessage(orderId: string): void {
    const message = `Compra realizada com sucesso!\nPedido #${orderId}\nVocê receberá um email com os detalhes.`;
    alert(message);
  }

  private showErrorMessage(message: string): void {
    alert(message);
  }

  removeFromCart(itemId: number): void {
    this.cartService.removeFromCart(itemId);
  }

  updateQuantity(itemId: number, quantity: number): void {
    this.cartService.updateQuantity(itemId, quantity);
  }

  getStepTitle(): string {
    switch (this.currentStep) {
      case 1: return 'Dados Pessoais';
      case 2: return 'Endereço de Entrega';
      case 3: return 'Pagamento';
      default: return '';
    }
  }

  isStepValid(): boolean {
    return this.validateCurrentStep();
  }

  getFieldError(fieldName: string): string {
    const control = this.checkoutForm.get(fieldName);
    if (control && control.errors && control.touched) {
      if (control.errors['required']) {
        return 'Este campo é obrigatório';
      }
      if (control.errors['email']) {
        return 'Email inválido';
      }
      if (control.errors['minlength']) {
        return 'Nome muito curto';
      }
      if (control.errors['pattern']) {
        return 'CEP inválido';
      }
    }
    return '';
  }

  isFieldInvalid(fieldName: string): boolean {
    const control = this.checkoutForm.get(fieldName);
    return !!(control && control.invalid && control.touched);
  }
}
