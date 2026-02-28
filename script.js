// Mock Data: Categories
const categories = [
    { id: 'cat1', name: 'School Books', icon: 'fa-book-open', desc: 'Pre-Nursery to 10th Class', filter: 'school' },
    { id: 'cat2', name: 'College Books', icon: 'fa-graduation-cap', desc: 'FSc, ICS, FA, ICom', filter: 'college' },
    { id: 'cat3', name: 'Stationery', icon: 'fa-pen-ruler', desc: 'Pens, Notebooks, Geometry', filter: 'stationery' },
    { id: 'cat4', name: 'Complete Sets', icon: 'fa-layer-group', desc: 'Full year book bundles', filter: 'sets' }
];

// Data: Products (from localStorage or default)
function getProducts() {
    const stored = localStorage.getItem('alqalam_products');
    if (stored) return JSON.parse(stored);

    const defaultProducts = [
        { id: 'p1', title: 'Complete 9th Class Science Set (PTB)', category: 'school', price: 4500, oldPrice: 5000, stock: 45, img: 'https://images.unsplash.com/photo-1544947950-fa07a98d237f?ixlib=rb-4.0.3&auto=format&fit=crop&w=400&q=80', badge: 'Best Seller' },
        { id: 'p2', title: 'FSc Part 1 Physics (Punjab Text Book)', category: 'college', price: 850, oldPrice: null, stock: 12, img: 'https://images.unsplash.com/photo-1614036417651-efe5912149d8?ixlib=rb-4.0.3&auto=format&fit=crop&w=400&q=80', badge: null },
        { id: 'p3', title: 'Premium Geometry Box', category: 'stationery', price: 450, oldPrice: 550, stock: 150, img: 'https://images.unsplash.com/photo-1594246830573-05b1c57e62d4?ixlib=rb-4.0.3&auto=format&fit=crop&w=400&q=80', badge: 'Sale 18% Off' },
        { id: 'p4', title: '10th Class Mathematics (Science Group)', category: 'school', price: 650, oldPrice: null, stock: 30, img: 'https://images.unsplash.com/photo-1509228468518-180dd4864904?ixlib=rb-4.0.3&auto=format&fit=crop&w=400&q=80', badge: null },
        { id: 'p5', title: 'ICS Part 2 Computer Science', category: 'college', price: 900, oldPrice: 950, stock: 25, img: 'https://images.unsplash.com/photo-1517694712202-14dd9538aa97?ixlib=rb-4.0.3&auto=format&fit=crop&w=400&q=80', badge: null },
        { id: 'p6', title: 'A4 Size Register (400 Pages)', category: 'stationery', price: 350, oldPrice: null, stock: 150, img: 'https://images.unsplash.com/photo-1531346878377-a5be20888e57?ixlib=rb-4.0.3&auto=format&fit=crop&w=400&q=80', badge: 'Popular' },
        { id: 'p7', title: '8th Class Complete Set', category: 'school', price: 3800, oldPrice: 4200, stock: 40, img: 'https://images.unsplash.com/photo-1532012197267-da84d127e765?ixlib=rb-4.0.3&auto=format&fit=crop&w=400&q=80', badge: null },
        { id: 'p8', title: 'Blue Ink Pens (Pack of 10)', category: 'stationery', price: 200, oldPrice: 250, stock: 5, img: 'https://images.unsplash.com/photo-1585336261022-680e295ce3fe?ixlib=rb-4.0.3&auto=format&fit=crop&w=400&q=80', badge: null }
    ];
    localStorage.setItem('alqalam_products', JSON.stringify(defaultProducts));
    return defaultProducts;
}

let products = getProducts();

// Mock Data: Reviews
const reviews = [
    { id: 'r1', name: 'Ali Raza', type: 'Parent', text: 'Hamid bhai always provides the complete set for my kids. I never have to go to Lahore for books. Highly recommended local shop.', rating: 5 },
    { id: 'r2', name: 'Sara Ahmed', type: 'FSc Student', text: 'Got all my ICS part 1 books at a great discount. The home delivery was super fast. Very professional service.', rating: 5 },
    { id: 'r3', name: 'Muhammad Usman', type: 'Teacher', text: 'I refer all my students to Al Qalam. They have genuine Punjab Text Board books and their stationery quality is premium.', rating: 4 }
];

// Cart State
let cart = [];

// DOM Elements
const header = document.getElementById('header');
const mobileMenuBtn = document.getElementById('mobileMenuBtn');
const navMenu = document.getElementById('navMenu');
const categoriesContainer = document.getElementById('categoriesContainer');
const productsContainer = document.getElementById('productsContainer');
const filterBtns = document.querySelectorAll('.filter-btn');
const reviewsContainer = document.getElementById('reviewsContainer');

