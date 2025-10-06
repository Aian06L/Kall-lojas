import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';

export interface CartItem {
  id: number;
  name: string;
  price: number;
  quantity: number;
  image?: string;
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

  constructor() {}

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

  private updateTotals(): void {
    const currentItems = this.cartItems.value;
    const totalQuantity = currentItems.reduce((acc, item) => acc + item.quantity, 0);
    const totalPrice = currentItems.reduce((acc, item) => acc + item.quantity * item.price, 0);

    this.totalQuantity.next(totalQuantity);
    this.totalPrice.next(totalPrice);
  }

  getCartItems(): CartItem[] {
    return this.cartItems.value;
  }
}
