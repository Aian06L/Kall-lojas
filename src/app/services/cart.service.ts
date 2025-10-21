import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';

export interface CartItem {
  id: number;
  name: string;
  price: number;
  originalPrice?: number;
  quantity: number;
  image?: string;
  size?: string;
  color?: string;
  category?: string;
  stock?: number;
  discount?: number;
}

@Injectable({
  providedIn: 'root'
})
export class CartService {
  private cartItems = new BehaviorSubject<CartItem[]>([]);
  cartItems$ = this.cartItems.asObservable();

  private totalQuantity = new BehaviorSubject<number>(0);
  totalQuantity$ = this.totalQuantity.asObservable();

  private totalPrice = new BehaviorSubject<number>(0);
  totalPrice$ = this.totalPrice.asObservable();

  private subtotal = new BehaviorSubject<number>(0);
  subtotal$ = this.subtotal.asObservable();

  private totalDiscount = new BehaviorSubject<number>(0);
  totalDiscount$ = this.totalDiscount.asObservable();

  private readonly storageKey = 'kall_cart_items';

  constructor() {
    this.loadCartFromStorage();
  }

  addToCart(item: CartItem): void {
    const currentItems = this.cartItems.value;
    const existingItem = currentItems.find(i => i.id === item.id);

    if (existingItem) {
      existingItem.quantity += item.quantity;
    } else {
      currentItems.push(item);
    }

    this.cartItems.next(currentItems);
    this.updateTotals();
  }

  removeFromCart(itemId: number): void {
    const currentItems = this.cartItems.value.filter(i => i.id !== itemId);
    this.cartItems.next(currentItems);
    this.updateTotals();
  }

  updateQuantity(itemId: number, quantity: number): void {
    const currentItems = this.cartItems.value;
    const item = currentItems.find(i => i.id === itemId);
    if (item) {
      item.quantity = quantity;
      if (quantity <= 0) {
        this.removeFromCart(itemId);
      } else {
        this.cartItems.next(currentItems);
        this.updateTotals();
      }
    }
  }

  clearCart(): void {
    this.cartItems.next([]);
    this.updateTotals();
  }



  getCartItems(): CartItem[] {
    return this.cartItems.value;
  }

  getItems(): CartItem[] {
    return this.getCartItems();
  }

  getTotalQuantity(): number {
    return this.totalQuantity.value;
  }

  getTotalPrice(): number {
    return this.totalPrice.value;
  }

  getSubtotal(): number {
    return this.subtotal.value;
  }

  getTotalDiscount(): number {
    return this.totalDiscount.value;
  }

  isItemInCart(itemId: number): boolean {
    return this.cartItems.value.some(item => item.id === itemId);
  }

  getItemQuantity(itemId: number): number {
    const item = this.cartItems.value.find(i => i.id === itemId);
    return item ? item.quantity : 0;
  }

  addToCartWithValidation(item: CartItem): { success: boolean; message: string } {
    const currentItems = this.cartItems.value;
    const existingItem = currentItems.find(i => i.id === item.id && i.size === item.size);
    
    if (item.stock && item.stock <= 0) {
      return { success: false, message: 'Produto fora de estoque' };
    }

    const newQuantity = existingItem ? existingItem.quantity + item.quantity : item.quantity;
    
    if (item.stock && newQuantity > item.stock) {
      return { 
        success: false, 
        message: `Apenas ${item.stock} unidades disponíveis` 
      };
    }

    this.addToCart(item);
    return { 
      success: true, 
      message: `${item.name} adicionado ao carrinho!` 
    };
  }

  private loadCartFromStorage(): void {
    try {
      const storedCart = localStorage.getItem(this.storageKey);
      if (storedCart) {
        const items = JSON.parse(storedCart);
        this.cartItems.next(items);
        this.updateTotals();
      }
    } catch (error) {
      console.error('Erro ao carregar carrinho do localStorage:', error);
    }
  }

  private saveCartToStorage(): void {
    try {
      localStorage.setItem(this.storageKey, JSON.stringify(this.cartItems.value));
    } catch (error) {
      console.error('Erro ao salvar carrinho no localStorage:', error);
    }
  }

  private updateTotals(): void {
    const currentItems = this.cartItems.value;
    const totalQuantity = currentItems.reduce((acc, item) => acc + item.quantity, 0);
    const subtotal = currentItems.reduce((acc, item) => {
      const originalPrice = item.originalPrice || item.price;
      return acc + item.quantity * originalPrice;
    }, 0);
    const totalDiscount = currentItems.reduce((acc, item) => {
      if (item.originalPrice && item.discount) {
        return acc + item.quantity * (item.originalPrice - item.price);
      }
      return acc;
    }, 0);
    const totalPrice = currentItems.reduce((acc, item) => acc + item.quantity * item.price, 0);

    this.totalQuantity.next(totalQuantity);
    this.subtotal.next(subtotal);
    this.totalDiscount.next(totalDiscount);
    this.totalPrice.next(totalPrice);
    this.saveCartToStorage();
  }
}
