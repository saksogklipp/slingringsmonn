import { orderService } from '../services/OrderService';

// Order confirmation page showing latest order summary held in memory.
export const renderOrderConfirmationPage = (): string => {
  const order = orderService.getLastOrder();

  if (!order) {
    return `
      <section class="section" data-testid="missing-order">
        <h2>No recent order found</h2>
        <a class="link-btn primary" href="#/">Back to products</a>
      </section>
    `;
  }

  const items = order.items
    .map(
      (item) => `
      <li>${item.product.brand} ${item.product.name} x ${item.quantity} - $${(item.product.price * item.quantity).toFixed(2)}</li>
    `,
    )
    .join('');

  return `
    <section class="section" data-testid="order-confirmation">
      <h1>Order placed</h1>
      <p class="muted">Order ID: ${order.id}</p>
      <p>${order.customer.firstName} ${order.customer.lastName}</p>
      <p>${order.customer.address}</p>
      <p>${order.customer.email}</p>
      <p>Payment method: ${order.paymentMethod}</p>
      <h3>Order summary</h3>
      <ul>${items}</ul>
      <p class="total">Total paid: $${order.total.toFixed(2)}</p>
      <a class="link-btn primary" href="#/">Continue shopping</a>
    </section>
  `;
};
