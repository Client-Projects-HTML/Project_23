// Cart State Management
let cart = JSON.parse(localStorage.getItem('applianceHubCart')) || [];

function updateCartBadge() {
    const badges = document.querySelectorAll('#cartBadge, #cartBadgeMobile, .cart-badge-indicator');
    const totalItems = cart.reduce((sum, item) => sum + (item.quantity || 1), 0);
    badges.forEach(badge => {
        badge.textContent = totalItems;
        if (totalItems === 0) {
            badge.style.display = 'none';
        } else {
            badge.style.display = 'flex';
        }
    });
}

// Add item to cart from product list
function addToCart(name, priceInput, imgUrl) {
    cart = JSON.parse(localStorage.getItem('applianceHubCart')) || [];
    const productId = name.replace(/\s+/g, '-').toLowerCase();
    
    let price = 0;
    if (typeof priceInput === 'number') {
        price = priceInput;
    } else if (typeof priceInput === 'string') {
        price = parseFloat(priceInput.replace(/[^0-9.]/g, '')) || 0;
    }
    
    const image = imgUrl || 'https://images.unsplash.com/photo-1584622650111-993a426fbf0a?q=80&w=200&auto=format&fit=crop';
    
    const existingItem = cart.find(item => item.id === productId || item.name === name);
    
    if (existingItem) {
        existingItem.quantity += 1;
    } else {
        cart.push({
            id: productId,
            name: name,
            price: price,
            image: image,
            quantity: 1
        });
    }
    
    localStorage.setItem('applianceHubCart', JSON.stringify(cart));
    updateCartBadge();
    if (typeof updateProductCards === 'function') updateProductCards();
    
    if (window.showToast) {
        window.showToast(`${name} added to cart!`, 'shopping-bag');
    } else {
        showToast(`${name} added to cart!`);
    }
}

window.addToCart = addToCart;

// Add item from Quick View Modal
function addToCartModal() {
    const title = document.getElementById('modalTitle')?.textContent || 'Appliance Product';
    const price = document.getElementById('modalPrice')?.textContent || '$0.00';
    const img = document.getElementById('modalImg')?.src || '';
    
    addToCart(title, price, img);
    if (typeof closeQuickView === 'function') closeQuickView();
}

// Ensure the blue "Add" button stays visible
function updateProductCards() {
    const addButtons = document.querySelectorAll('button[onclick^="addToCart("]');
    
    addButtons.forEach(btn => {
        if (!btn.hasAttribute('data-product-id')) {
            const match = btn.getAttribute('onclick')?.match(/addToCart\('(.*?)'/);
            if (match) {
                btn.setAttribute('data-product-id', match[1].replace(/\s+/g, '-').toLowerCase());
            }
        }
        
        btn.style.display = 'inline-flex';
        if (btn.nextElementSibling && btn.nextElementSibling.classList.contains('cart-qty-ctrl')) {
            btn.nextElementSibling.remove();
        }
    });
}

function updateQuantityFromCard(id, delta) {
    cart = JSON.parse(localStorage.getItem('applianceHubCart')) || [];
    const item = cart.find(i => i.id === id);
    if (item) {
        item.quantity += delta;
        if (item.quantity <= 0) {
            cart = cart.filter(i => i.id !== id);
        }
        localStorage.setItem('applianceHubCart', JSON.stringify(cart));
        updateCartBadge();
        updateProductCards();
        if (typeof renderCart === 'function') renderCart();
    }
}

// Simple Toast Notification Fallback
function showToast(message) {
    let toastContainer = document.getElementById('toast-container');
    if (!toastContainer) {
        toastContainer = document.createElement('div');
        toastContainer.id = 'toast-container';
        toastContainer.className = 'fixed bottom-4 right-4 z-50 flex flex-col gap-2';
        document.body.appendChild(toastContainer);
    }

    const toast = document.createElement('div');
    toast.className = 'bg-slate-900 text-white px-4 py-3 rounded-xl shadow-lg text-xs font-bold flex items-center gap-2 transform transition-all duration-300 translate-y-0 opacity-100';
    toast.innerHTML = `<svg class="w-4 h-4 text-emerald-400" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M5 13l4 4L19 7"></path></svg> ${message}`;
    
    toastContainer.appendChild(toast);
    
    setTimeout(() => {
        toast.classList.remove('translate-y-0', 'opacity-100');
        toast.classList.add('translate-y-10', 'opacity-0');
        setTimeout(() => toast.remove(), 300);
    }, 3000);
}

// Initialize and refresh on page load or when returning via back button
window.addEventListener('pageshow', () => {
    cart = JSON.parse(localStorage.getItem('applianceHubCart')) || [];
    updateCartBadge();
    updateProductCards();
});

document.addEventListener('DOMContentLoaded', () => {
    cart = JSON.parse(localStorage.getItem('applianceHubCart')) || [];
    updateCartBadge();
    updateProductCards();
});