const cartBtn = document.getElementById('cartBtn');
const cartCount = document.getElementById('cartCount');
const cartOverlay = document.getElementById('cartOverlay');
const cartSidebar = document.getElementById('cartSidebar');
const closeCartBtn = document.getElementById('closeCartBtn');
const cartItemsContainer = document.getElementById('cartItemsContainer');
const cartTotalPrice = document.getElementById('cartTotalPrice');

// Initialize App
document.addEventListener('DOMContentLoaded', () => {
    // Header Scroll Effect
    window.addEventListener('scroll', () => {
        if (window.scrollY > 50) {
            header.style.padding = '10px 0';
            header.style.boxShadow = 'var(--shadow-md)';
        } else {
            header.style.padding = '15px 0';
            header.style.boxShadow = 'var(--shadow-sm)';
        }
    });

    // Check announcement
    const announcement = localStorage.getItem('alqalam_announcement');
    if (announcement && announcement.trim() !== '') {
        const banner = document.getElementById('announcementBanner');
        const content = document.getElementById('announcementContent');
        if (banner && content) {
            content.textContent = announcement;
            banner.style.display = 'block';
        }
    }

    // Check custom About Us
    const customAbout = localStorage.getItem('alqalam_about_us');
    if (customAbout && customAbout.trim() !== '') {
        const aboutContent = document.getElementById('aboutUsContent');
        if (aboutContent) {
            // we split by new lines to keep paragraph formatting
            aboutContent.innerHTML = customAbout.split('\n')
                .filter(p => p.trim() !== '')
                .map(p => `<p>${p}</p>`)
                .join('');
        }
    }

    // Check custom Owner Image
    const customOwnerImg = localStorage.getItem('alqalam_owner_image');
    if (customOwnerImg && customOwnerImg.trim() !== '') {
        const ownerImgElem = document.getElementById('ownerImage');
        if (ownerImgElem) {
            ownerImgElem.src = customOwnerImg;
        }
    }

    // Load Site Customization Settings
    const siteSettings = JSON.parse(localStorage.getItem('alqalam_site_settings'));
    if (siteSettings) {
        // General
        const _loc = document.getElementById('storeLocationText');
        if (_loc && siteSettings.location) _loc.innerHTML = `<i class="fa-solid fa-location-dot"></i> ${siteSettings.location}`;

        const _logoPri = document.getElementById('storeLogoPrimary');
        if (_logoPri && siteSettings.logoPrimary) _logoPri.textContent = siteSettings.logoPrimary;

        const _logoSec = document.getElementById('storeLogoSecondary');
        if (_logoSec && siteSettings.logoSecondary) _logoSec.textContent = siteSettings.logoSecondary;

        const _fLogoPri = document.getElementById('footerLogoPrimary');
        if (_fLogoPri && siteSettings.logoPrimary) _fLogoPri.textContent = siteSettings.logoPrimary;

        const _fLogoSec = document.getElementById('footerLogoSecondary');
        if (_fLogoSec && siteSettings.logoSecondary) _fLogoSec.textContent = siteSettings.logoSecondary;

        if (siteSettings.logoImg && siteSettings.logoImg.trim() !== '') {
            // Apply Logo image and hide text/icons
            const tLogo = document.getElementById('storeLogoImg');
            if (tLogo) { tLogo.src = siteSettings.logoImg; tLogo.style.display = 'block'; }
            const tText = document.getElementById('storeLogoTextWrap');
            if (tText) tText.style.display = 'none';
            const tIcon = document.getElementById('storeLogoIcon');
            if (tIcon) tIcon.style.display = 'none';

            const fLogo = document.getElementById('footerLogoImg');
            if (fLogo) { fLogo.src = siteSettings.logoImg; fLogo.style.display = 'block'; }
            const fText = document.getElementById('footerLogoTextWrap');
            if (fText) fText.style.display = 'none';
            const fIcon = document.getElementById('footerLogoIcon');
            if (fIcon) fIcon.style.display = 'none';
        }

        // Hero
        const _hTitle = document.getElementById('heroTitle');
        if (_hTitle && siteSettings.heroTitle) _hTitle.innerHTML = siteSettings.heroTitle;
        const _hSub = document.getElementById('heroSubtitle');
        if (_hSub && siteSettings.heroSubtitle) _hSub.textContent = siteSettings.heroSubtitle;

        // Contacts & Footer
        const _fAddr = document.getElementById('footerAddress');
        if (_fAddr && siteSettings.address) _fAddr.textContent = siteSettings.address;

        const _fPhone = document.getElementById('footerPhone');
        if (_fPhone && siteSettings.phone) _fPhone.textContent = siteSettings.phone;

        const _fEmail = document.getElementById('footerEmail');
        if (_fEmail && siteSettings.email) _fEmail.textContent = siteSettings.email;

        const _fHours = document.getElementById('footerHours');
        if (_fHours && siteSettings.hours) _fHours.textContent = siteSettings.hours;

        // WhatsApp Linking
        if (siteSettings.phone) {
            // strip non-digits for whatsapp link
            const waNumber = siteSettings.phone.replace(/\D/g, '');
            const floatBtn = document.getElementById('whatsappFloatBtn');
            const footerWa = document.getElementById('footerWhatsappSocial');
            const linkUrl = `https://wa.me/${waNumber}?text=Hello!%20I%20have%20an%20inquiry.`;

            if (floatBtn) floatBtn.href = linkUrl;
            if (footerWa) footerWa.href = linkUrl;
        }
    }

    // Mobile Menu Toggle
    mobileMenuBtn.addEventListener('click', () => {
        navMenu.style.display = navMenu.style.display === 'flex' ? 'none' : 'flex';
        if (navMenu.style.display === 'flex') {
            navMenu.style.flexDirection = 'column';
            navMenu.style.position = 'absolute';
            navMenu.style.top = '100%';
            navMenu.style.left = '0';
            navMenu.style.width = '100%';
            navMenu.style.background = 'white';
            navMenu.style.padding = '20px';
            navMenu.style.boxShadow = 'var(--shadow-md)';
            navMenu.style.zIndex = '99';
        }
    });

    // Render Data
    renderCategories();
    renderProducts('all');
    renderReviews();

    // Filters Setup
    filterBtns.forEach(btn => {
        btn.addEventListener('click', (e) => {
            // Remove active class from all
            filterBtns.forEach(b => b.classList.remove('active'));
            // Add active class to clicked
            e.target.classList.add('active');

            const filterValue = e.target.getAttribute('data-filter');
            renderProducts(filterValue);
        });
    });

    // Cart Sidebar Toggles
    cartBtn.addEventListener('click', (e) => {
        e.preventDefault();
        cartSidebar.classList.add('active');
        cartOverlay.classList.add('active');
    });

    closeCartBtn.addEventListener('click', () => {
        cartSidebar.classList.remove('active');
        cartOverlay.classList.remove('active');
    });

    cartOverlay.addEventListener('click', () => {
        cartSidebar.classList.remove('active');
        cartOverlay.classList.remove('active');
    });

    // Handle checkout redirect
    const checkoutBtn = document.querySelector('.checkout-btn');
    if (checkoutBtn) {
        checkoutBtn.addEventListener('click', () => {
            if (cart.length === 0) {
                alert('Your cart is empty!');
                return;
            }
            localStorage.setItem('alQalamCart', JSON.stringify(cart));
            window.location.href = 'checkout.html';
        });
    }
});

