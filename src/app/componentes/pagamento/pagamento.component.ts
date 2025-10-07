import { Component, Input, Output, EventEmitter, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ReactiveFormsModule, FormBuilder, FormGroup, Validators } from '@angular/forms';
import { CartService, CartItem } from '../../services/cart.service';

@Component({
  selector: 'app-pagamento',
  standalone: true,
  imports: [CommonModule, ReactiveFormsModule],
  templateUrl: './pagamento.component.html',
  styleUrl: './pagamento.component.scss'
})
export class PagamentoComponent implements OnInit {
  @Input() items: CartItem[] = [];
  @Input() total: number = 0;
  @Input() showModal: boolean = false;
  @Output() closeModal = new EventEmitter<void>();
  @Output() paymentComplete = new EventEmitter<any>();

  paymentForm: FormGroup;
  isProcessing: boolean = false;
  currentStep: number = 1;

  constructor(private fb: FormBuilder, private cartService: CartService) {
    this.paymentForm = this.fb.group({
      // Dados pessoais
      fullName: ['', [Validators.required, Validators.minLength(3)]],
      email: ['', [Validators.required, Validators.email]],
      phone: ['', [Validators.required, Validators.pattern(/^\(\d{2}\)\s\d{4,5}-\d{4}$/)]],
      
      // Endereço
      cep: ['', [Validators.required, Validators.pattern(/^\d{5}-\d{3}$/)]],
      address: ['', Validators.required],
      number: ['', Validators.required],
      complement: [''],
      neighborhood: ['', Validators.required],
      city: ['', Validators.required],
      state: ['', Validators.required],
      
      // Pagamento
      paymentMethod: ['credit', Validators.required],
      cardNumber: ['', [Validators.required, Validators.pattern(/^\d{4}\s\d{4}\s\d{4}\s\d{4}$/)]],
      cardName: ['', Validators.required],
      expiryDate: ['', [Validators.required, Validators.pattern(/^\d{2}\/\d{2}$/)]],
      cvv: ['', [Validators.required, Validators.pattern(/^\d{3,4}$/)]],
      installments: ['1', Validators.required]
    });
  }

  ngOnInit(): void {
    if (this.items.length === 0) {
      // Se não há itens passados como input, busca do carrinho
      this.cartService.cartItems$.subscribe(items => {
        this.items = items;
      });
    }
    
    if (this.total === 0) {
      this.calculateTotal();
    }
  }

  calculateTotal(): void {
    this.total = this.items.reduce((sum, item) => sum + (item.price * item.quantity), 0);
  }

  nextStep(): void {
    if (this.currentStep < 3 && this.isCurrentStepValid()) {
      this.currentStep++;
    }
  }

  previousStep(): void {
    if (this.currentStep > 1) {
      this.currentStep--;
    }
  }

  isCurrentStepValid(): boolean {
    switch (this.currentStep) {
      case 1:
        const step1Valid = this.paymentForm.get('fullName')?.valid === true && 
                          this.paymentForm.get('email')?.valid === true && 
                          this.paymentForm.get('phone')?.valid === true;
        return step1Valid;
      case 2:
        const step2Valid = this.paymentForm.get('cep')?.valid === true && 
                          this.paymentForm.get('address')?.valid === true && 
                          this.paymentForm.get('number')?.valid === true && 
                          this.paymentForm.get('neighborhood')?.valid === true && 
                          this.paymentForm.get('city')?.valid === true && 
                          this.paymentForm.get('state')?.valid === true;
        return step2Valid;
      case 3:
        const step3Valid = this.paymentForm.get('paymentMethod')?.valid === true;
        return step3Valid;
      default:
        return false;
    }
  }

  isStepCompleted(step: number): boolean {
    return this.currentStep > step;
  }

  getStepClass(step: number): string {
    if (this.isStepCompleted(step)) {
      return 'completed';
    } else if (this.currentStep === step) {
      return 'active';
    }
    return '';
  }

  onSubmit(): void {
    if (this.paymentForm.valid) {
      this.isProcessing = true;
      
      // Simular processamento de pagamento
      setTimeout(() => {
        this.isProcessing = false;
        const paymentData = {
          ...this.paymentForm.value,
          items: this.items,
          total: this.total,
          orderId: Date.now().toString()
        };
        
        this.paymentComplete.emit(paymentData);
        this.cartService.clearCart();
        this.close();
      }, 3000);
    }
  }

  close(): void {
    this.closeModal.emit();
    this.currentStep = 1;
    this.paymentForm.reset();
  }

  formatCardNumber(event: any): void {
    let value = event.target.value.replace(/\s/g, '');
    let formattedValue = value.replace(/(.{4})/g, '$1 ').trim();
    if (formattedValue.length > 19) {
      formattedValue = formattedValue.substring(0, 19);
    }
    this.paymentForm.patchValue({ cardNumber: formattedValue });
  }

  formatExpiryDate(event: any): void {
    let value = event.target.value.replace(/\D/g, '');
    if (value.length >= 2) {
      value = value.substring(0, 2) + '/' + value.substring(2, 4);
    }
    this.paymentForm.patchValue({ expiryDate: value });
  }

  formatCEP(event: any): void {
    let value = event.target.value.replace(/\D/g, '');
    if (value.length > 5) {
      value = value.substring(0, 5) + '-' + value.substring(5, 8);
    }
    this.paymentForm.patchValue({ cep: value });
  }

  formatPhone(event: any): void {
    let value = event.target.value.replace(/\D/g, '');
    if (value.length <= 10) {
      value = value.replace(/(\d{2})(\d{4})(\d{4})/, '($1) $2-$3');
    } else {
      value = value.replace(/(\d{2})(\d{5})(\d{4})/, '($1) $2-$3');
    }
    this.paymentForm.patchValue({ phone: value });
  }
}
