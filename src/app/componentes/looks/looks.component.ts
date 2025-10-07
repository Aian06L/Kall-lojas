import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ActivatedRoute, Router } from '@angular/router';
import { LooksService, Look } from '../../services/looks.service';
import { CartService } from '../../services/cart.service';
import { PagamentoComponent } from '../pagamento/pagamento.component';

@Component({
  selector: 'app-looks',
  imports: [CommonModule, PagamentoComponent],
  templateUrl: './looks.component.html',
  styleUrls: ['./looks.component.scss']
})
export class LooksComponent implements OnInit {
  looks: Look[] = [];
  filteredLooks: Look[] = [];
  skirtsLooks: Look[] = [];
  categories: string[] = [];
  selectedCategory: string = '';
  
  // Modal de pagamento
  showPaymentModal: boolean = false;
  currentLook: Look | null = null;

  constructor(
    private looksService: LooksService,
    private route: ActivatedRoute,
    private router: Router,
    private cartService: CartService
  ) {}

  ngOnInit(): void {
    this.looks = this.looksService.getLooks();
    this.categories = this.looksService.getCategories();
    this.skirtsLooks = this.looksService.getLooksByCategory('Saias');

    this.route.queryParams.subscribe(params => {
      this.selectedCategory = params['category'] || '';
      this.filterLooks();
    });
  }

  filterLooks(): void {
    if (this.selectedCategory) {
      this.filteredLooks = this.looksService.getLooksByCategory(this.selectedCategory);
    } else {
      this.filteredLooks = this.looks;
    }
  }

  onCategoryChange(category: string): void {
    this.router.navigate(['/looks'], { queryParams: { category } });
  }

  clearFilter(): void {
    this.router.navigate(['/looks']);
  }

  toggleFavorite(look: Look): void {
    if (this.isFavorite(look)) {
      this.looksService.removeFavorite(look);
    } else {
      this.looksService.addFavorite(look);
    }
  }

  isFavorite(look: Look): boolean {
    return this.looksService.isFavorite(look);
  }

  addToCart(look: Look): void {
    // Convertendo Look para CartItem (assumindo preço padrão de R$ 89,90 para looks)
    this.cartService.addToCart({
      id: look.id,
      name: look.name,
      price: 89.90, // Preço padrão para looks
      quantity: 1,
      image: look.image
    });
    console.log(`Added to cart: ${look.name}`);
  }

  buyNow(look: Look): void {
    this.currentLook = look;
    this.showPaymentModal = true;
  }

  closePaymentModal(): void {
    this.showPaymentModal = false;
    this.currentLook = null;
  }

  onPaymentComplete(paymentData: any): void {
    console.log('Pagamento concluído:', paymentData);
    this.showSuccessNotification(`Compra realizada com sucesso! Pedido #${paymentData.orderId}`);
    this.closePaymentModal();
  }

  getCurrentLookAsCartItems(): any[] {
    if (!this.currentLook) return [];
    
    return [{
      id: this.currentLook.id,
      name: this.currentLook.name,
      price: 89.90, // Preço padrão para looks
      quantity: 1,
      image: this.currentLook.image
    }];
  }

  getCurrentLookTotal(): number {
    return this.currentLook ? 89.90 : 0; // Preço padrão para looks
  }

  private showSuccessNotification(message: string): void {
    const notification = document.createElement('div');
    notification.className = 'purchase-notification';
    notification.innerHTML = `
      <i class="bi bi-check-circle-fill"></i>
      <span>${message}</span>
    `;
    
    notification.style.cssText = `
      position: fixed;
      top: 20px;
      right: 20px;
      background: linear-gradient(135deg, #28a745, #20c997);
      color: white;
      padding: 15px 20px;
      border-radius: 8px;
      box-shadow: 0 4px 12px rgba(0,0,0,0.15);
      z-index: 99999;
      display: flex;
      align-items: center;
      gap: 10px;
      font-size: 14px;
      font-weight: 500;
      animation: slideInRight 0.3s ease-out;
    `;

    document.body.appendChild(notification);

    setTimeout(() => {
      notification.style.animation = 'slideOutRight 0.3s ease-in';
      setTimeout(() => {
        if (document.body.contains(notification)) {
          document.body.removeChild(notification);
        }
      }, 300);
    }, 5000);
  }
}