// Render Functions
function renderCategories() {
    categoriesContainer.innerHTML = categories.map(cat => `
        <a href="#products" class="category-card" onclick="setFilter('${cat.filter}')">
            <div class="cat-icon-wrapper">
                <i class="fa-solid ${cat.icon}"></i>
            </div>
            <h3>${cat.name}</h3>
            <p>${cat.desc}</p>
        </a>
    `).join('');
}

function setFilter(filterType) {
    const btn = document.querySelector(`.filter-btn[data-filter="${filterType}"]`);
    if (btn) {
        btn.click();
    }
}

function renderProducts(filter) {
    let filteredProducts = products;
    if (filter !== 'all') {
        filteredProducts = products.filter(p => p.category === filter);
    }

    if (filteredProducts.length === 0) {
        productsContainer.innerHTML = '<p class="text-center" style="grid-column: 1/-1;">No products found in this category.</p>';
        return;
    }

    productsContainer.innerHTML = filteredProducts.map(p => `
        <div class="product-card">
            ${p.badge ? `<div class="product-badge">${p.badge}</div>` : ''}
            <div class="product-img-wrap">
                <img src="${p.img}" alt="${p.title}">
            </div>
            <div class="product-info">
                <div class="product-category">${getCategoryName(p.category)}</div>
                <h3 class="product-title">${p.title}</h3>
                <div class="product-price-row">
                    <div class="price">Rs ${p.price.toLocaleString()}</div>
                    ${p.oldPrice ? `<div class="old-price">Rs ${p.oldPrice.toLocaleString()}</div>` : ''}
                </div>
                <button class="add-to-cart-btn" onclick="addToCart('${p.id}')">
                    <i class="fa-solid fa-cart-shopping"></i> Add to Cart
                </button>
            </div>
        </div>
    `).join('');
}

function getCategoryName(id) {
    const catMap = {
        'school': 'School Books',
        'college': 'College Books',
        'stationery': 'Stationery',
        'sets': 'Complete Sets'
    };
    return catMap[id] || id;
}

