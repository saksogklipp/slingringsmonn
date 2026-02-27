(function(){const t=document.createElement("link").relList;if(t&&t.supports&&t.supports("modulepreload"))return;for(const i of document.querySelectorAll('link[rel="modulepreload"]'))a(i);new MutationObserver(i=>{for(const s of i)if(s.type==="childList")for(const d of s.addedNodes)d.tagName==="LINK"&&d.rel==="modulepreload"&&a(d)}).observe(document,{childList:!0,subtree:!0});function e(i){const s={};return i.integrity&&(s.integrity=i.integrity),i.referrerPolicy&&(s.referrerPolicy=i.referrerPolicy),i.crossOrigin==="use-credentials"?s.credentials="include":i.crossOrigin==="anonymous"?s.credentials="omit":s.credentials="same-origin",s}function a(i){if(i.ep)return;i.ep=!0;const s=e(i);fetch(i.href,s)}})();class h{constructor(){this.items=[]}getItems(){return this.items}addProduct(t){const e=this.items.find(a=>a.product.id===t.id);if(e){e.quantity+=1;return}this.items.push({product:t,quantity:1})}updateQuantity(t,e){const a=this.items.find(i=>i.product.id===t);if(a){if(e<=0){this.removeProduct(t);return}a.quantity=e}}removeProduct(t){this.items=this.items.filter(e=>e.product.id!==t)}getTotal(){return this.items.reduce((t,e)=>t+e.product.price*e.quantity,0)}clear(){this.items=[]}}const o=new h,n=r=>`
    <header>
      <div class="nav-wrap">
        <nav class="nav-left">
          <a class="link-btn" href="#/" data-testid="nav-products">Products</a>
        </nav>

        <div class="logo" data-testid="store-logo"><a href="#/">Yawn Store</a></div>

        <nav class="nav-right">
          <a class="link-btn" href="#/cart" data-testid="nav-cart">Cart (${o.getItems().reduce((e,a)=>e+a.quantity,0)})</a>
        </nav>
      </div>
    </header>
    <main>${r}</main>
  `,l=[{id:"gpu-rtx-4080",brand:"Nvidia",name:"GeForce RTX 4080",description:"High-end GPU designed for 4K gaming and demanding creative workloads.",price:1199,imageUrl:"https://images.unsplash.com/photo-1591489378430-ef2f4c626b35?auto=format&fit=crop&w=1200&q=80"},{id:"gpu-rog-4070",brand:"Asus",name:"ROG Strix RTX 4070",description:"Factory-overclocked graphics card with robust cooling and quiet operation.",price:799,imageUrl:"https://images.pexels.com/photos/777001/pexels-photo-777001.jpeg?auto=compress&cs=tinysrgb&w=1200"},{id:"ram-vengeance-32",brand:"Corsair",name:"Vengeance DDR5",description:"2x16GB DDR5 memory kit with optimized timings for gaming systems.",price:179,imageUrl:"https://images.unsplash.com/photo-1562976540-1502c2145186?auto=format&fit=crop&w=1200&q=80"},{id:"ram-gskill-64",brand:"G.Skill",name:"Trident Z5 DDR5",description:"2x32GB high-capacity memory kit for multitasking and creator workloads.",price:329,imageUrl:"https://images.pexels.com/photos/2582937/pexels-photo-2582937.jpeg?auto=compress&cs=tinysrgb&w=1200"}],f=()=>`
    <section>
      <h1>PC Components</h1>
      <p class="muted">Choose from high-performance GPUs and RAM kits.</p>
      <div class="grid">${l.map(t=>`
      <article class="card" data-testid="product-card-${t.id}">
        <img src="${t.imageUrl}" alt="${t.name}" />
        <div class="card-content">
          <h3>${t.brand} ${t.name}</h3>
          <p class="muted">${t.description}</p>
          <p class="price">$${t.price.toFixed(2)}</p>
          <button class="card-button" data-action="add-to-cart" data-product-id="${t.id}" data-testid="add-${t.id}">
            Add to Cart
          </button>
        </div>
      </article>
    `).join("")}</div>
    </section>
  `,v=()=>{document.querySelectorAll('[data-action="add-to-cart"]').forEach(r=>{r.addEventListener("click",()=>{const t=r.dataset.productId,e=l.find(a=>a.id===t);e&&(o.addProduct(e),window.dispatchEvent(new CustomEvent("app:route-refresh")))})})},g=()=>{const r=o.getItems();return r.length===0?`
      <section class="section" data-testid="empty-cart">
        <h2>Your cart is empty</h2>
        <a class="link-btn primary" href="#/">Browse products</a>
      </section>
    `:`
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
          <tbody>${r.map(e=>`
      <tr data-testid="cart-row-${e.product.id}">
        <td>${e.product.brand} ${e.product.name}</td>
        <td>$${e.product.price.toFixed(2)}</td>
        <td>
          <input
            type="number"
            min="1"
            value="${e.quantity}"
            data-action="update-quantity"
            data-product-id="${e.product.id}"
            data-testid="qty-${e.product.id}"
          />
        </td>
        <td>$${(e.product.price*e.quantity).toFixed(2)}</td>
        <td>
          <button class="danger" data-action="remove-item" data-product-id="${e.product.id}" data-testid="remove-${e.product.id}">
            Remove
          </button>
        </td>
      </tr>
    `).join("")}</tbody>
        </table>
      </div>
      <p class="total" data-testid="cart-total">Total: $${o.getTotal().toFixed(2)}</p>
      <a class="link-btn primary" href="#/checkout" data-testid="go-checkout">Proceed to Checkout</a>
    </section>
  `},y=()=>{document.querySelectorAll('[data-action="update-quantity"]').forEach(r=>{r.addEventListener("change",()=>{const t=r.dataset.productId;if(!t)return;const e=Number(r.value);Number.isNaN(e)||(o.updateQuantity(t,e),window.dispatchEvent(new CustomEvent("app:route-refresh")))})}),document.querySelectorAll('[data-action="remove-item"]').forEach(r=>{r.addEventListener("click",()=>{const t=r.dataset.productId;t&&(o.removeProduct(t),window.dispatchEvent(new CustomEvent("app:route-refresh")))})})};class b{constructor(){this.lastOrder=null}save(t){this.lastOrder=t}getLastOrder(){return this.lastOrder}}const u=new b;class ${validate(t){const e=t.cardNumber.replace(/\s+/g,"");if(!/^\d{13,19}$/.test(e))return{valid:!1,error:"Card number must be 13-19 digits."};const a=this.detectCardType(e);return a?/^(0[1-9]|1[0-2])\/(\d{2})$/.test(t.expiry)?/^\d{3,4}$/.test(t.cvv)?{valid:!0,method:a}:{valid:!1,error:"CVV must be 3 or 4 digits."}:{valid:!1,error:"Expiry must be in MM/YY format."}:{valid:!1,error:"Only Visa and Mastercard are accepted."}}detectCardType(t){if(/^4\d{12}(\d{3})?(\d{3})?$/.test(t))return"Visa";const e=Number(t.slice(0,2)),a=Number(t.slice(0,4));return e>=51&&e<=55||a>=2221&&a<=2720?"Mastercard":null}}const w=new $,N=()=>o.getItems().length===0?`
      <section class="section">
        <h2>Checkout</h2>
        <p class="muted">No items in cart.</p>
        <a class="link-btn primary" href="#/">Go to products</a>
      </section>
    `:`
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

        <p class="total" data-testid="checkout-total">Order total: $${o.getTotal().toFixed(2)}</p>
        <p id="payment-error" class="error" role="alert"></p>

        <button type="submit" class="primary" data-testid="pay-button">Pay</button>
      </form>
    </section>
  `,k=()=>{const r=document.querySelector("#checkout-form");r&&r.addEventListener("submit",t=>{t.preventDefault();const e=document.querySelector("#payment-error");if(!e)return;const a=new FormData(r),i={firstName:String(a.get("firstName")??"").trim(),lastName:String(a.get("lastName")??"").trim(),address:String(a.get("address")??"").trim(),email:String(a.get("email")??"").trim()};if(!i.firstName||!i.lastName||!i.address||!i.email){e.textContent="Please complete all customer information fields.";return}const s={cardNumber:String(a.get("cardNumber")??"").trim(),expiry:String(a.get("expiry")??"").trim(),cvv:String(a.get("cvv")??"").trim()},d=w.validate(s);if(!d.valid||!d.method){e.textContent=d.error??"Payment data is invalid.";return}const m={id:`ORD-${Date.now()}`,items:o.getItems().map(p=>({...p})),customer:i,total:o.getTotal(),createdAt:new Date().toISOString(),paymentMethod:d.method};u.save(m),o.clear(),window.location.hash="/confirmation"})},C=()=>{const r=u.getLastOrder();if(!r)return`
      <section class="section" data-testid="missing-order">
        <h2>No recent order found</h2>
        <a class="link-btn primary" href="#/">Back to products</a>
      </section>
    `;const t=r.items.map(e=>`
      <li>${e.product.brand} ${e.product.name} x ${e.quantity} - $${(e.product.price*e.quantity).toFixed(2)}</li>
    `).join("");return`
    <section class="section" data-testid="order-confirmation">
      <h1>Order placed</h1>
      <p class="muted">Order ID: ${r.id}</p>
      <p>${r.customer.firstName} ${r.customer.lastName}</p>
      <p>${r.customer.address}</p>
      <p>${r.customer.email}</p>
      <p>Payment method: ${r.paymentMethod}</p>
      <h3>Order summary</h3>
      <ul>${t}</ul>
      <p class="total">Total paid: $${r.total.toFixed(2)}</p>
      <a class="link-btn primary" href="#/">Continue shopping</a>
    </section>
  `},c=()=>{const r=document.querySelector("#app");if(!r)return;const t=window.location.hash.replace("#","")||"/";if(t==="/"){r.innerHTML=n(f()),v();return}if(t==="/cart"){r.innerHTML=n(g()),y();return}if(t==="/checkout"){r.innerHTML=n(N()),k();return}if(t==="/confirmation"){r.innerHTML=n(C());return}r.innerHTML=n(`
    <section class="section">
      <h2>Page not found</h2>
      <a class="link-btn primary" href="#/">Back to store</a>
    </section>
  `)};c();window.addEventListener("hashchange",c);window.addEventListener("app:route-refresh",c);
