import type { Product } from './Product';

// Cart line item with selected product and quantity.
export interface CartItem {
  product: Product;
  quantity: number;
}
