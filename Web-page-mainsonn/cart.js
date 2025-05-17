// Səbəti localStorage-dan oxuyuruq və yalnız obyekt olanları saxlayırıq
let rawCart = JSON.parse(localStorage.getItem("cart")) || [];

// undefined və ya düzgün obyekt olmayanları filtrləyirik
const cart = rawCart.filter(item =>
  typeof item === "object" &&
  item !== null &&
  item.id &&
  item.name &&
  item.price != null &&
  item.imgSource
);

// Eyni məhsulları qruplaşdırırıq
const groupedCart = {};
cart.forEach(item => {
  if (groupedCart[item.id]) {
    groupedCart[item.id].count += 1;
  } else {
    groupedCart[item.id] = {
      id: item.id,
      name: item.name,
      price: item.price,
      imgSource: item.imgSource,
      count: 1
    };
  }
});

const cartItemsContainer = document.getElementById("cart-items");

// Səbətdəki məhsulları göstəririk
cartItemsContainer.innerHTML = ''; // Təkrar yığılmanın qarşısını alır
Object.values(groupedCart).forEach(item => {
  const totalPrice = (item.price * item.count).toFixed(2);

  const itemHTML = `
    <div class="cart-item">
      <img src="${item.imgSource}" alt="${item.name}" class="cart-item-image">
      <div class="cart-item-info">
        <h3>${item.name}</h3>
        <p>Say: <strong>${item.count}</strong></p>
        <p>Cəmi: <strong>$${totalPrice}</strong></p>
      </div>
    </div>
  `;
  cartItemsContainer.innerHTML += itemHTML;
});

// Ümumi məbləği hesablayırıq
// Ümumi məbləği hesablayırıq
let totalCartPrice = 0;

Object.values(groupedCart).forEach(item => {
  const itemPrice = parseFloat(item.price); // <-- Əlavə etdik
  const totalPrice = itemPrice * item.count;
  totalCartPrice += totalPrice;
});

document.getElementById("cart-total").innerText = totalCartPrice.toFixed(2);


// Sifarişi Təsdiqlə düyməsinə klik zamanı alert göstər
document.querySelector(".checkout-button").addEventListener("click", () => {
  alert("Sifarişiniz uğurla qəbul edildi!");
});
