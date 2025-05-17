let cartCount = 0;

// Cart'a məhsul əlavə etdikdə sayını artırır
function addToCart(productId) {
    cartCount++;
    document.getElementById('cart-count').textContent = cartCount;
    console.log(`Product ${productId} added to cart`);
}

// JSON-dan məhsulları yükləyən funksiya
async function loadProducts() {
    try {
        const response = await fetch('products.json');
        const products = await response.json();

        const genres = {};

        // Məhsulları janrına görə qruplaşdırırıq
        products.forEach(product => {
            if (!genres[product.type]) {
                genres[product.type] = [];
            }
            genres[product.type].push(product);
        });

        const main = document.querySelector('main');

        for (const genre in genres) {
            const section = document.createElement('section');
            section.className = 'genre-section';

            const title = document.createElement('h2');
            title.textContent = genre;
            section.appendChild(title);

            genres[genre].forEach(product => {
                const card = document.createElement('div');
                card.className = 'comic-card';
                card.style.display = 'flex';

                card.innerHTML = `
                    <div>
                        <img src="${product.imgSource}" alt="${product.name}" width="230" height="300" style="padding: 10px;">
                    </div>
                    <div>
                        <h3>${product.name}</h3>
                        <p>${product.description}</p>
                        <p><strong>Author:</strong> ${product.author}</p>
                        <p><strong>Price:</strong> $${product.price}</p>
                        <button class="add-to-cart-button" onclick="addToCart(${product.id})">Add to cart</button>
                    </div>
                `;
                section.appendChild(card);
            });

            main.appendChild(section);
        }
    } catch (error) {
        console.error('Failed to load products:', error);
    }
}

// Yükləmə bitəndə məhsulları çağırırıq
window.onload = loadProducts;

function addToCart(productId) {
    // Məhsullar siyahısını localStorage-dan alırıq
    let cart = JSON.parse(localStorage.getItem('cart')) || [];

    // products.json-dakı bütün məhsulları yükləyirik
    fetch('products.json')
        .then(response => response.json())
        .then(products => {
            const product = products.find(p => p.id === productId);
            if (product) {
                cart.push(product);
                localStorage.setItem('cart', JSON.stringify(cart));
                cartCount++;
                document.getElementById('cart-count').textContent = cartCount;
                console.log(`Added ${product.name} to cart`);
            }
        });
}

