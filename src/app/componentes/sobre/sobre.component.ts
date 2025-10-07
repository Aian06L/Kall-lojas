import { Component, OnInit, Inject } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FooterComponent } from "../footer/footer.component";
import { ClothingService } from '../../services/clothing.service';
import { LooksService } from '../../services/looks.service';
import { CartService } from '../../services/cart.service';
import { Clothing } from '../../model/clothing.model';

@Component({
  selector: 'app-sobre',
  templateUrl: './sobre.component.html',
  styleUrls: ['./sobre.component.scss'],
  standalone: true,
  imports: [CommonModule, FooterComponent]
})
export class SobreComponent implements OnInit {
  // Dados dos produtos para o dashboard
  allProducts: Clothing[] = [];
  
  constructor(
    private clothingService: ClothingService,
    @Inject(LooksService) private looksService: LooksService,
    private cartService: CartService
  ) {}

  ngOnInit(): void {
    // Carregar todos os produtos
    this.clothingService.getAllClothing().subscribe(products => {
      this.allProducts = products;
    });
  }

  // Métodos do Dashboard da Loja
  getTotalProducts(): number {
    return this.allProducts.length || 156; // Valor padrão caso não carregue
  }

  getTotalCategories(): number {
    return 8; // Vestidos, Blusas, Calças, Saias, Escritório, Festa, Sport, Casual
  }

  getEstimatedCustomers(): number {
    return 2847; // Número estimado de clientes ativos
  }

  getTotalSales(): number {
    return 423; // Vendas deste mês
  }

  getFavoriteCount(): number {
    const favorites = JSON.parse(localStorage.getItem('favorites') || '[]');
    return favorites.length || 89; // Valor padrão
  }

  getCartItemCount(): number {
    const cartItems = this.cartService.getCartItems();
    return cartItems.reduce((total: number, item: any) => total + item.quantity, 0) || 12;
  }

  getYearsInBusiness(): number {
    return 5; // Anos de experiência da loja
  }

  getDeliveryStates(): number {
    return 26; // Estados atendidos pela loja
  }
}