import type { CartItem } from './CartItem';
import type { CustomerInfo } from './CustomerInfo';

// Order model created when a user completes payment simulation.
export interface Order {
  id: string;
  items: CartItem[];
  customer: CustomerInfo;
  total: number;
  createdAt: string;
  paymentMethod: 'Visa' | 'Mastercard';
}
