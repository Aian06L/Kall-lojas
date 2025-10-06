import { Component, OnInit, OnDestroy } from '@angular/core';
import { CommonModule } from '@angular/common';
import { CartService, CartItem } from '../../services/cart.service';
import { Subscription } from 'rxjs';

@Component({
  selector: 'app-carrinho',
  imports: [CommonModule],
  templateUrl: './carrinho.component.html',
  styleUrl: './carrinho.component.scss'
})
export class CarrinhoComponent implements OnInit, OnDestroy {
  cartItems: CartItem[] = [];
  totalQuantity: number = 0;
  totalPrice: number = 0;

  private subscriptions: Subscription = new Subscription();

  constructor(private cartService: CartService) {}

  ngOnInit(): void {
    this.subscriptions.add(
      this.cartService.cartItems$.subscribe(items => {
        this.cartItems = items;
      })
    );

    this.subscriptions.add(
      this.cartService.totalQuantity$.subscribe(quantity => {
        this.totalQuantity = quantity;
      })
    );

    this.subscriptions.add(
      this.cartService.totalPrice$.subscribe(price => {
        this.totalPrice = price;
      })
    );
  }

  ngOnDestroy(): void {
    this.subscriptions.unsubscribe();
  }

  removeItem(itemId: number): void {
    this.cartService.removeFromCart(itemId);
  }

  updateQuantity(itemId: number, quantity: string): void {
    const qty = parseInt(quantity, 10);
    if (!isNaN(qty) && qty > 0) {
      this.cartService.updateQuantity(itemId, qty);
    }
  }

  clearCart(): void {
    this.cartService.clearCart();
  }
}
