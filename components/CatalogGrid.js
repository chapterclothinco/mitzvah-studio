'use client';

import { useState, useMemo } from 'react';
import catalogData from '@/data/catalog.json';

function getGarmentSVG(type) {
  const svgs = {
    't-shirt': (
      <svg viewBox="0 0 120 120" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
        <path d="M35 30L20 40L28 55L35 48V95H85V48L92 55L100 40L85 30" />
        <path d="M35 30C35 30 45 42 60 42C75 42 85 30 85 30" />
      </svg>
    ),
    'tank-top': (
      <svg viewBox="0 0 120 120" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
        <path d="M40 25C40 25 48 35 60 35C72 35 80 25 80 25" />
        <path d="M40 25L38 45L38 95H82V45L80 25" />
      </svg>
    ),
    'crop-top': (
      <svg viewBox="0 0 120 120" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
        <path d="M35 30L20 40L28 55L35 48V72H85V48L92 55L100 40L85 30" />
        <path d="M35 30C35 30 45 42 60 42C75 42 85 30 85 30" />
        <line x1="35" y1="72" x2="85" y2="72" strokeDasharray="4 3" />
      </svg>
    ),
    'hoodie': (
      <svg viewBox="0 0 120 120" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
        <path d="M35 30L18 42L27 58L35 50V95H85V50L93 58L102 42L85 30" />
        <path d="M35 30C35 30 45 42 60 42C75 42 85 30 85 30" />
        <path d="M50 42V60C50 60 52 65 60 65C68 65 70 60 70 60V42" />
        <rect x="45" y="70" width="30" height="18" rx="3" />
      </svg>
    ),
    'sweatshirt': (
      <svg viewBox="0 0 120 120" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
        <path d="M35 30L18 42L27 58L35 50V95H85V50L93 58L102 42L85 30" />
        <path d="M35 30C35 30 45 42 60 42C75 42 85 30 85 30" />
        <path d="M35 80H85" strokeDasharray="4 3" />
      </svg>
    ),
    'polo': (
      <svg viewBox="0 0 120 120" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
        <path d="M35 30L20 40L28 55L35 48V95H85V48L92 55L100 40L85 30" />
        <path d="M35 30C35 30 45 40 60 40C75 40 85 30 85 30" />
        <path d="M55 30V50" />
        <path d="M65 30V50" />
        <circle cx="60" cy="37" r="2" />
        <circle cx="60" cy="45" r="2" />
      </svg>
    ),
    'jacket': (
      <svg viewBox="0 0 120 120" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
        <path d="M35 28L18 40L27 56L35 48V95H85V48L93 56L102 40L85 28" />
        <path d="M35 28C35 28 45 40 60 40C75 40 85 28 85 28" />
        <line x1="60" y1="40" x2="60" y2="95" />
        <rect x="40" y="70" width="14" height="14" rx="2" />
        <rect x="66" y="70" width="14" height="14" rx="2" />
      </svg>
    ),
    'shorts': (
      <svg viewBox="0 0 120 120" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
        <path d="M30 30H90V50C90 50 90 60 82 72L72 88H64L60 65L56 88H48L38 72C30 60 30 50 30 50V30Z" />
        <path d="M30 38H90" strokeDasharray="4 3" />
      </svg>
    ),
    'joggers': (
      <svg viewBox="0 0 120 120" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
        <path d="M35 20H85V40C85 40 85 55 80 70L75 100H65L60 55L55 100H45L40 70C35 55 35 40 35 40V20Z" />
        <path d="M35 28H85" strokeDasharray="4 3" />
        <path d="M43 95H77" opacity="0.5" />
      </svg>
    ),
    'hat': (
      <svg viewBox="0 0 120 120" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
        <ellipse cx="60" cy="70" rx="40" ry="10" />
        <path d="M25 70C25 70 28 35 60 35C92 35 95 70 95 70" />
        <path d="M20 70L60 75" />
        <rect x="50" y="35" width="20" height="8" rx="4" />
      </svg>
    ),
    'tote-bag': (
      <svg viewBox="0 0 120 120" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
        <rect x="28" y="45" width="64" height="55" rx="4" />
        <path d="M45 45V32C45 32 45 20 60 20C75 20 75 32 75 32V45" />
      </svg>
    ),
    'pajama-set': (
      <svg viewBox="0 0 120 120" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
        <path d="M40 15L30 22L35 32L40 28V52H55V28L50 32" />
        <path d="M65 15L75 22L70 32L65 28V52H80V28L85 32" />
        <path d="M40 15C40 15 44 22 47.5 22C51 22 55 15 55 15" />
        <path d="M65 15C65 15 69 22 72.5 22C76 22 80 15 80 15" />
        <path d="M35 60H55V85C55 85 55 92 52 100H48L45 75L42 100H38C35 92 35 85 35 85V60Z" />
        <path d="M65 60H85V85C85 85 85 92 82 100H78L75 75L72 100H68C65 92 65 85 65 85V60Z" />
      </svg>
    ),
    'sleep-mask': (
      <svg viewBox="0 0 120 120" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
        <path d="M20 55C20 45 30 38 45 38C52 38 57 42 60 45C63 42 68 38 75 38C90 38 100 45 100 55C100 65 90 75 75 75C68 75 63 70 60 67C57 70 52 75 45 75C30 75 20 65 20 55Z" />
        <path d="M15 52L20 55" strokeDasharray="3 3" />
        <path d="M100 55L105 52" strokeDasharray="3 3" />
        <ellipse cx="43" cy="57" rx="8" ry="6" opacity="0.3" />
        <ellipse cx="77" cy="57" rx="8" ry="6" opacity="0.3" />
      </svg>
    ),
    'robe': (
      <svg viewBox="0 0 120 120" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
        <path d="M40 25L35 100H50L55 60L60 45L65 60L70 100H85L80 25" />
        <path d="M40 25C40 25 48 35 60 35C72 35 80 25 80 25" />
        <path d="M45 55L75 55" />
        <path d="M48 55L45 70H75L72 55" />
      </svg>
    ),
    'socks': (
      <svg viewBox="0 0 120 120" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
        <path d="M40 20H55V70C55 70 55 85 65 92C75 99 85 95 85 85C85 75 75 70 65 70H55" />
        <path d="M40 30H55" strokeDasharray="3 3" />
        <path d="M40 20H55" />
      </svg>
    ),
  };
  return svgs[type] || svgs['t-shirt'];
}

