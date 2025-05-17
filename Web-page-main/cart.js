function addToCart(product) {
  let cart = JSON.parse(localStorage.getItem('cart')) || [];
  const index = cart.findIndex(item => item.id === product.id);
  if (index > -1) {
    cart[index].quantity += 1;
  } else {
    product.quantity = 1;
    cart.push(product);
  }
  localStorage.setItem('cart', JSON.stringify(cart));
  updateCartCount();
}

function updateCartCount() {
  const cart = JSON.parse(localStorage.getItem('cart')) || [];
  const count = cart.reduce((total, item) => total + item.quantity, 0);
  const cartCountEl = document.querySelector('.cart-count');
  if (cartCountEl) {
    cartCountEl.textContent = count;
  }
}

function displayCartItems() {
  const cart = JSON.parse(localStorage.getItem('cart')) || [];
  const container = document.getElementById('cart-items');
  container.innerHTML = "";

  if (cart.length === 0) {
    container.innerHTML = "<p>Your cart is empty.</p>";
    return;
  }

  cart.forEach(item => {
    const div = document.createElement('div');
    div.className = "item";

    div.innerHTML = `
      <img src="${item.image}" alt="${item.name}" class="item-image">
      <div class="item-info">
        <h3>${item.name}</h3>
        <p>Say: <strong>${item.quantity}</strong></p>
        <p>Cəmi: <strong>$${(item.price * item.quantity).toFixed(2)}</strong></p>
      </div>
    `;

    container.appendChild(div);
  });
}
