import type { Product } from '../models/Product';

// Static product catalog for GPUs and RAM modules.
export const products: Product[] = [
  {
    id: 'gpu-rtx-4080',
    brand: 'Nvidia',
    name: 'GeForce RTX 4080',
    description: 'High-end GPU designed for 4K gaming and demanding creative workloads.',
    price: 1199,
    imageUrl: 'https://images.unsplash.com/photo-1591489378430-ef2f4c626b35?auto=format&fit=crop&w=1200&q=80',
  },
  {
    id: 'gpu-rog-4070',
    brand: 'Asus',
    name: 'ROG Strix RTX 4070',
    description: 'Factory-overclocked graphics card with robust cooling and quiet operation.',
    price: 799,
    imageUrl: 'https://images.pexels.com/photos/777001/pexels-photo-777001.jpeg?auto=compress&cs=tinysrgb&w=1200',
  },
  {
    id: 'ram-vengeance-32',
    brand: 'Corsair',
    name: 'Vengeance DDR5',
    description: '2x16GB DDR5 memory kit with optimized timings for gaming systems.',
    price: 179,
    imageUrl: 'https://images.unsplash.com/photo-1562976540-1502c2145186?auto=format&fit=crop&w=1200&q=80',
  },
  {
    id: 'ram-gskill-64',
    brand: 'G.Skill',
    name: 'Trident Z5 DDR5',
    description: '2x32GB high-capacity memory kit for multitasking and creator workloads.',
    price: 329,
    imageUrl: 'https://images.pexels.com/photos/2582937/pexels-photo-2582937.jpeg?auto=compress&cs=tinysrgb&w=1200',
  },
];
