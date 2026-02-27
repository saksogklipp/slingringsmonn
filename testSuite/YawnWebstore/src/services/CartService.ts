import type { CartItem } from '../models/CartItem';
import type { Product } from '../models/Product';

// In-memory cart service for adding, updating, removing, and totaling items.
class CartService {
  private items: CartItem[] = [];

  getItems(): CartItem[] {
    return this.items;
  }

  addProduct(product: Product): void {
    const existing = this.items.find((item) => item.product.id === product.id);

    if (existing) {
      existing.quantity += 1;
      return;
    }

    this.items.push({ product, quantity: 1 });
  }

  updateQuantity(productId: string, quantity: number): void {
    const item = this.items.find((line) => line.product.id === productId);
    if (!item) return;

    if (quantity <= 0) {
      this.removeProduct(productId);
      return;
    }

    item.quantity = quantity;
  }

  removeProduct(productId: string): void {
    this.items = this.items.filter((item) => item.product.id !== productId);
  }

  getTotal(): number {
    return this.items.reduce((sum, item) => sum + item.product.price * item.quantity, 0);
  }

  clear(): void {
    this.items = [];
  }
}

export const cartService = new CartService();
