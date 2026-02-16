// ================================
// The Mitzvah Studio
// Custom Bar & Bat Mitzvah Merch
// ================================

document.addEventListener('DOMContentLoaded', () => {
    initNavbar();
    initMobileMenu();
    initSmoothScroll();
    initFAQ();
    initScrollReveal();
    initParallaxShapes();
    initCatalog();
});

// ================================
// Navbar Scroll Effect
// ================================
function initNavbar() {
    const navbar = document.querySelector('.navbar');
    if (!navbar) return;

    window.addEventListener('scroll', () => {
        if (window.pageYOffset > 50) {
            navbar.classList.add('scrolled');
        } else {
            navbar.classList.remove('scrolled');
        }
    });
}

// ================================
// Mobile Menu
// ================================
function initMobileMenu() {
    const menuBtn = document.querySelector('.mobile-menu-btn');
    const mobileMenu = document.querySelector('.mobile-menu');
    if (!menuBtn || !mobileMenu) return;

    const mobileLinks = mobileMenu.querySelectorAll('a');

    menuBtn.addEventListener('click', () => {
        menuBtn.classList.toggle('active');
        mobileMenu.classList.toggle('active');
        document.body.style.overflow = mobileMenu.classList.contains('active') ? 'hidden' : '';
    });

    mobileLinks.forEach(link => {
        link.addEventListener('click', () => {
            menuBtn.classList.remove('active');
            mobileMenu.classList.remove('active');
            document.body.style.overflow = '';
        });
    });

    // Close on escape
    document.addEventListener('keydown', (e) => {
        if (e.key === 'Escape' && mobileMenu.classList.contains('active')) {
            menuBtn.classList.remove('active');
            mobileMenu.classList.remove('active');
            document.body.style.overflow = '';
        }
    });
}

// ================================
// Smooth Scroll
// ================================
function initSmoothScroll() {
    document.querySelectorAll('a[href^="#"]').forEach(link => {
        link.addEventListener('click', (e) => {
            const href = link.getAttribute('href');
            if (href === '#') return;

            const target = document.querySelector(href);
            if (!target) return;

            e.preventDefault();

            const offset = 80;
            const targetPosition = target.getBoundingClientRect().top + window.pageYOffset - offset;

            window.scrollTo({
                top: targetPosition,
                behavior: 'smooth'
            });
        });
    });
}

// ================================
// FAQ Accordion
// ================================
function initFAQ() {
    const faqItems = document.querySelectorAll('.faq-item');

    faqItems.forEach(item => {
        const question = item.querySelector('.faq-question');

        question.addEventListener('click', () => {
            // Close other open items
            faqItems.forEach(otherItem => {
                if (otherItem !== item && otherItem.classList.contains('active')) {
                    otherItem.classList.remove('active');
                }
            });

            // Toggle current item
            item.classList.toggle('active');
        });
    });
}

// ================================
// Scroll Reveal Animation
// ================================
function initScrollReveal() {
    const revealElements = document.querySelectorAll('.scroll-reveal');

    const observerOptions = {
        root: null,
        rootMargin: '-50px',
        threshold: 0.1
    };

    const observer = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.classList.add('visible');
                // Optionally unobserve after revealing
                // observer.unobserve(entry.target);
            }
        });
    }, observerOptions);

    revealElements.forEach(el => {
        observer.observe(el);
    });
}

// ================================
// Parallax Floating Shapes
// ================================
function initParallaxShapes() {
    const shapes = document.querySelectorAll('.shape');
    if (!shapes.length) return;

    let ticking = false;

    window.addEventListener('scroll', () => {
        if (!ticking) {
            window.requestAnimationFrame(() => {
                const scrolled = window.pageYOffset;
                shapes.forEach((shape, index) => {
                    const speed = 0.05 + (index * 0.02);
                    const yPos = scrolled * speed;
                    shape.style.transform = `translateY(${yPos}px)`;
                });
                ticking = false;
            });
            ticking = true;
        }
    });
}

// ================================
// Cursor Trail Effect (Optional - disabled by default)
// ================================
function initCursorTrail() {
    const trail = [];
    const trailLength = 10;

    for (let i = 0; i < trailLength; i++) {
        const dot = document.createElement('div');
        dot.className = 'cursor-trail';
        dot.style.cssText = `
            position: fixed;
            width: ${10 - i}px;
            height: ${10 - i}px;
            background: linear-gradient(135deg, #2563EB, #EC4899);
            border-radius: 50%;
            pointer-events: none;
            z-index: 9999;
            opacity: ${1 - (i / trailLength)};
            transition: transform 0.1s ease;
        `;
        document.body.appendChild(dot);
        trail.push(dot);
    }

    let mouseX = 0, mouseY = 0;
    const positions = [];

    document.addEventListener('mousemove', (e) => {
        mouseX = e.clientX;
        mouseY = e.clientY;
    });

    function animate() {
        positions.unshift({ x: mouseX, y: mouseY });
        if (positions.length > trailLength) positions.pop();

        trail.forEach((dot, index) => {
            const pos = positions[index] || positions[positions.length - 1];
            if (pos) {
                dot.style.left = pos.x + 'px';
                dot.style.top = pos.y + 'px';
            }
        });

        requestAnimationFrame(animate);
    }

    animate();
}

