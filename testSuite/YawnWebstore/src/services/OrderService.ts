import type { Order } from '../models/Order';

// Keeps latest order in memory for order confirmation display.
class OrderService {
  private lastOrder: Order | null = null;

  save(order: Order): void {
    this.lastOrder = order;
  }

  getLastOrder(): Order | null {
    return this.lastOrder;
  }
}

export const orderService = new OrderService();
