// Cart State Management
let cart = JSON.parse(localStorage.getItem('applianceHubCart')) || [];

// Update the cart badge in the header
function updateCartBadge() {
    const badge = document.getElementById('cartBadge');
    if (badge) {
        const totalItems = cart.reduce((sum, item) => sum + item.quantity, 0);
        badge.textContent = totalItems;
        if (totalItems === 0) {
            badge.style.display = 'none';
        } else {
            badge.style.display = 'flex';
        }
    }
}

// Add item to cart from product list
function addToCart(name, priceStr, imgUrl) {
    const productId = name.replace(/\s+/g, '-').toLowerCase();
    const price = parseFloat(priceStr.replace('$', ''));
    
    const existingItem = cart.find(item => item.id === productId);
    
    if (existingItem) {
        existingItem.quantity += 1;
    } else {
        cart.push({
            id: productId,
            name: name,
            price: price,
            image: imgUrl,
            quantity: 1
        });
    }
    
    localStorage.setItem('applianceHubCart', JSON.stringify(cart));
    updateCartBadge();
    updateProductCards();
    showToast(`${name} added to cart!`);
}

// Add item from Quick View Modal
function addToCartModal() {
    const title = document.getElementById('modalTitle').textContent;
    const price = document.getElementById('modalPrice').textContent;
    const img = document.getElementById('modalImg').src;
    
    addToCart(title, price, img);
    closeQuickView(); // close modal after adding
}

// Update the Add buttons to show quantity controls dynamically
function updateProductCards() {
    const addButtons = document.querySelectorAll('button[onclick^="addToCart("]');
    
    addButtons.forEach(btn => {
        if (!btn.hasAttribute('data-product-id')) {
            const match = btn.getAttribute('onclick').match(/addToCart\('(.*?)'/);
            if (match) {
                btn.setAttribute('data-product-id', match[1].replace(/\s+/g, '-').toLowerCase());
            }
        }
        
        const productId = btn.getAttribute('data-product-id');
        const item = cart.find(i => i.id === productId);
        
        if (item && item.quantity > 0) {
            let ctrl = btn.nextElementSibling;
            if (!ctrl || !ctrl.classList.contains('cart-qty-ctrl')) {
                ctrl = document.createElement('div');
                ctrl.className = 'cart-qty-ctrl flex items-center border border-hub-border dark:border-slate-700 rounded-xl overflow-hidden bg-slate-50 dark:bg-slate-900 h-[36px] w-[88px] shrink-0 justify-between';
                ctrl.innerHTML = `
                    <button onclick="updateQuantityFromCard('${productId}', -1)" class="px-2.5 h-full text-slate-500 hover:bg-slate-200 dark:hover:bg-slate-700 font-bold text-sm w-1/3 text-center">-</button>
                    <span class="text-xs font-bold qty-val w-1/3 text-center">${item.quantity}</span>
                    <button onclick="updateQuantityFromCard('${productId}', 1)" class="px-2.5 h-full text-slate-500 hover:bg-slate-200 dark:hover:bg-slate-700 font-bold text-sm w-1/3 text-center">+</button>
                `;
                btn.parentNode.insertBefore(ctrl, btn.nextSibling);
            } else {
                ctrl.querySelector('.qty-val').textContent = item.quantity;
            }
            btn.style.display = 'none';
        } else {
            btn.style.display = 'flex';
            if (btn.nextElementSibling && btn.nextElementSibling.classList.contains('cart-qty-ctrl')) {
                btn.nextElementSibling.remove();
            }
        }
    });
}

function updateQuantityFromCard(id, delta) {
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

// Simple Toast Notification
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
window.addEventListener('pageshow', (event) => {
    // Always fetch fresh cart state from localStorage in case it changed on another page (e.g. cart.html)
    cart = JSON.parse(localStorage.getItem('applianceHubCart')) || [];
    updateCartBadge();
    updateProductCards();
});
