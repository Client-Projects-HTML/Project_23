// js/theme.js
// Global Theme Manager for ApplianceHub

// 1. Immediate execution to prevent flash of wrong theme and direction
(function() {
    try {
        if (localStorage.theme === 'dark' || (!('theme' in localStorage) && window.matchMedia('(prefers-color-scheme: dark)').matches)) {
            document.documentElement.classList.add('dark');
        } else {
            document.documentElement.classList.remove('dark');
        }
        
        // Unify RTL direction across all pages
        if (localStorage.getItem('direction') === 'rtl') {
            document.documentElement.setAttribute('dir', 'rtl');
        } else {
            document.documentElement.setAttribute('dir', 'ltr');
        }
    } catch (e) {
        // Fallback
    }
})();

// Watch for manual RTL toggles to persist globally
const observer = new MutationObserver((mutations) => {
    mutations.forEach((mutation) => {
        if (mutation.attributeName === 'dir') {
            const dir = document.documentElement.getAttribute('dir');
            try { localStorage.setItem('direction', dir); } catch(e){}
            // Sync with admin dashboard's specific key if needed
            try { localStorage.setItem('adminDir', dir); } catch(e){}
        }
    });
});
observer.observe(document.documentElement, { attributes: true, attributeFilter: ['dir'] });
(function injectAnimationCSS() {
    const alreadyLinked = [...document.querySelectorAll('link[rel="stylesheet"]')]
        .some(l => l.href && l.href.includes('animations.css'));
    if (!alreadyLinked) {
        const link = document.createElement('link');
        link.rel = 'stylesheet';
        // Resolve relative path based on current page location
        const depth = (window.location.pathname.match(/\//g) || []).length - 1;
        const prefix = depth > 1 ? '../'.repeat(depth - 1) : '';
        link.href = prefix + 'css/animations.css';
        document.head.appendChild(link);
    }
})();

// 3. Define the global toggle function
window.appThemeToggle = function() {
    const htmlElement = document.documentElement;
    const themeIcons = document.querySelectorAll('#themeIcon, #themeIcon-mobile, button[title="Toggle Dark/Light Mode"] i, button[title="Toggle Theme"] i');
    
    const isDark = htmlElement.classList.contains('dark');
    
    if (isDark) {
        htmlElement.classList.remove('dark');
        try { localStorage.setItem('theme', 'light'); } catch(e){}
        themeIcons.forEach(icon => {
            if (icon) icon.setAttribute('data-lucide', 'moon');
        });
    } else {
        htmlElement.classList.add('dark');
        try { localStorage.setItem('theme', 'dark'); } catch(e){}
        themeIcons.forEach(icon => {
            if (icon) icon.setAttribute('data-lucide', 'sun');
        });
    }
    
    if (window.lucide) lucide.createIcons();
};

// Fallback for pages that don't have the inline function
window.toggleDarkMode = window.appThemeToggle;

window.toggleRTL = function() {
    const htmlElement = document.documentElement;
    if (htmlElement.getAttribute('dir') === 'rtl') {
        htmlElement.setAttribute('dir', 'ltr');
    } else {
        htmlElement.setAttribute('dir', 'rtl');
    }
};

// 4. Update icons on DOM load + inject animation engine
document.addEventListener('DOMContentLoaded', () => {
    const isDark = document.documentElement.classList.contains('dark');
    const themeIcons = document.querySelectorAll('#themeIcon, #themeIcon-mobile, button[title="Toggle Dark/Light Mode"] i, button[title="Toggle Theme"] i');
    themeIcons.forEach(icon => {
        if (icon) icon.setAttribute('data-lucide', isDark ? 'sun' : 'moon');
    });
    if (window.lucide) lucide.createIcons();

    // Auto-inject animations.js engine
    const alreadyLoaded = document.querySelector('script[src*="animations.js"]');
    if (!alreadyLoaded) {
        const script = document.createElement('script');
        const depth = (window.location.pathname.match(/\//g) || []).length - 1;
        const prefix = depth > 1 ? '../'.repeat(depth - 1) : '';
        script.src = prefix + 'js/animations.js';
        script.defer = true;
        document.body.appendChild(script);
    }
});

// 5. Global Toast Notification System
window.showToast = function(message, icon = 'check-circle') {
    // Check if toast container exists, if not create it
    let toastContainer = document.getElementById('hub-toast-container');
    if (!toastContainer) {
        toastContainer = document.createElement('div');
        toastContainer.id = 'hub-toast-container';
        // Position at bottom center
        toastContainer.className = 'fixed bottom-6 left-1/2 transform -translate-x-1/2 z-[9999] flex flex-col gap-2 pointer-events-none items-center';
        document.body.appendChild(toastContainer);
    }

    // Create toast element
    const toast = document.createElement('div');
    toast.className = 'bg-slate-900 dark:bg-white text-white dark:text-slate-900 px-6 py-4 rounded-full shadow-2xl flex items-center gap-3 transform translate-y-10 opacity-0 transition-all duration-300 pointer-events-auto shadow-slate-900/20';
    
    // Icon color (emerald for success/default, others can be passed if needed)
    let iconColor = 'text-emerald-500';
    if(icon === 'shopping-bag') iconColor = 'text-hub-blue';
    if(icon === 'alert-circle') iconColor = 'text-rose-500';

    toast.innerHTML = `
        <i data-lucide="${icon}" class="w-5 h-5 ${iconColor}"></i>
        <span class="text-[13px] font-bold tracking-wide">${message}</span>
    `;

    toastContainer.appendChild(toast);
    if (window.lucide) lucide.createIcons();

    // Animate in
    requestAnimationFrame(() => {
        toast.classList.remove('translate-y-10', 'opacity-0');
    });

    // Remove after 3 seconds
    setTimeout(() => {
        toast.classList.add('translate-y-10', 'opacity-0');
        setTimeout(() => {
            toast.remove();
        }, 300); // Wait for transition
    }, 3000);
};

