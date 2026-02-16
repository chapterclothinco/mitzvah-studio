'use client';

import { useState, useEffect, useRef, useCallback } from 'react';

// Hide global layout elements on admin page
function useHideGlobalLayout() {
  useEffect(() => {
    const navbar = document.querySelector('.navbar');
    const mobileMenu = document.querySelector('.mobile-menu');
    const footer = document.querySelector('.footer');
    const floatingShapes = document.querySelector('.floating-shapes');
    if (navbar) navbar.style.display = 'none';
    if (mobileMenu) mobileMenu.style.display = 'none';
    if (footer) footer.style.display = 'none';
    if (floatingShapes) floatingShapes.style.display = 'none';
    document.body.style.overflow = 'hidden';
    return () => {
      if (navbar) navbar.style.display = '';
      if (mobileMenu) mobileMenu.style.display = '';
      if (footer) footer.style.display = '';
      if (floatingShapes) floatingShapes.style.display = '';
      document.body.style.overflow = '';
    };
  }, []);
}

const PASSPHRASE = 'mitzvah2026';

const LS_KEY_PRODUCTS = 'mitzvah-admin-products';

const CATEGORIES = [
  { value: 'tops', label: 'Tops' },
  { value: 'bottoms', label: 'Bottoms' },
  { value: 'accessories', label: 'Accessories' },
  { value: 'sleepwear', label: 'Sleepwear' },
];

const GARMENT_TYPES = [
  { value: 't-shirt', label: 'T-Shirt' },
  { value: 'tank-top', label: 'Tank Top' },
  { value: 'crop-top', label: 'Crop Top' },
  { value: 'hoodie', label: 'Hoodie' },
  { value: 'sweatshirt', label: 'Sweatshirt' },
  { value: 'polo', label: 'Polo' },
  { value: 'jacket', label: 'Jacket' },
  { value: 'shorts', label: 'Shorts' },
  { value: 'joggers', label: 'Joggers' },
  { value: 'hat', label: 'Hat' },
  { value: 'tote-bag', label: 'Bag' },
  { value: 'pajama-set', label: 'Pajama Set' },
  { value: 'sleep-mask', label: 'Sleep Mask' },
  { value: 'robe', label: 'Robe' },
  { value: 'socks', label: 'Socks' },
];

const METHODS = [
  { value: 'cut-and-sew', label: 'Cut & Sew' },
  { value: 'screen-print', label: 'Screen Print' },
  { value: 'embroidered', label: 'Embroidered' },
];

const BADGES = [
  { value: '', label: 'None' },
  { value: 'ESSENTIAL', label: 'Essential' },
  { value: 'SIGNATURE', label: 'Signature' },
  { value: 'PREMIUM', label: 'Premium' },
];