function renderReviews() {
    reviewsContainer.innerHTML = reviews.map(r => `
        <div class="review-card">
            <div class="rating">
                ${'<i class="fa-solid fa-star"></i>'.repeat(Math.floor(r.rating))}
                ${r.rating % 1 !== 0 ? '<i class="fa-solid fa-star-half-stroke"></i>' : ''}
            </div>
            <p class="review-text">"${r.text}"</p>
            <div class="reviewer-info">
                <div class="reviewer-avatar">${r.name.charAt(0)}</div>
                <div>
                    <div class="reviewer-name">${r.name}</div>
                    <div class="reviewer-type">${r.type}</div>
                </div>
            </div>
        </div>
    `).join('');
}

// Cart Functionality
function addToCart(productId) {
    const product = products.find(p => p.id === productId);
    if (!product) return;

    const existingItem = cart.find(item => item.id === productId);

    if (existingItem) {
        existingItem.quantity += 1;
    } else {
        cart.push({
            ...product,
            quantity: 1
        });
    }

    updateCartUI();

    // Show visual feedback (optional: can add toast notification here later)
    cartSidebar.classList.add('active');
    cartOverlay.classList.add('active');
}

function updateCartQty(productId, delta) {
    const item = cart.find(i => i.id === productId);
    if (item) {
        item.quantity += delta;
        if (item.quantity <= 0) {
            removeFromCart(productId);
        } else {
            updateCartUI();
        }
    }
}

function removeFromCart(productId) {
    cart = cart.filter(item => item.id !== productId);
    updateCartUI();
}

function updateCartUI() {
    // Update Badge
    const totalItems = cart.reduce((sum, item) => sum + item.quantity, 0);
    cartCount.textContent = totalItems;

    // Update Sidebar
    if (cart.length === 0) {
        cartItemsContainer.innerHTML = '<div class="empty-cart-msg">Your cart is empty.</div>';
        cartTotalPrice.textContent = 'Rs 0';
        return;
    }

    cartItemsContainer.innerHTML = cart.map(item => `
        <div class="cart-item">
            <img src="${item.img}" alt="${item.title}" class="cart-item-img">
            <div class="cart-item-info">
                <div class="cart-item-title">${item.title}</div>
                <div class="cart-item-price">Rs ${item.price.toLocaleString()}</div>
                <div class="cart-qty-controls">
                    <button class="qty-btn" onclick="updateCartQty('${item.id}', -1)">-</button>
                    <span>${item.quantity}</span>
                    <button class="qty-btn" onclick="updateCartQty('${item.id}', 1)">+</button>
                </div>
            </div>
            <button class="cart-item-remove" onclick="removeFromCart('${item.id}')">
                <i class="fa-solid fa-trash"></i>
            </button>
        </div>
    `).join('');

    // Update Total
    const total = cart.reduce((sum, item) => sum + (item.price * item.quantity), 0);
    cartTotalPrice.textContent = `Rs ${total.toLocaleString()}`;
}

// Search Functionality Mock
const searchInput = document.getElementById('searchInput');
const searchSuggestions = document.getElementById('searchSuggestions');

searchInput.addEventListener('input', (e) => {
    const val = e.target.value.toLowerCase();
    if (val.length < 2) {
        searchSuggestions.style.display = 'none';
        return;
    }

    const matches = products.filter(p => p.title.toLowerCase().includes(val) || getCategoryName(p.category).toLowerCase().includes(val));

    if (matches.length > 0) {
        // Simple inline styling for suggestions for now, normally added to CSS
        searchSuggestions.style.display = 'block';
        searchSuggestions.style.position = 'absolute';
        searchSuggestions.style.top = '100%';
        searchSuggestions.style.left = '0';
        searchSuggestions.style.width = '100%';
        searchSuggestions.style.background = 'white';
        searchSuggestions.style.boxShadow = 'var(--shadow-md)';
        searchSuggestions.style.zIndex = '100';
        searchSuggestions.style.borderRadius = 'var(--radius-md)';
        searchSuggestions.style.marginTop = '10px';
        searchSuggestions.style.overflow = 'hidden';

        searchSuggestions.innerHTML = matches.slice(0, 4).map(m => `
            <div style="padding: 10px 15px; border-bottom: 1px solid var(--border-color); cursor: pointer; display: flex; align-items: center; gap: 10px;" onclick="selectSearch('${m.id}')">
                <img src="${m.img}" style="width: 30px; height: 30px; object-fit: contain;">
                <span style="font-size: 0.9rem;">${m.title}</span>
            </div>
        `).join('');
    } else {
        searchSuggestions.style.display = 'none';
    }
});

function selectSearch(id) {
    const product = products.find(p => p.id === id);
    if (product) {
        searchInput.value = product.title;
        searchSuggestions.style.display = 'none';
        setFilter(product.category);
        window.location.hash = '#products';
    }
}
