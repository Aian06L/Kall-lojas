import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';
import { ClothingService } from '../../services/clothing.service';
import { CartService } from '../../services/cart.service';
import { Clothing } from '../../model/clothing.model';

@Component({
  selector: 'app-compra',
  standalone: true,
  imports: [CommonModule, RouterModule],
  templateUrl: './compra.component.html',
  styleUrls: ['./compra.component.scss']
})
export class CompraComponent implements OnInit {
  products: Clothing[] = [];
  selectedProducts: Set<number> = new Set();
  selectAll: boolean = false;
  
  constructor(
    private clothingService: ClothingService,
    private cartService: CartService
  ) {}
  
  ngOnInit(): void {
    this.loadProducts();
  }
  
  loadProducts(): void {
    this.clothingService.getAllClothing().subscribe(products => {
      this.products = products;
    });
  }
  
  toggleProductSelection(productId: number): void {
    if (this.selectedProducts.has(productId)) {
      this.selectedProducts.delete(productId);
    } else {
      this.selectedProducts.add(productId);
    }
    this.updateSelectAllStatus();
  }
  
  isProductSelected(productId: number): boolean {
    return this.selectedProducts.has(productId);
  }
  
  toggleSelectAll(): void {
    this.selectAll = !this.selectAll;
    
    if (this.selectAll) {
      this.products.forEach(product => this.selectedProducts.add(product.id));
    } else {
      this.selectedProducts.clear();
    }
  }
  
  updateSelectAllStatus(): void {
    this.selectAll = this.selectedProducts.size === this.products.length && this.products.length > 0;
  }
  
  addSelectedToCart(): void {
    const selectedProductsList = this.products.filter(product => 
      this.selectedProducts.has(product.id)
    );
    
    selectedProductsList.forEach(product => {
      const cartItem = {
        id: product.id,
        name: product.name,
        price: product.price,
        quantity: 1,
        image: product.imageUrl
      };
      this.cartService.addToCart(cartItem);
    });
    
    // Limpar seleções após adicionar ao carrinho
    this.selectedProducts.clear();
    this.selectAll = false;
    
    alert(`${selectedProductsList.length} produto(s) adicionado(s) ao carrinho!`);
  }
  
  buySelected(): void {
    const selectedProductsList = this.products.filter(product => 
      this.selectedProducts.has(product.id)
    );
    
    if (selectedProductsList.length === 0) {
      alert('Selecione pelo menos um produto para comprar.');
      return;
    }
    
    // Adicionar produtos selecionados ao carrinho
    selectedProductsList.forEach(product => {
      const cartItem = {
        id: product.id,
        name: product.name,
        price: product.price,
        quantity: 1,
        image: product.imageUrl
      };
      this.cartService.addToCart(cartItem);
    });
    
    // Navegar para o carrinho
    window.location.href = '/carrinho';
  }
  
  getSelectedCount(): number {
    return this.selectedProducts.size;
  }
  
  getTotalPrice(): number {
    return this.products
      .filter(product => this.selectedProducts.has(product.id))
      .reduce((total, product) => total + product.price, 0);
  }
  
  trackProduct(index: number, product: Clothing): number {
    return product.id;
  }
}
