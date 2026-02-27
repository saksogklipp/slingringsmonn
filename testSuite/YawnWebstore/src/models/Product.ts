// Product model for hardware items shown in the storefront.
export interface Product {
  id: string;
  brand: string;
  name: string;
  description: string;
  price: number;
  imageUrl: string;
}