// ================================
// Button Ripple Effect
// ================================
document.querySelectorAll('.btn').forEach(button => {
    button.addEventListener('click', function(e) {
        const rect = this.getBoundingClientRect();
        const ripple = document.createElement('span');

        ripple.style.cssText = `
            position: absolute;
            width: 20px;
            height: 20px;
            background: rgba(255, 255, 255, 0.5);
            border-radius: 50%;
            transform: scale(0);
            animation: ripple 0.6s ease-out;
            pointer-events: none;
            left: ${e.clientX - rect.left - 10}px;
            top: ${e.clientY - rect.top - 10}px;
        `;

        this.style.position = 'relative';
        this.style.overflow = 'hidden';
        this.appendChild(ripple);

        setTimeout(() => ripple.remove(), 600);
    });
});

// Add ripple keyframes
const style = document.createElement('style');
style.textContent = `
    @keyframes ripple {
        to {
            transform: scale(20);
            opacity: 0;
        }
    }
`;
document.head.appendChild(style);

// ================================
// Magnetic Button Effect
// ================================
document.querySelectorAll('.nav-cta, .btn-primary').forEach(button => {
    button.addEventListener('mousemove', function(e) {
        const rect = this.getBoundingClientRect();
        const x = e.clientX - rect.left - rect.width / 2;
        const y = e.clientY - rect.top - rect.height / 2;

        this.style.transform = `translate(${x * 0.1}px, ${y * 0.1}px)`;
    });

    button.addEventListener('mouseleave', function() {
        this.style.transform = '';
    });
});

// ================================
// Typing Effect for Hero (Optional)
// ================================
function typeWriter(element, text, speed = 50) {
    let i = 0;
    element.innerHTML = '';

    function type() {
        if (i < text.length) {
            element.innerHTML += text.charAt(i);
            i++;
            setTimeout(type, speed);
        }
    }

    type();
}

// ================================
// Product Catalog
// ================================
function initCatalog() {
    const grid = document.getElementById('catalogProductGrid');
    if (!grid) return;

    const catalogPath = grid.dataset.catalogPath || 'data/catalog.json';

    fetch(catalogPath)
        .then(res => res.json())
        .then(products => {
            const filters = { category: 'all', method: 'all', price: 'all', search: '' };
            initCatalogFilters(products, grid, filters);
            renderCatalogProducts(products, grid, filters);
        })
        .catch(err => {
            console.error('Failed to load catalog:', err);
            grid.innerHTML = '<div class="catalog-no-results"><h3>Unable to load catalog</h3><p>Please try refreshing the page.</p></div>';
        });
}

function initCatalogFilters(products, grid, filters) {
    // Category buttons
    document.querySelectorAll('.cat-filter-btn').forEach(btn => {
        btn.addEventListener('click', () => {
            document.querySelectorAll('.cat-filter-btn').forEach(b => b.classList.remove('active'));
            btn.classList.add('active');
            filters.category = btn.dataset.category;
            renderCatalogProducts(products, grid, filters);
        });
    });

    // Method filter
    const methodFilter = document.getElementById('methodFilter');
    if (methodFilter) {
        methodFilter.addEventListener('change', () => {
            filters.method = methodFilter.value;
            renderCatalogProducts(products, grid, filters);
        });
    }

    // Price filter
    const priceFilter = document.getElementById('priceFilter');
    if (priceFilter) {
        priceFilter.addEventListener('change', () => {
            filters.price = priceFilter.value;
            renderCatalogProducts(products, grid, filters);
        });
    }

    // Search
    const searchInput = document.getElementById('catalogSearch');
    if (searchInput) {
        searchInput.addEventListener('input', () => {
            filters.search = searchInput.value.toLowerCase();
            renderCatalogProducts(products, grid, filters);
        });
    }

    // Clear filters
    const clearBtn = document.getElementById('clearFilters');
    if (clearBtn) {
        clearBtn.addEventListener('click', () => {
            filters.category = 'all';
            filters.method = 'all';
            filters.price = 'all';
            filters.search = '';
            document.querySelectorAll('.cat-filter-btn').forEach(b => b.classList.remove('active'));
            const allBtn = document.querySelector('.cat-filter-btn[data-category="all"]');
            if (allBtn) allBtn.classList.add('active');
            if (methodFilter) methodFilter.value = 'all';
            if (priceFilter) priceFilter.value = 'all';
            if (searchInput) searchInput.value = '';
            renderCatalogProducts(products, grid, filters);
        });
    }
}

