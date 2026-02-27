import { cartService } from '../services/CartService';
// Renders cart rows, quantity controls, and removal actions.
export const renderCartPage = () => {
    const items = cartService.getItems();
    if (items.length === 0) {
        return `
      <section class="section" data-testid="empty-cart">
        <h2>Your cart is empty</h2>
        <a class="link-btn primary" href="#/">Browse products</a>
      </section>
    `;
    }
    const rows = items
        .map((item) => `
      <tr data-testid="cart-row-${item.product.id}">
        <td>${item.product.brand} ${item.product.name}</td>
        <td>$${item.product.price.toFixed(2)}</td>
        <td>
          <input
            type="number"
            min="1"
            value="${item.quantity}"
            data-action="update-quantity"
            data-product-id="${item.product.id}"
            data-testid="qty-${item.product.id}"
          />
        </td>
        <td>$${(item.product.price * item.quantity).toFixed(2)}</td>
        <td>
          <button class="danger" data-action="remove-item" data-product-id="${item.product.id}" data-testid="remove-${item.product.id}">
            Remove
          </button>
        </td>
      </tr>
    `)
        .join('');
    return `
    <section>
      <h1>Cart</h1>
      <div class="table-wrap">
        <table>
          <thead>
            <tr>
              <th>Item</th>
              <th>Price</th>
              <th>Quantity</th>
              <th>Subtotal</th>
              <th>Action</th>
            </tr>
          </thead>
          <tbody>${rows}</tbody>
        </table>
      </div>
      <p class="total" data-testid="cart-total">Total: $${cartService.getTotal().toFixed(2)}</p>
      <a class="link-btn primary" href="#/checkout" data-testid="go-checkout">Proceed to Checkout</a>
    </section>
  `;
};
export const attachCartHandlers = () => {
    document.querySelectorAll('[data-action="update-quantity"]').forEach((input) => {
        input.addEventListener('change', () => {
            const productId = input.dataset.productId;
            if (!productId)
                return;
            const quantity = Number(input.value);
            if (Number.isNaN(quantity))
                return;
            cartService.updateQuantity(productId, quantity);
            window.dispatchEvent(new CustomEvent('app:route-refresh'));
        });
    });
    document.querySelectorAll('[data-action="remove-item"]').forEach((button) => {
        button.addEventListener('click', () => {
            const productId = button.dataset.productId;
            if (!productId)
                return;
            cartService.removeProduct(productId);
            window.dispatchEvent(new CustomEvent('app:route-refresh'));
        });
    });
};
