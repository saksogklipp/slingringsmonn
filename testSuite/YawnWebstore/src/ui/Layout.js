import { cartService } from '../services/CartService';
// Shared layout wrapper with centered logo and top navigation.
export const createLayout = (content) => {
    const count = cartService.getItems().reduce((sum, item) => sum + item.quantity, 0);
    return `
    <header>
      <div class="nav-wrap">
        <nav class="nav-left">
          <a class="link-btn" href="#/" data-testid="nav-products">Products</a>
        </nav>

        <div class="logo" data-testid="store-logo"><a href="#/">Yawn Store</a></div>

        <nav class="nav-right">
          <a class="link-btn" href="#/cart" data-testid="nav-cart">Cart (${count})</a>
        </nav>
      </div>
    </header>
    <main>${content}</main>
  `;
};
