import { cartService } from '../services/CartService';
import { orderService } from '../services/OrderService';
import { paymentService } from '../services/PaymentService';
// Checkout page with customer details and simulated card payment fields.
export const renderCheckoutPage = () => {
    const items = cartService.getItems();
    if (items.length === 0) {
        return `
      <section class="section">
        <h2>Checkout</h2>
        <p class="muted">No items in cart.</p>
        <a class="link-btn primary" href="#/">Go to products</a>
      </section>
    `;
    }
    return `
    <section class="section">
      <h1>Checkout</h1>
      <p class="muted">Complete your order details and simulated payment.</p>

      <form id="checkout-form" data-testid="checkout-form">
        <h3>Customer Information</h3>
        <div class="form-grid">
          <div>
            <label for="firstName">First name</label>
            <input id="firstName" name="firstName" required data-testid="firstName" />
          </div>
          <div>
            <label for="lastName">Last name</label>
            <input id="lastName" name="lastName" required data-testid="lastName" />
          </div>
          <div>
            <label for="address">Address</label>
            <input id="address" name="address" required data-testid="address" />
          </div>
          <div>
            <label for="email">Email</label>
            <input id="email" name="email" type="email" required data-testid="email" />
          </div>
        </div>

        <h3>Payment</h3>
        <div class="payment-icons">
          <img src="https://upload.wikimedia.org/wikipedia/commons/4/41/Visa_Logo.png" alt="Visa" />
          <img src="https://upload.wikimedia.org/wikipedia/commons/2/2a/Mastercard-logo.svg" alt="Mastercard" />
        </div>

        <div class="form-grid">
          <div>
            <label for="cardNumber">Credit card number</label>
            <input id="cardNumber" name="cardNumber" inputmode="numeric" required data-testid="cardNumber" />
          </div>
          <div>
            <label for="expiry">Expiry (MM/YY)</label>
            <input id="expiry" name="expiry" placeholder="MM/YY" required data-testid="expiry" />
          </div>
          <div>
            <label for="cvv">CVV</label>
            <input id="cvv" name="cvv" inputmode="numeric" required data-testid="cvv" />
          </div>
        </div>

        <p class="total" data-testid="checkout-total">Order total: $${cartService.getTotal().toFixed(2)}</p>
        <p id="payment-error" class="error" role="alert"></p>

        <button type="submit" class="primary" data-testid="pay-button">Pay</button>
      </form>
    </section>
  `;
};
export const attachCheckoutHandlers = () => {
    const form = document.querySelector('#checkout-form');
    if (!form)
        return;
    form.addEventListener('submit', (event) => {
        event.preventDefault();
        const errorNode = document.querySelector('#payment-error');
        if (!errorNode)
            return;
        const formData = new FormData(form);
        const customer = {
            firstName: String(formData.get('firstName') ?? '').trim(),
            lastName: String(formData.get('lastName') ?? '').trim(),
            address: String(formData.get('address') ?? '').trim(),
            email: String(formData.get('email') ?? '').trim(),
        };
        if (!customer.firstName || !customer.lastName || !customer.address || !customer.email) {
            errorNode.textContent = 'Please complete all customer information fields.';
            return;
        }
        const payment = {
            cardNumber: String(formData.get('cardNumber') ?? '').trim(),
            expiry: String(formData.get('expiry') ?? '').trim(),
            cvv: String(formData.get('cvv') ?? '').trim(),
        };
        const validation = paymentService.validate(payment);
        if (!validation.valid || !validation.method) {
            errorNode.textContent = validation.error ?? 'Payment data is invalid.';
            return;
        }
        const order = {
            id: `ORD-${Date.now()}`,
            items: cartService.getItems().map((item) => ({ ...item })),
            customer,
            total: cartService.getTotal(),
            createdAt: new Date().toISOString(),
            paymentMethod: validation.method,
        };
        orderService.save(order);
        cartService.clear();
        window.location.hash = '/confirmation';
    });
};