function renderCatalogProducts(products, grid, filters) {
    let filtered = products;

    if (filters.category !== 'all') {
        filtered = filtered.filter(p => p.category === filters.category);
    }

    if (filters.method !== 'all') {
        filtered = filtered.filter(p => p.productionMethod === filters.method);
    }

    if (filters.price !== 'all') {
        const [min, max] = filters.price.split('-').map(Number);
        filtered = filtered.filter(p => p.priceMin >= min && p.priceMin < max);
    }

    if (filters.search) {
        filtered = filtered.filter(p =>
            p.name.toLowerCase().includes(filters.search) ||
            p.description.toLowerCase().includes(filters.search)
        );
    }

    const resultCount = document.getElementById('resultCount');
    if (resultCount) {
        resultCount.textContent = `${filtered.length} product${filtered.length !== 1 ? 's' : ''}`;
    }

    if (filtered.length === 0) {
        grid.innerHTML = '<div class="catalog-no-results"><h3>No products found</h3><p>Try adjusting your filters or search term.</p></div>';
        return;
    }

    grid.innerHTML = filtered.map(product => {
        const badgeHTML = product.badge
            ? `<span class="catalog-card-badge ${product.badge.toLowerCase()}">${product.badge}</span>`
            : '';

        const imageHTML = product.image
            ? `<img src="${product.image}" alt="${product.imageAlt || product.name}" class="catalog-card-image" loading="lazy">`
            : getGarmentSVG(product.garmentType);

        return `
            <div class="catalog-card">
                <div class="catalog-card-illustration${product.image ? ' has-image' : ''}">
                    ${imageHTML}
                    ${badgeHTML}
                </div>
                <div class="catalog-card-info">
                    <h3>${product.name}</h3>
                    <p>${product.description}</p>
                    <div class="catalog-card-meta">
                        <span class="catalog-card-price">$${product.priceMin}–$${product.priceMax}</span>
                        <span class="catalog-card-method">${formatMethod(product.productionMethod)}</span>
                    </div>
                </div>
            </div>
        `;
    }).join('');
}

function formatMethod(method) {
    const labels = {
        'cut-and-sew': 'Cut & Sew',
        'screen-print': 'Screen Print',
        'embroidered': 'Embroidered'
    };
    return labels[method] || method;
}

