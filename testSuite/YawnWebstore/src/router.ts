import { createLayout } from './ui/Layout';
import { renderProductListPage, attachProductListHandlers } from './ui/ProductListPage';
import { renderCartPage, attachCartHandlers } from './ui/CartPage';
import { renderCheckoutPage, attachCheckoutHandlers } from './ui/CheckoutPage';
import { renderOrderConfirmationPage } from './ui/OrderConfirmationPage';

// Hash-based router to keep navigation simple and test-friendly.
export const renderRoute = (): void => {
  const app = document.querySelector<HTMLDivElement>('#app');
  if (!app) return;

  const route = window.location.hash.replace('#', '') || '/';

  if (route === '/') {
    app.innerHTML = createLayout(renderProductListPage());
    attachProductListHandlers();
    return;
  }

  if (route === '/cart') {
    app.innerHTML = createLayout(renderCartPage());
    attachCartHandlers();
    return;
  }

  if (route === '/checkout') {
    app.innerHTML = createLayout(renderCheckoutPage());
    attachCheckoutHandlers();
    return;
  }

  if (route === '/confirmation') {
    app.innerHTML = createLayout(renderOrderConfirmationPage());
    return;
  }

  app.innerHTML = createLayout(`
    <section class="section">
      <h2>Page not found</h2>
      <a class="link-btn primary" href="#/">Back to store</a>
    </section>
  `);
};