function getGarmentSVG(type) {
  const svgs = {
    't-shirt': <svg viewBox="0 0 120 120" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"><path d="M35 30L20 40L28 55L35 48V95H85V48L92 55L100 40L85 30"/><path d="M35 30C35 30 45 42 60 42C75 42 85 30 85 30"/></svg>,
    'tank-top': <svg viewBox="0 0 120 120" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"><path d="M40 25C40 25 48 35 60 35C72 35 80 25 80 25"/><path d="M40 25L38 45L38 95H82V45L80 25"/></svg>,
    'crop-top': <svg viewBox="0 0 120 120" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"><path d="M35 30L20 40L28 55L35 48V72H85V48L92 55L100 40L85 30"/><path d="M35 30C35 30 45 42 60 42C75 42 85 30 85 30"/><line x1="35" y1="72" x2="85" y2="72" strokeDasharray="4 3"/></svg>,
    'hoodie': <svg viewBox="0 0 120 120" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"><path d="M35 30L18 42L27 58L35 50V95H85V50L93 58L102 42L85 30"/><path d="M35 30C35 30 45 42 60 42C75 42 85 30 85 30"/><path d="M50 42V60C50 60 52 65 60 65C68 65 70 60 70 60V42"/><rect x="45" y="70" width="30" height="18" rx="3"/></svg>,
    'sweatshirt': <svg viewBox="0 0 120 120" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"><path d="M35 30L18 42L27 58L35 50V95H85V50L93 58L102 42L85 30"/><path d="M35 30C35 30 45 42 60 42C75 42 85 30 85 30"/><path d="M35 80H85" strokeDasharray="4 3"/></svg>,
    'polo': <svg viewBox="0 0 120 120" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"><path d="M35 30L20 40L28 55L35 48V95H85V48L92 55L100 40L85 30"/><path d="M35 30C35 30 45 40 60 40C75 40 85 30 85 30"/><path d="M55 30V50"/><path d="M65 30V50"/><circle cx="60" cy="37" r="2"/><circle cx="60" cy="45" r="2"/></svg>,
    'jacket': <svg viewBox="0 0 120 120" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"><path d="M35 28L18 40L27 56L35 48V95H85V48L93 56L102 40L85 28"/><path d="M35 28C35 28 45 40 60 40C75 40 85 28 85 28"/><line x1="60" y1="40" x2="60" y2="95"/><rect x="40" y="70" width="14" height="14" rx="2"/><rect x="66" y="70" width="14" height="14" rx="2"/></svg>,
    'shorts': <svg viewBox="0 0 120 120" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"><path d="M30 30H90V50C90 50 90 60 82 72L72 88H64L60 65L56 88H48L38 72C30 60 30 50 30 50V30Z"/><path d="M30 38H90" strokeDasharray="4 3"/></svg>,
    'joggers': <svg viewBox="0 0 120 120" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"><path d="M35 20H85V40C85 40 85 55 80 70L75 100H65L60 55L55 100H45L40 70C35 55 35 40 35 40V20Z"/><path d="M35 28H85" strokeDasharray="4 3"/><path d="M43 95H77" opacity="0.5"/></svg>,
    'hat': <svg viewBox="0 0 120 120" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"><ellipse cx="60" cy="70" rx="40" ry="10"/><path d="M25 70C25 70 28 35 60 35C92 35 95 70 95 70"/><path d="M20 70L60 75"/><rect x="50" y="35" width="20" height="8" rx="4"/></svg>,
    'tote-bag': <svg viewBox="0 0 120 120" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"><rect x="28" y="45" width="64" height="55" rx="4"/><path d="M45 45V32C45 32 45 20 60 20C75 20 75 32 75 32V45"/></svg>,
    'pajama-set': <svg viewBox="0 0 120 120" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"><path d="M40 15L30 22L35 32L40 28V52H55V28L50 32"/><path d="M65 15L75 22L70 32L65 28V52H80V28L85 32"/><path d="M40 15C40 15 44 22 47.5 22C51 22 55 15 55 15"/><path d="M65 15C65 15 69 22 72.5 22C76 22 80 15 80 15"/><path d="M35 60H55V85C55 85 55 92 52 100H48L45 75L42 100H38C35 92 35 85 35 85V60Z"/><path d="M65 60H85V85C85 85 85 92 82 100H78L75 75L72 100H68C65 92 65 85 65 85V60Z"/></svg>,
    'sleep-mask': <svg viewBox="0 0 120 120" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"><path d="M20 55C20 45 30 38 45 38C52 38 57 42 60 45C63 42 68 38 75 38C90 38 100 45 100 55C100 65 90 75 75 75C68 75 63 70 60 67C57 70 52 75 45 75C30 75 20 65 20 55Z"/><path d="M15 52L20 55" strokeDasharray="3 3"/><path d="M100 55L105 52" strokeDasharray="3 3"/><ellipse cx="43" cy="57" rx="8" ry="6" opacity="0.3"/><ellipse cx="77" cy="57" rx="8" ry="6" opacity="0.3"/></svg>,
    'robe': <svg viewBox="0 0 120 120" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"><path d="M40 25L35 100H50L55 60L60 45L65 60L70 100H85L80 25"/><path d="M40 25C40 25 48 35 60 35C72 35 80 25 80 25"/><path d="M45 55L75 55"/><path d="M48 55L45 70H75L72 55"/></svg>,
    'socks': <svg viewBox="0 0 120 120" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"><path d="M40 20H55V70C55 70 55 85 65 92C75 99 85 95 85 85C85 75 75 70 65 70H55"/><path d="M40 30H55" strokeDasharray="3 3"/><path d="M40 20H55"/></svg>,
  };
  return svgs[type] || svgs['t-shirt'];
}

