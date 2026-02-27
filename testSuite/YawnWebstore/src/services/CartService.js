// In-memory cart service for adding, updating, removing, and totaling items.
class CartService {
    constructor() {
        this.items = [];
    }
    getItems() {
        return this.items;
    }
    addProduct(product) {
        const existing = this.items.find((item) => item.product.id === product.id);
        if (existing) {
            existing.quantity += 1;
            return;
        }
        this.items.push({ product, quantity: 1 });
    }
    updateQuantity(productId, quantity) {
        const item = this.items.find((line) => line.product.id === productId);
        if (!item)
            return;
        if (quantity <= 0) {
            this.removeProduct(productId);
            return;
        }
        item.quantity = quantity;
    }
    removeProduct(productId) {
        this.items = this.items.filter((item) => item.product.id !== productId);
    }
    getTotal() {
        return this.items.reduce((sum, item) => sum + item.product.price * item.quantity, 0);
    }
    clear() {
        this.items = [];
    }
}
export const cartService = new CartService();
