import { products } from '../data/products';
import { cartService } from '../services/CartService';
// Renders product cards and wires Add to Cart interactions.
export const renderProductListPage = () => {
    const cards = products
        .map((product) => `
      <article class="card" data-testid="product-card-${product.id}">
        <img src="${product.imageUrl}" alt="${product.name}" />
        <div class="card-content">
          <h3>${product.brand} ${product.name}</h3>
          <p class="muted">${product.description}</p>
          <p class="price">$${product.price.toFixed(2)}</p>
          <button class="primary" data-action="add-to-cart" data-product-id="${product.id}" data-testid="add-${product.id}">
            Add to Cart
          </button>
        </div>
      </article>
    `)
        .join('');
    return `
    <section>
      <h1>PC Components</h1>
      <p class="muted">Choose from high-performance GPUs and RAM kits.</p>
      <div class="grid">${cards}</div>
    </section>
  `;
};
export const attachProductListHandlers = () => {
    document.querySelectorAll('[data-action="add-to-cart"]').forEach((button) => {
        button.addEventListener('click', () => {
            const productId = button.dataset.productId;
            const product = products.find((entry) => entry.id === productId);
            if (!product)
                return;
            cartService.addProduct(product);
            window.dispatchEvent(new CustomEvent('app:route-refresh'));
        });
    });
};