export default function AdminPage() {
  useHideGlobalLayout();
  const [authenticated, setAuthenticated] = useState(false);
  const [authError, setAuthError] = useState(false);
  const [products, setProducts] = useState([]);
  const [imageStore, setImageStore] = useState({});
  const [selectedId, setSelectedId] = useState(null);
  const [toast, setToast] = useState({ message: '', type: '', visible: false });
  const [deploying, setDeploying] = useState(false);
  const [hasLocalChanges, setHasLocalChanges] = useState(false);
  const skipNextAutoSave = useRef(false);
  const fileInputRef = useRef(null);

  const showToast = useCallback((message, type = 'success') => {
    setToast({ message, type, visible: true });
    setTimeout(() => setToast((t) => ({ ...t, visible: false })), 3000);
  }, []);

  const handleAuth = (e) => {
    if (e.key === 'Enter') {
      if (e.target.value === PASSPHRASE) {
        setAuthenticated(true);
      } else {
        setAuthError(true);
        e.target.value = '';
      }
    }
  };

  useEffect(() => {
    if (authenticated) {
      // Try loading from localStorage first
      try {
        const saved = localStorage.getItem(LS_KEY_PRODUCTS);
        if (saved) {
          const parsed = JSON.parse(saved);
          if (Array.isArray(parsed) && parsed.length > 0) {
            setProducts(parsed);
            setHasLocalChanges(true);
            showToast('Restored ' + parsed.length + ' products from local storage', 'success');
            return;
          }
        }
      } catch (e) {
        // localStorage unavailable or corrupt, fall through to fetch
      }
      // Fall back to fetching catalog.json
      skipNextAutoSave.current = true;
      fetch('/data/catalog.json')
        .then((res) => res.json())
        .then((data) => {
          setProducts(data);
          showToast('Catalog loaded \u2014 ' + data.length + ' products', 'success');
        })
        .catch(() => {
          setProducts([]);
          showToast('Could not load catalog.json \u2014 starting fresh', 'error');
        });
    }
  }, [authenticated, showToast]);

  const selectedProduct = products.find((p) => p.id === selectedId);

  const updateField = (field, value) => {
    setProducts((prev) =>
      prev.map((p) => (p.id === selectedId ? { ...p, [field]: value } : p))
    );
  };

  const addProduct = () => {
    const maxNum = products.reduce((max, p) => {
      const num = parseInt(p.id.replace('ms-', ''));
      return num > max ? num : max;
    }, 0);
    const newId = 'ms-' + String(maxNum + 1).padStart(3, '0');
    const newProduct = {
      id: newId,
      name: '',
      category: 'tops',
      garmentType: 't-shirt',
      productionMethod: 'screen-print',
      priceMin: 0,
      priceMax: 0,
      minOrder: 15,
      badge: null,
      description: '',
      image: '',
      imageAlt: '',
    };
    setProducts((prev) => [...prev, newProduct]);
    setSelectedId(newId);
    showToast('New product added', 'success');
  };

  const deleteProduct = (id) => {
    if (!confirm('Delete this product? This cannot be undone.')) return;
    setProducts((prev) => prev.filter((p) => p.id !== id));
    setImageStore((prev) => {
      const next = { ...prev };
      delete next[id];
      return next;
    });
    setSelectedId(products.length > 1 ? products.find((p) => p.id !== id)?.id : null);
    showToast('Product deleted', 'success');
  };

  const exportJSON = () => {
    const json = JSON.stringify(products, null, 2);
    const blob = new Blob([json], { type: 'application/json' });
    const url = URL.createObjectURL(blob);
    const link = document.createElement('a');
    link.href = url;
    link.download = 'catalog.json';
    link.click();
    URL.revokeObjectURL(url);
    showToast('catalog.json downloaded', 'success');
  };

  const downloadAll = () => {
    exportJSON();
    Object.entries(imageStore).forEach(([, img]) => {
      if (img.dataUrl) {
        const link = document.createElement('a');
        link.href = img.dataUrl;
        link.download = img.fileName;
        link.click();
      }
    });
    if (Object.keys(imageStore).length > 0) {
      setTimeout(() => {
        showToast('Files downloaded! Place images in images/products/ folder', 'success');
      }, 500);
    }
  };

  const handleImageSelect = (e) => {
    const file = e.target.files[0];
    if (!file) return;
    processImage(file);
  };

  const processImage = (file) => {
    if (file.size > 5 * 1024 * 1024) {
      showToast('Image too large. Max 5MB.', 'error');
      return;
    }
    const reader = new FileReader();
    reader.onload = (e) => {
      const img = new Image();
      img.onload = () => {
        const maxSize = 800;
        let w = img.width;
        let h = img.height;
        if (w > maxSize || h > maxSize) {
          if (w > h) {
            h = Math.round((h * maxSize) / w);
            w = maxSize;
          } else {
            w = Math.round((w * maxSize) / h);
            h = maxSize;
          }
        }
        const canvas = document.createElement('canvas');
        canvas.width = w;
        canvas.height = h;
        const ctx = canvas.getContext('2d');
        ctx.drawImage(img, 0, 0, w, h);
        const dataUrl = canvas.toDataURL('image/jpeg', 0.85);
        const ext = file.name.split('.').pop().toLowerCase();
        const fileName = `${selectedId}.${ext === 'webp' ? 'webp' : 'jpg'}`;

        setImageStore((prev) => ({
          ...prev,
          [selectedId]: { dataUrl, fileName },
        }));
        setProducts((prev) =>
          prev.map((p) =>
            p.id === selectedId
              ? { ...p, image: `images/products/${fileName}` }
              : p
          )
        );
        showToast('Image uploaded', 'success');
      };
      img.src = e.target.result;
    };
    reader.readAsDataURL(file);
  };

  const removeImage = () => {
    setImageStore((prev) => {
      const next = { ...prev };
      delete next[selectedId];
      return next;
    });
    updateField('image', '');
  };

  const getImgSrc = (product) => {
    if (imageStore[product.id]?.dataUrl) return imageStore[product.id].dataUrl;
    return product.image || '';
  };

  const methodLabels = {
    'cut-and-sew': 'Cut & Sew',
    'screen-print': 'Screen Print',
    'embroidered': 'Embroidered',
  };

  // Auto-save products to localStorage whenever they change
  useEffect(() => {
    if (authenticated && products.length > 0) {
      if (skipNextAutoSave.current) {
        skipNextAutoSave.current = false;
        return;
      }
      try {
        localStorage.setItem(LS_KEY_PRODUCTS, JSON.stringify(products));
        setHasLocalChanges(true);
      } catch (e) {
        // localStorage full or unavailable
      }
    }
  }, [products, authenticated]);

  // Clear local changes and reload from catalog.json
  const clearLocalChanges = () => {
    if (!confirm('Discard all local changes and reload catalog from server?')) return;
    try {
      localStorage.removeItem(LS_KEY_PRODUCTS);
    } catch (e) {
      // ignore
    }
    setHasLocalChanges(false);
    setSelectedId(null);
    skipNextAutoSave.current = true;
    fetch('/data/catalog.json')
      .then((res) => res.json())
      .then((data) => {
        setProducts(data);
        showToast('Catalog reloaded from server \u2014 ' + data.length + ' products', 'success');
      })
      .catch(() => {
        setProducts([]);
        showToast('Could not load catalog.json', 'error');
      });
  };

  // Save & Deploy via server-side API route
  const saveAndDeploy = async () => {
    setDeploying(true);
    try {
      const res = await fetch('/api/save-catalog', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ products }),
      });
      const data = await res.json();
      if (!res.ok) {
        throw new Error(data.error || `Save failed (${res.status})`);
      }
      try { localStorage.removeItem(LS_KEY_PRODUCTS); } catch (e) {}
      setHasLocalChanges(false);
      showToast('Catalog saved & deployed! Site rebuild triggered.', 'success');
    } catch (err) {
      showToast('Deploy failed: ' + err.message, 'error');
    } finally {
      setDeploying(false);
    }
  };

  // Admin styles (inline, matching original admin.html)
  const adminStyles = `
    .admin-page { all: initial; font-family: var(--font-body); }
    .admin-page * { box-sizing: border-box; margin: 0; padding: 0; }
    .admin-page { font-size: 14px; height: 100vh; overflow: hidden; background: var(--gray-50); color: var(--gray-700); line-height: 1.6; display: flex; flex-direction: column; }
    .auth-gate { position: fixed; inset: 0; background: var(--white); z-index: 1000; display: flex; align-items: center; justify-content: center; flex-direction: column; gap: 24px; }
    .auth-gate.hidden { display: none; }
    .auth-gate h1 { font-family: var(--font-display); font-size: 24px; color: var(--rich-black); }
    .auth-gate p { color: var(--gray-500); font-size: 14px; }
    .auth-gate input { padding: 14px 20px; border: 2px solid var(--gray-200); border-radius: 12px; font-size: 16px; width: 300px; text-align: center; font-family: var(--font-body); }
    .auth-gate input:focus { outline: none; border-color: var(--electric-blue); }
    .auth-gate .auth-error { color: var(--hot-pink); font-size: 13px; }
    .admin-topbar { display: flex; align-items: center; justify-content: space-between; padding: 12px 24px; background: var(--rich-black); color: var(--white); flex-shrink: 0; }
    .admin-topbar-left { display: flex; align-items: center; gap: 12px; }
    .admin-topbar-logo { height: 24px; filter: brightness(10); }
    .admin-topbar h1 { font-family: var(--font-display); font-size: 15px; font-weight: 700; }
    .admin-topbar-actions { display: flex; gap: 10px; }
    .admin-btn { display: inline-flex; align-items: center; gap: 6px; padding: 8px 16px; font-size: 13px; font-weight: 600; border-radius: 8px; cursor: pointer; transition: all 0.2s; border: none; font-family: var(--font-body); }
    .admin-btn-primary { background: var(--gradient); color: var(--white); }
    .admin-btn-primary:hover { box-shadow: 0 4px 15px rgba(37, 99, 235, 0.4); transform: translateY(-1px); }
    .admin-btn-secondary { background: var(--gray-700); color: var(--white); }
    .admin-btn-secondary:hover { background: var(--gray-600); }
    .admin-btn-danger { background: transparent; color: var(--hot-pink); border: 1px solid var(--hot-pink); }
    .admin-btn-danger:hover { background: var(--hot-pink); color: var(--white); }
    .admin-btn-ghost { background: transparent; color: var(--gray-500); border: 1px solid var(--gray-200); }
    .admin-btn-ghost:hover { border-color: var(--gray-400); color: var(--gray-700); }
    .admin-main { display: flex; flex: 1; overflow: hidden; }
    .admin-sidebar { width: 280px; background: var(--white); border-right: 1px solid var(--gray-200); display: flex; flex-direction: column; flex-shrink: 0; }
    .admin-sidebar-header { padding: 16px; border-bottom: 1px solid var(--gray-100); display: flex; align-items: center; justify-content: space-between; }
    .admin-sidebar-header h2 { font-family: var(--font-display); font-size: 13px; font-weight: 700; color: var(--gray-500); text-transform: uppercase; letter-spacing: 0.1em; }
    .admin-product-count { font-size: 12px; color: var(--gray-400); background: var(--gray-100); padding: 2px 8px; border-radius: 100px; }
    .admin-product-list { flex: 1; overflow-y: auto; padding: 8px; }
    .admin-product-list-item { display: flex; align-items: center; gap: 10px; padding: 10px 12px; border-radius: 10px; cursor: pointer; transition: all 0.2s; margin-bottom: 2px; }
    .admin-product-list-item:hover { background: var(--gray-50); }
    .admin-product-list-item.active { background: var(--gradient-subtle); border: 1px solid rgba(37, 99, 235, 0.2); }
    .admin-item-thumb { width: 36px; height: 36px; border-radius: 8px; background: var(--gray-100); display: flex; align-items: center; justify-content: center; flex-shrink: 0; overflow: hidden; }
    .admin-item-thumb img { width: 100%; height: 100%; object-fit: cover; }
    .admin-item-thumb svg { width: 20px; height: 20px; stroke: var(--gray-400); }
    .admin-item-info { flex: 1; min-width: 0; }
    .admin-item-name { font-size: 13px; font-weight: 600; color: var(--rich-black); white-space: nowrap; overflow: hidden; text-overflow: ellipsis; }
    .admin-item-meta { font-size: 11px; color: var(--gray-400); }
    .admin-sidebar-footer { padding: 12px 16px; border-top: 1px solid var(--gray-100); }
    .admin-btn-add { width: 100%; justify-content: center; padding: 10px; }
    .admin-editor { flex: 1; overflow-y: auto; padding: 32px; display: flex; gap: 32px; }
    .admin-editor-empty { flex: 1; display: flex; align-items: center; justify-content: center; flex-direction: column; gap: 12px; color: var(--gray-400); }
    .admin-editor-empty svg { width: 48px; height: 48px; stroke: var(--gray-300); }
    .admin-editor-form { flex: 1; max-width: 560px; }
    .admin-form-section { margin-bottom: 28px; }
    .admin-form-section-title { font-family: var(--font-display); font-size: 13px; font-weight: 700; color: var(--gray-400); text-transform: uppercase; letter-spacing: 0.1em; margin-bottom: 16px; padding-bottom: 8px; border-bottom: 1px solid var(--gray-100); }
    .admin-form-row { display: grid; grid-template-columns: 1fr 1fr; gap: 16px; margin-bottom: 16px; }
    .admin-form-row.triple { grid-template-columns: 1fr 1fr 1fr; }
    .admin-form-group { margin-bottom: 16px; }
    .admin-form-group label { display: block; font-size: 12px; font-weight: 600; color: var(--gray-600); margin-bottom: 6px; text-transform: uppercase; letter-spacing: 0.05em; }
    .admin-form-group input, .admin-form-group select, .admin-form-group textarea { width: 100%; padding: 10px 12px; font-size: 14px; font-family: var(--font-body); border: 1px solid var(--gray-200); border-radius: 8px; background: var(--white); color: var(--rich-black); transition: all 0.2s; }
    .admin-form-group input:focus, .admin-form-group select:focus, .admin-form-group textarea:focus { outline: none; border-color: var(--electric-blue); box-shadow: 0 0 0 3px rgba(37, 99, 235, 0.1); }
    .admin-form-group textarea { resize: vertical; min-height: 80px; }
    .admin-image-upload-zone { border: 2px dashed var(--gray-300); border-radius: 12px; padding: 24px; text-align: center; cursor: pointer; transition: all 0.3s; background: var(--gray-50); position: relative; }
    .admin-image-upload-zone:hover { border-color: var(--electric-blue); background: var(--gradient-subtle); }
    .admin-image-upload-zone.has-image { padding: 0; border-style: solid; border-color: var(--gray-200); }
    .admin-image-upload-zone .upload-icon { width: 40px; height: 40px; stroke: var(--gray-400); margin-bottom: 8px; }
    .admin-image-upload-zone .upload-text { font-size: 13px; color: var(--gray-500); }
    .admin-image-upload-zone .upload-text strong { color: var(--electric-blue); }
    .admin-image-upload-zone input[type="file"] { position: absolute; inset: 0; opacity: 0; cursor: pointer; }
    .admin-image-preview { width: 100%; aspect-ratio: 1; object-fit: cover; border-radius: 10px; display: block; }
    .admin-image-actions { display: flex; gap: 8px; margin-top: 8px; }
    .admin-preview-panel { width: 300px; flex-shrink: 0; position: sticky; top: 32px; align-self: flex-start; }
    .admin-preview-label { font-family: var(--font-display); font-size: 13px; font-weight: 700; color: var(--gray-400); text-transform: uppercase; letter-spacing: 0.1em; margin-bottom: 16px; }
    .admin-preview-card { background: var(--white); border-radius: 20px; overflow: hidden; border: 1px solid var(--gray-100); box-shadow: 0 4px 20px rgba(0, 0, 0, 0.06); }
    .admin-preview-card-illustration { aspect-ratio: 1; background: var(--gradient-subtle); display: flex; align-items: center; justify-content: center; position: relative; overflow: hidden; }
    .admin-preview-card-illustration.has-image { background: var(--gray-100); }
    .admin-preview-card-illustration svg { width: 60%; height: 60%; stroke: var(--gray-400); }
    .admin-preview-card-illustration img { width: 100%; height: 100%; object-fit: cover; }
    .admin-preview-card-badge { position: absolute; top: 12px; right: 12px; padding: 4px 12px; font-size: 10px; font-weight: 700; letter-spacing: 0.1em; text-transform: uppercase; border-radius: 100px; color: var(--white); }
    .admin-preview-card-badge.essential { background: var(--electric-blue); }
    .admin-preview-card-badge.signature { background: var(--gradient); }
    .admin-preview-card-badge.premium { background: linear-gradient(135deg, var(--gold) 0%, #B8941E 100%); }
    .admin-preview-card-info { padding: 20px; }
    .admin-preview-card-info h3 { font-family: var(--font-display); font-size: 16px; font-weight: 700; color: var(--rich-black); margin-bottom: 6px; }
    .admin-preview-card-info p { font-size: 13px; color: var(--gray-500); line-height: 1.5; margin-bottom: 16px; }
    .admin-preview-card-meta { display: flex; align-items: center; justify-content: space-between; padding-top: 12px; border-top: 1px solid var(--gray-100); }
    .admin-preview-card-price { font-family: var(--font-display); font-size: 16px; font-weight: 700; background: var(--gradient); -webkit-background-clip: text; -webkit-text-fill-color: transparent; background-clip: text; }
    .admin-preview-card-method { font-size: 11px; font-weight: 600; text-transform: uppercase; letter-spacing: 0.05em; color: var(--gray-400); padding: 4px 10px; background: var(--gray-50); border-radius: 100px; }
    .admin-editor-actions { display: flex; gap: 10px; margin-top: 24px; padding-top: 20px; border-top: 1px solid var(--gray-100); }
    .admin-toast { position: fixed; bottom: 24px; right: 24px; padding: 14px 20px; background: var(--rich-black); color: var(--white); border-radius: 12px; font-size: 14px; font-weight: 500; z-index: 1000; transform: translateY(100px); opacity: 0; transition: all 0.3s cubic-bezier(0.16, 1, 0.3, 1); box-shadow: 0 10px 30px rgba(0, 0, 0, 0.2); }
    .admin-toast.visible { transform: translateY(0); opacity: 1; }
    .admin-toast.success { border-left: 4px solid #34D399; }
    .admin-toast.error { border-left: 4px solid var(--hot-pink); }
    .admin-btn-deploy { background: linear-gradient(135deg, #34D399 0%, #059669 100%); color: var(--white); }
    .admin-btn-deploy:hover { box-shadow: 0 4px 15px rgba(5, 150, 105, 0.4); transform: translateY(-1px); }
    .admin-btn-deploy:disabled { opacity: 0.6; cursor: not-allowed; transform: none; box-shadow: none; }
    .admin-btn-clear { background: transparent; color: var(--gray-400); border: 1px solid var(--gray-600); }
    .admin-btn-clear:hover { border-color: var(--gray-400); color: var(--white); }
    .admin-local-badge { font-size: 10px; font-weight: 700; letter-spacing: 0.05em; text-transform: uppercase; padding: 2px 8px; border-radius: 100px; background: rgba(251, 191, 36, 0.2); color: #FBBF24; margin-left: 8px; }
    @keyframes admin-spin { to { transform: rotate(360deg); } }
    .admin-spinner { display: inline-block; width: 14px; height: 14px; border: 2px solid rgba(255,255,255,0.3); border-top-color: var(--white); border-radius: 50%; animation: admin-spin 0.6s linear infinite; }
  `;

  if (!authenticated) {
    return (
      <>
        <style>{adminStyles}</style>
        <div className="admin-page">
          <div className="auth-gate">
            <img src="/assets/Submark.svg" alt="" style={{ width: 48, opacity: 0.6 }} />
            <h1>Product Manager</h1>
            <p>Enter the admin passphrase to continue</p>
            <input
              type="password"
              placeholder="Passphrase"
              autoFocus
              onKeyDown={handleAuth}
            />
            {authError && <p className="auth-error">Incorrect passphrase</p>}
          </div>
        </div>
      </>
    );
  }

  return (
    <>
      <style>{adminStyles}</style>
      <div className="admin-page">
        {/* Top Bar */}
        <div className="admin-topbar">
          <div className="admin-topbar-left">
            <img src="/assets/Submark.svg" alt="" className="admin-topbar-logo" />
            <h1>Product Manager</h1>
            {hasLocalChanges && <span className="admin-local-badge">Unsaved</span>}
          </div>
          <div className="admin-topbar-actions">
            {hasLocalChanges && (
              <button className="admin-btn admin-btn-clear" onClick={clearLocalChanges}>
                <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><path d="M3 6h18"/><path d="M8 6V4h8v2"/><path d="M19 6v14a2 2 0 01-2 2H7a2 2 0 01-2-2V6"/></svg>
                Clear Local
              </button>
            )}
            <button className="admin-btn admin-btn-secondary" onClick={exportJSON}>
              <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><path d="M21 15v4a2 2 0 01-2 2H5a2 2 0 01-2-2v-4"/><polyline points="7 10 12 15 17 10"/><line x1="12" y1="15" x2="12" y2="3"/></svg>
              Export JSON
            </button>
            <button className="admin-btn admin-btn-primary" onClick={downloadAll}>
              <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><path d="M21 15v4a2 2 0 01-2 2H5a2 2 0 01-2-2v-4"/><polyline points="7 10 12 15 17 10"/><line x1="12" y1="15" x2="12" y2="3"/></svg>
              Download All
            </button>
            <button className="admin-btn admin-btn-deploy" onClick={saveAndDeploy} disabled={deploying}>
              {deploying ? (
                <><span className="admin-spinner" /> Deploying...</>
              ) : (
                <>
                  <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><path d="M12 19V5"/><polyline points="5 12 12 5 19 12"/></svg>
                  Save &amp; Deploy
                </>
              )}
            </button>
          </div>
        </div>

        {/* Main Area */}
        <div className="admin-main">
          {/* Sidebar */}
          <div className="admin-sidebar">
            <div className="admin-sidebar-header">
              <h2>Products</h2>
              <span className="admin-product-count">{products.length}</span>
            </div>
            <div className="admin-product-list">
              {products.map((p) => {
                const thumbSrc = imageStore[p.id]?.dataUrl || p.image;
                return (
                  <div
                    key={p.id}
                    className={`admin-product-list-item${p.id === selectedId ? ' active' : ''}`}
                    onClick={() => setSelectedId(p.id)}
                  >
                    <div className="admin-item-thumb">
                      {thumbSrc ? (
                        <img src={thumbSrc} alt="" />
                      ) : (
                        <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5">
                          <rect x="3" y="3" width="18" height="18" rx="2" />
                          <circle cx="8.5" cy="8.5" r="1.5" />
                          <path d="M21 15l-5-5L5 21" />
                        </svg>
                      )}
                    </div>
                    <div className="admin-item-info">
                      <div className="admin-item-name">{p.name || 'Untitled'}</div>
                      <div className="admin-item-meta">
                        {p.category || 'No category'} &middot; ${p.priceMin || '?'}&ndash;${p.priceMax || '?'}
                      </div>
                    </div>
                  </div>
                );
              })}
            </div>
            <div className="admin-sidebar-footer">
              <button className="admin-btn admin-btn-primary admin-btn-add" onClick={addProduct}>
                <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                  <line x1="12" y1="5" x2="12" y2="19" />
                  <line x1="5" y1="12" x2="19" y2="12" />
                </svg>
                Add Product
              </button>
            </div>
          </div>

          {/* Editor Area */}
          <div className="admin-editor">
            {!selectedProduct ? (
              <div className="admin-editor-empty">
                <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5">
                  <rect x="3" y="3" width="18" height="18" rx="2" />
                  <line x1="9" y1="3" x2="9" y2="21" />
                </svg>
                <p>Select a product to edit or add a new one</p>
              </div>
            ) : (
              <>
                <div className="admin-editor-form">
                  <div className="admin-form-section">
                    <div className="admin-form-section-title">Product Details</div>
                    <div className="admin-form-group">
                      <label>Product Name *</label>
                      <input
                        type="text"
                        value={selectedProduct.name}
                        onChange={(e) => updateField('name', e.target.value)}
                      />
                    </div>
                    <div className="admin-form-group">
                      <label>Description</label>
                      <textarea
                        value={selectedProduct.description}
                        onChange={(e) => updateField('description', e.target.value)}
                      />
                    </div>
                  </div>

                  <div className="admin-form-section">
                    <div className="admin-form-section-title">Classification</div>
                    <div className="admin-form-row">
                      <div className="admin-form-group">
                        <label>Category *</label>
                        <select
                          value={selectedProduct.category}
                          onChange={(e) => updateField('category', e.target.value)}
                        >
                          {CATEGORIES.map((c) => (
                            <option key={c.value} value={c.value}>{c.label}</option>
                          ))}
                        </select>
                      </div>
                      <div className="admin-form-group">
                        <label>Garment Type *</label>
                        <select
                          value={selectedProduct.garmentType}
                          onChange={(e) => updateField('garmentType', e.target.value)}
                        >
                          {GARMENT_TYPES.map((g) => (
                            <option key={g.value} value={g.value}>{g.label}</option>
                          ))}
                        </select>
                      </div>
                    </div>
                    <div className="admin-form-row">
                      <div className="admin-form-group">
                        <label>Production Method *</label>
                        <select
                          value={selectedProduct.productionMethod}
                          onChange={(e) => updateField('productionMethod', e.target.value)}
                        >
                          {METHODS.map((m) => (
                            <option key={m.value} value={m.value}>{m.label}</option>
                          ))}
                        </select>
                      </div>
                      <div className="admin-form-group">
                        <label>Badge</label>
                        <select
                          value={selectedProduct.badge || ''}
                          onChange={(e) => updateField('badge', e.target.value || null)}
                        >
                          {BADGES.map((b) => (
                            <option key={b.value} value={b.value}>{b.label}</option>
                          ))}
                        </select>
                      </div>
                    </div>
                  </div>

                  <div className="admin-form-section">
                    <div className="admin-form-section-title">Pricing</div>
                    <div className="admin-form-row triple">
                      <div className="admin-form-group">
                        <label>Min Price ($) *</label>
                        <input
                          type="number"
                          value={selectedProduct.priceMin || ''}
                          onChange={(e) => updateField('priceMin', Number(e.target.value))}
                        />
                      </div>
                      <div className="admin-form-group">
                        <label>Max Price ($) *</label>
                        <input
                          type="number"
                          value={selectedProduct.priceMax || ''}
                          onChange={(e) => updateField('priceMax', Number(e.target.value))}
                        />
                      </div>
                      <div className="admin-form-group">
                        <label>Min Order</label>
                        <input
                          type="number"
                          value={selectedProduct.minOrder || ''}
                          onChange={(e) => updateField('minOrder', Number(e.target.value))}
                        />
                      </div>
                    </div>
                  </div>

                  <div className="admin-form-section">
                    <div className="admin-form-section-title">Product Image</div>
                    <div
                      className={`admin-image-upload-zone${getImgSrc(selectedProduct) ? ' has-image' : ''}`}
                      onDragOver={(e) => e.preventDefault()}
                      onDrop={(e) => {
                        e.preventDefault();
                        const file = e.dataTransfer.files[0];
                        if (file && file.type.startsWith('image/')) processImage(file);
                      }}
                    >
                      {getImgSrc(selectedProduct) ? (
                        <img src={getImgSrc(selectedProduct)} className="admin-image-preview" alt="" />
                      ) : (
                        <>
                          <svg className="upload-icon" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5">
                            <rect x="3" y="3" width="18" height="18" rx="2" />
                            <circle cx="8.5" cy="8.5" r="1.5" />
                            <path d="M21 15l-5-5L5 21" />
                          </svg>
                          <p className="upload-text"><strong>Click to upload</strong> or drag and drop<br />JPG, PNG, or WebP (max 2MB)</p>
                        </>
                      )}
                      <input
                        ref={fileInputRef}
                        type="file"
                        accept="image/jpeg,image/png,image/webp"
                        onChange={handleImageSelect}
                      />
                    </div>
                    {getImgSrc(selectedProduct) && (
                      <div className="admin-image-actions">
                        <button className="admin-btn admin-btn-ghost" onClick={removeImage}>Remove Image</button>
                      </div>
                    )}
                    <div className="admin-form-group" style={{ marginTop: 12 }}>
                      <label>Image Alt Text</label>
                      <input
                        type="text"
                        value={selectedProduct.imageAlt || ''}
                        onChange={(e) => updateField('imageAlt', e.target.value)}
                        placeholder="Describe the product image"
                      />
                    </div>
                  </div>

                  <div className="admin-editor-actions">
                    <button className="admin-btn admin-btn-danger" onClick={() => deleteProduct(selectedProduct.id)}>
                      <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                        <polyline points="3 6 5 6 21 6" />
                        <path d="M19 6v14a2 2 0 01-2 2H7a2 2 0 01-2-2V6m3 0V4a2 2 0 012-2h4a2 2 0 012 2v2" />
                      </svg>
                      Delete Product
                    </button>
                  </div>
                </div>

                {/* Live Preview */}
                <div className="admin-preview-panel">
                  <div className="admin-preview-label">Live Preview</div>
                  <div className="admin-preview-card">
                    <div className={`admin-preview-card-illustration${getImgSrc(selectedProduct) ? ' has-image' : ''}`}>
                      {getImgSrc(selectedProduct) ? (
                        <img src={getImgSrc(selectedProduct)} alt={selectedProduct.imageAlt || selectedProduct.name} />
                      ) : (
                        getGarmentSVG(selectedProduct.garmentType)
                      )}
                      {selectedProduct.badge && (
                        <span className={`admin-preview-card-badge ${selectedProduct.badge.toLowerCase()}`}>
                          {selectedProduct.badge}
                        </span>
                      )}
                    </div>
                    <div className="admin-preview-card-info">
                      <h3>{selectedProduct.name || 'Untitled Product'}</h3>
                      <p>{selectedProduct.description || 'No description yet.'}</p>
                      <div className="admin-preview-card-meta">
                        <span className="admin-preview-card-price">
                          ${selectedProduct.priceMin || '?'}&ndash;${selectedProduct.priceMax || '?'}
                        </span>
                        <span className="admin-preview-card-method">
                          {methodLabels[selectedProduct.productionMethod] || selectedProduct.productionMethod}
                        </span>
                      </div>
                    </div>
                  </div>
                </div>
              </>
            )}
          </div>
        </div>

        {/* Toast */}
        <div className={`admin-toast ${toast.type}${toast.visible ? ' visible' : ''}`}>
          {toast.message}
        </div>
      </div>
    </>
  );
}
