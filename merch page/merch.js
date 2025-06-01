// Product data
const products = [
    {
        id: 1,
        name: "Classic Band Logo Tee",
        price: 799,
        category: "t-shirts",
        image: "../assets/gallery1.jpg",
        sizes: ["S", "M", "L", "XL", "XXL"]
    },
    {
        id: 2,
        name: "Bengal Rock Hoodie",
        price: 1499,
        category: "hoodies",
        image: "../assets/gallery2.jpg",
        sizes: ["M", "L", "XL"]
    },
    {
        id: 3,
        name: "Guitar Pick Necklace",
        price: 299,
        category: "accessories",
        image: "../assets/gallery3.jpg",
        sizes: []
    },
    {
        id: 4,
        name: "Limited Edition Vinyl",
        price: 1999,
        category: "music",
        image: "../assets/gallery4.jpg",
        sizes: []
    },
    {
        id: 5,
        name: "Band Poster (Signed)",
        price: 999,
        category: "collectibles",
        image: "../assets/gallery5.jpg",
        sizes: []
    },
    {
        id: 6,
        name: "Rebellion Tour Tee",
        price: 899,
        category: "t-shirts",
        image: "../assets/gallery6.jpg",
        sizes: ["S", "M", "L", "XL"]
    }
];

// State management
let cart = [];
let activeFilters = {
    categories: [],
    sizes: [],
    maxPrice: 5000
};
let currentSort = 'featured';

// DOM Elements
const productsContainer = document.getElementById('products-container');
const cartPreview = document.getElementById('cart-preview');
const cartItems = document.querySelector('.cart-items');
const totalAmount = document.querySelector('.total-amount');
const priceRange = document.querySelector('.price-range');
const currentPrice = document.querySelector('.current-price');
const sortBy = document.getElementById('sort-by');

// Event Listeners
document.addEventListener('DOMContentLoaded', () => {
    renderProducts(products);
    setupEventListeners();
});

function setupEventListeners() {
    // Filter toggle
    document.querySelector('.filter-toggle').addEventListener('click', () => {
        document.querySelector('.filters').classList.toggle('collapsed');
        const icon = document.querySelector('.filter-toggle i.fa-chevron-down');
        icon.style.transform = icon.style.transform === 'rotate(180deg)' ? 'rotate(0deg)' : 'rotate(180deg)';
    });

    // Category filters
    document.querySelectorAll('.filter-options input[type="checkbox"]').forEach(checkbox => {
        checkbox.addEventListener('change', handleFilterChange);
    });

    // Price range
    priceRange.addEventListener('input', (e) => {
        activeFilters.maxPrice = parseInt(e.target.value);
        currentPrice.textContent = `₹${e.target.value}`;
        applyFilters();
    });

    // Sort
    sortBy.addEventListener('change', (e) => {
        currentSort = e.target.value;
        applyFilters();
    });

    // Cart toggle
    document.querySelector('.close-cart').addEventListener('click', () => {
        cartPreview.classList.remove('active');
    });
}

// Render functions
function renderProducts(productsToRender) {
    productsContainer.innerHTML = productsToRender.map(product => `
        <div class="product-card" id="product-${product.id}">
            <img src="${product.image}" alt="${product.name}" class="product-image">
            <div class="product-details">
                <h3 class="product-name">${product.name}</h3>
                <p class="product-price">₹${product.price}</p>
                <div class="product-actions">
                    ${product.sizes.length ? `
                        <select class="size-select">
                            <option value="">Select Size</option>
                            ${product.sizes.map(size => `<option value="${size}">${size}</option>`).join('')}
                        </select>
                    ` : ''}
                    <button class="add-to-cart" onclick="addToCart(${product.id})">
                        Add to Cart
                    </button>
                </div>
            </div>
        </div>
    `).join('');
}

function renderCart() {
    cartItems.innerHTML = cart.map(item => `
        <div class="cart-item">
            <img src="${item.image}" alt="${item.name}" class="cart-item-image">
            <div class="cart-item-details">
                <h4 class="cart-item-name">${item.name}</h4>
                <p class="cart-item-price">₹${item.price}</p>
                ${item.size ? `<p class="cart-item-size">Size: ${item.size}</p>` : ''}
                <div class="cart-item-quantity">
                    <button class="quantity-btn" onclick="updateQuantity(${item.id}, ${item.quantity - 1}, '${item.size}')">-</button>
                    <span>${item.quantity}</span>
                    <button class="quantity-btn" onclick="updateQuantity(${item.id}, ${item.quantity + 1}, '${item.size}')">+</button>
                </div>
            </div>
        </div>
    `).join('');

    updateCartTotal();
}

// Filter and Sort functions
function handleFilterChange(e) {
    const { value, checked, closest } = e.target;
    const filterGroup = closest('.filter-group').querySelector('h3').textContent.toLowerCase();
    
    if (filterGroup === 'categories') {
        if (checked) {
            activeFilters.categories.push(value);
        } else {
            activeFilters.categories = activeFilters.categories.filter(cat => cat !== value);
        }
    } else if (filterGroup === 'size') {
        if (checked) {
            activeFilters.sizes.push(value.toLowerCase());
        } else {
            activeFilters.sizes = activeFilters.sizes.filter(size => size !== value.toLowerCase());
        }
    }

    applyFilters();
}

function applyFilters() {
    let filteredProducts = products.filter(product => {
        const matchesCategory = activeFilters.categories.length === 0 || 
            activeFilters.categories.includes(product.category);
        const matchesSize = activeFilters.sizes.length === 0 || 
            product.sizes.some(size => activeFilters.sizes.includes(size.toLowerCase()));
        const matchesPrice = product.price <= activeFilters.maxPrice;

        return matchesCategory && matchesSize && matchesPrice;
    });

    // Apply sorting
    filteredProducts = sortProducts(filteredProducts, currentSort);

    renderProducts(filteredProducts);
}

function sortProducts(products, sortType) {
    switch (sortType) {
        case 'price-low':
            return [...products].sort((a, b) => a.price - b.price);
        case 'price-high':
            return [...products].sort((a, b) => b.price - a.price);
        case 'newest':
            return [...products].reverse();
        default:
            return products;
    }
}

// Cart functions
function addToCart(productId) {
    const product = products.find(p => p.id === productId);
    const sizeSelect = document.querySelector(`#product-${productId} .size-select`);
    const size = sizeSelect ? sizeSelect.value : null;

    if (product.sizes.length && !size) {
        alert('Please select a size');
        return;
    }

    const existingItem = cart.find(item => item.id === productId && item.size === size);

    if (existingItem) {
        updateQuantity(productId, existingItem.quantity + 1, size);
    } else {
        cart.push({
            ...product,
            quantity: 1,
            size
        });
    }

    renderCart();
    cartPreview.classList.add('active');
}

function updateQuantity(productId, newQuantity, size = null) {
    if (newQuantity < 1) {
        cart = cart.filter(item => !(item.id === productId && item.size === size));
    } else {
        const item = cart.find(item => item.id === productId && item.size === size);
        if (item) {
            item.quantity = newQuantity;
        }
    }

    renderCart();
}

function updateCartTotal() {
    const total = cart.reduce((sum, item) => sum + (item.price * item.quantity), 0);
    totalAmount.textContent = `₹${total}`;
}

// Checkout function
document.querySelector('.checkout-btn').addEventListener('click', () => {
    if (cart.length === 0) {
        alert('Your cart is empty!');
        return;
    }
    
    // Here you would typically integrate with a payment gateway
    alert('Thank you for your purchase! This is a demo site.');
    cart = [];
    renderCart();
    cartPreview.classList.remove('active');
});