function formatMethod(method) {
  const labels = {
    'cut-and-sew': 'Cut & Sew',
    'screen-print': 'Screen Print',
    'embroidered': 'Embroidered',
  };
  return labels[method] || method;
}

export default function CatalogGrid() {
  const [activeCategory, setActiveCategory] = useState('all');
  const [method, setMethod] = useState('all');
  const [price, setPrice] = useState('all');
  const [search, setSearch] = useState('');

  const filtered = useMemo(() => {
    let result = catalogData;

    if (activeCategory !== 'all') {
      result = result.filter((p) => p.category === activeCategory);
    }

    if (method !== 'all') {
      result = result.filter((p) => p.productionMethod === method);
    }

    if (price !== 'all') {
      const [min, max] = price.split('-').map(Number);
      result = result.filter((p) => p.priceMin >= min && p.priceMin < max);
    }

    if (search) {
      const term = search.toLowerCase();
      result = result.filter(
        (p) =>
          p.name.toLowerCase().includes(term) ||
          p.description.toLowerCase().includes(term)
      );
    }

    return result;
  }, [activeCategory, method, price, search]);

  const clearFilters = () => {
    setActiveCategory('all');
    setMethod('all');
    setPrice('all');
    setSearch('');
  };

  const categories = [
    { value: 'all', label: 'All', icon: <svg viewBox="0 0 16 16" fill="none" stroke="currentColor" strokeWidth="1.5"><rect x="2" y="2" width="5" height="5" rx="1"/><rect x="9" y="2" width="5" height="5" rx="1"/><rect x="2" y="9" width="5" height="5" rx="1"/><rect x="9" y="9" width="5" height="5" rx="1"/></svg> },
    { value: 'tops', label: 'Tops', icon: <svg viewBox="0 0 16 16" fill="none" stroke="currentColor" strokeWidth="1.5"><path d="M4 4L2 6L3.5 8L4 7.5V14H12V7.5L12.5 8L14 6L12 4"/><path d="M4 4C4 4 6 6 8 6C10 6 12 4 12 4"/></svg> },
    { value: 'bottoms', label: 'Bottoms', icon: <svg viewBox="0 0 16 16" fill="none" stroke="currentColor" strokeWidth="1.5"><path d="M3 3H13V6C13 6 13 8 12 10L10 14H8.5L8 10L7.5 14H6L4 10C3 8 3 6 3 6V3Z"/></svg> },
    { value: 'accessories', label: 'Accessories', icon: <svg viewBox="0 0 16 16" fill="none" stroke="currentColor" strokeWidth="1.5"><rect x="3" y="6" width="10" height="8" rx="1"/><path d="M6 6V4.5C6 4.5 6 2.5 8 2.5C10 2.5 10 4.5 10 4.5V6"/></svg> },
    { value: 'sleepwear', label: 'Sleepwear', icon: <svg viewBox="0 0 16 16" fill="none" stroke="currentColor" strokeWidth="1.5"><path d="M5 3L2 5L3 8L5 7V14H7.5L8 10L8.5 14H11V7L13 8L14 5L11 3"/><path d="M5 3C5 3 6.5 5 8 5C9.5 5 11 3 11 3"/></svg> },
  ];

  return (
    <>
      <div className="catalog-toolbar">
        <div className="catalog-category-filters">
          {categories.map((cat) => (
            <button
              key={cat.value}
              className={`cat-filter-btn${activeCategory === cat.value ? ' active' : ''}`}
              onClick={() => setActiveCategory(cat.value)}
            >
              {cat.icon}
              {cat.label}
            </button>
          ))}
        </div>
        <div className="catalog-toolbar-right">
          <select
            className="catalog-select"
            value={method}
            onChange={(e) => setMethod(e.target.value)}
          >
            <option value="all">All Methods</option>
            <option value="cut-and-sew">Cut &amp; Sew</option>
            <option value="screen-print">Screen Print</option>
            <option value="embroidered">Embroidered</option>
          </select>
          <select
            className="catalog-select"
            value={price}
            onChange={(e) => setPrice(e.target.value)}
          >
            <option value="all">All Prices</option>
            <option value="0-40">Under $40</option>
            <option value="40-70">$40&ndash;$70</option>
            <option value="70-200">$70+</option>
          </select>
          <input
            type="text"
            className="catalog-search"
            placeholder="Search products..."
            value={search}
            onChange={(e) => setSearch(e.target.value)}
          />
          <button className="clear-filters-btn" onClick={clearFilters}>
            Clear Filters
          </button>
        </div>
      </div>

      <div className="catalog-product-grid">
        {filtered.length === 0 ? (
          <div className="catalog-no-results">
            <h3>No products found</h3>
            <p>Try adjusting your filters or search term.</p>
          </div>
        ) : (
          filtered.map((product) => (
            <div key={product.id} className="catalog-card">
              <div className={`catalog-card-illustration${product.image ? ' has-image' : ''}`}>
                {product.image ? (
                  <img
                    src={product.image}
                    alt={product.imageAlt || product.name}
                    className="catalog-card-image"
                    loading="lazy"
                  />
                ) : (
                  getGarmentSVG(product.garmentType)
                )}
                {product.badge && (
                  <span className={`catalog-card-badge ${product.badge.toLowerCase()}`}>
                    {product.badge}
                  </span>
                )}
              </div>
              <div className="catalog-card-info">
                <h3>{product.name}</h3>
                <p>{product.description}</p>
                <div className="catalog-card-meta">
                  <span className="catalog-card-price">
                    ${product.priceMin}&ndash;${product.priceMax}
                  </span>
                  <span className="catalog-card-method">
                    {formatMethod(product.productionMethod)}
                  </span>
                </div>
              </div>
            </div>
          ))
        )}
      </div>

      <div className="catalog-results">
        <span className="catalog-result-count">
          {filtered.length} product{filtered.length !== 1 ? 's' : ''}
        </span>
      </div>
    </>
  );
}
