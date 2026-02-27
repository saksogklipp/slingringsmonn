// Keeps latest order in memory for order confirmation display.
class OrderService {
    constructor() {
        this.lastOrder = null;
    }
    save(order) {
        this.lastOrder = order;
    }
    getLastOrder() {
        return this.lastOrder;
    }
}
export const orderService = new OrderService();