function getGarmentSVG(type) {
    const svgs = {
        't-shirt': `<svg viewBox="0 0 120 120" fill="none" stroke="currentColor" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round">
            <path d="M35 30L20 40L28 55L35 48V95H85V48L92 55L100 40L85 30"/>
            <path d="M35 30C35 30 45 42 60 42C75 42 85 30 85 30"/>
        </svg>`,
        'tank-top': `<svg viewBox="0 0 120 120" fill="none" stroke="currentColor" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round">
            <path d="M40 25C40 25 48 35 60 35C72 35 80 25 80 25"/>
            <path d="M40 25L38 45L38 95H82V45L80 25"/>
        </svg>`,
        'crop-top': `<svg viewBox="0 0 120 120" fill="none" stroke="currentColor" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round">
            <path d="M35 30L20 40L28 55L35 48V72H85V48L92 55L100 40L85 30"/>
            <path d="M35 30C35 30 45 42 60 42C75 42 85 30 85 30"/>
            <line x1="35" y1="72" x2="85" y2="72" stroke-dasharray="4 3"/>
        </svg>`,
        'hoodie': `<svg viewBox="0 0 120 120" fill="none" stroke="currentColor" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round">
            <path d="M35 30L18 42L27 58L35 50V95H85V50L93 58L102 42L85 30"/>
            <path d="M35 30C35 30 45 42 60 42C75 42 85 30 85 30"/>
            <path d="M50 42V60C50 60 52 65 60 65C68 65 70 60 70 60V42"/>
            <rect x="45" y="70" width="30" height="18" rx="3"/>
        </svg>`,
        'sweatshirt': `<svg viewBox="0 0 120 120" fill="none" stroke="currentColor" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round">
            <path d="M35 30L18 42L27 58L35 50V95H85V50L93 58L102 42L85 30"/>
            <path d="M35 30C35 30 45 42 60 42C75 42 85 30 85 30"/>
            <path d="M35 80H85" stroke-dasharray="4 3"/>
        </svg>`,
        'polo': `<svg viewBox="0 0 120 120" fill="none" stroke="currentColor" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round">
            <path d="M35 30L20 40L28 55L35 48V95H85V48L92 55L100 40L85 30"/>
            <path d="M35 30C35 30 45 40 60 40C75 40 85 30 85 30"/>
            <path d="M55 30V50"/>
            <path d="M65 30V50"/>
            <circle cx="60" cy="37" r="2"/>
            <circle cx="60" cy="45" r="2"/>
        </svg>`,
        'jacket': `<svg viewBox="0 0 120 120" fill="none" stroke="currentColor" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round">
            <path d="M35 28L18 40L27 56L35 48V95H85V48L93 56L102 40L85 28"/>
            <path d="M35 28C35 28 45 40 60 40C75 40 85 28 85 28"/>
            <line x1="60" y1="40" x2="60" y2="95"/>
            <path d="M42 60L52 60" stroke-dasharray="0"/>
            <rect x="40" y="70" width="14" height="14" rx="2"/>
            <rect x="66" y="70" width="14" height="14" rx="2"/>
        </svg>`,
        'shorts': `<svg viewBox="0 0 120 120" fill="none" stroke="currentColor" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round">
            <path d="M30 30H90V50C90 50 90 60 82 72L72 88H64L60 65L56 88H48L38 72C30 60 30 50 30 50V30Z"/>
            <path d="M30 38H90" stroke-dasharray="4 3"/>
        </svg>`,
        'joggers': `<svg viewBox="0 0 120 120" fill="none" stroke="currentColor" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round">
            <path d="M35 20H85V40C85 40 85 55 80 70L75 100H65L60 55L55 100H45L40 70C35 55 35 40 35 40V20Z"/>
            <path d="M35 28H85" stroke-dasharray="4 3"/>
            <path d="M43 95H77" opacity="0.5"/>
        </svg>`,
        'hat': `<svg viewBox="0 0 120 120" fill="none" stroke="currentColor" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round">
            <ellipse cx="60" cy="70" rx="40" ry="10"/>
            <path d="M25 70C25 70 28 35 60 35C92 35 95 70 95 70"/>
            <path d="M20 70L60 75"/>
            <rect x="50" y="35" width="20" height="8" rx="4"/>
        </svg>`,
        'tote-bag': `<svg viewBox="0 0 120 120" fill="none" stroke="currentColor" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round">
            <rect x="28" y="45" width="64" height="55" rx="4"/>
            <path d="M45 45V32C45 32 45 20 60 20C75 20 75 32 75 32V45"/>
        </svg>`,
        'pajama-set': `<svg viewBox="0 0 120 120" fill="none" stroke="currentColor" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round">
            <path d="M40 15L30 22L35 32L40 28V52H55V28L50 32"/>
            <path d="M65 15L75 22L70 32L65 28V52H80V28L85 32"/>
            <path d="M40 15C40 15 44 22 47.5 22C51 22 55 15 55 15"/>
            <path d="M65 15C65 15 69 22 72.5 22C76 22 80 15 80 15"/>
            <path d="M35 60H55V85C55 85 55 92 52 100H48L45 75L42 100H38C35 92 35 85 35 85V60Z"/>
            <path d="M65 60H85V85C85 85 85 92 82 100H78L75 75L72 100H68C65 92 65 85 65 85V60Z"/>
        </svg>`,
        'sleep-mask': `<svg viewBox="0 0 120 120" fill="none" stroke="currentColor" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round">
            <path d="M20 55C20 45 30 38 45 38C52 38 57 42 60 45C63 42 68 38 75 38C90 38 100 45 100 55C100 65 90 75 75 75C68 75 63 70 60 67C57 70 52 75 45 75C30 75 20 65 20 55Z"/>
            <path d="M15 52L20 55" stroke-dasharray="3 3"/>
            <path d="M100 55L105 52" stroke-dasharray="3 3"/>
            <ellipse cx="43" cy="57" rx="8" ry="6" opacity="0.3"/>
            <ellipse cx="77" cy="57" rx="8" ry="6" opacity="0.3"/>
        </svg>`,
        'robe': `<svg viewBox="0 0 120 120" fill="none" stroke="currentColor" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round">
            <path d="M40 25L35 100H50L55 60L60 45L65 60L70 100H85L80 25"/>
            <path d="M40 25C40 25 48 35 60 35C72 35 80 25 80 25"/>
            <path d="M45 55L75 55"/>
            <path d="M48 55L45 70H75L72 55"/>
        </svg>`,
        'socks': `<svg viewBox="0 0 120 120" fill="none" stroke="currentColor" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round">
            <path d="M40 20H55V70C55 70 55 85 65 92C75 99 85 95 85 85C85 75 75 70 65 70H55"/>
            <path d="M40 30H55" stroke-dasharray="3 3"/>
            <path d="M40 20H55" />
        </svg>`
    };
    return svgs[type] || svgs['t-shirt'];
}
