import { useState, useEffect } from 'react';
import { Search, ShoppingCart, Heart, SlidersHorizontal, Menu, X } from 'lucide-react';
import ProductCard from '../components/ProductCard';
import ProductDetail from '../components/ProductDetail';
import CartDrawer from '../components/CartDrawer';
import WishlistDrawer from '../components/WishlistDrawer';
import CheckoutModal from '../components/CheckoutModal';
import { useCart } from '../context/CartContext';
import { getProducts } from '../services/api';

const CATEGORIES = ['All', 'CPU', 'GPU', 'Motherboard', 'RAM', 'SSD', 'Case', 'PSU', 'Cooler'];

export default function Storefront() {
  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');
  const [activeCategory, setActiveCategory] = useState('All');
  const [searchQuery, setSearchQuery] = useState('');
  const [sortBy, setSortBy] = useState('default');
  const [showSortDropdown, setShowSortDropdown] = useState(false);
  const [selectedProduct, setSelectedProduct] = useState(null);
  const [showCart, setShowCart] = useState(false);
  const [showWishlist, setShowWishlist] = useState(false);
  const [showCheckout, setShowCheckout] = useState(false);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const { cartCount, wishlist } = useCart();

  useEffect(() => {
    getProducts()
      .then((res) => setProducts(res.data))
      .catch((err) => setError(err.message))
      .finally(() => setLoading(false));
  }, []);

  const filteredProducts = products
    .filter(p => activeCategory === 'All' || p.category === activeCategory)
    .filter(p => p.name.toLowerCase().includes(searchQuery.toLowerCase()))
    .sort((a, b) => {
      if (sortBy === 'price-asc') return a.price - b.price;
      if (sortBy === 'price-desc') return b.price - a.price;
      if (sortBy === 'name-asc') return a.name.localeCompare(b.name);
      return 0;
    });

  return (
    <div className="min-h-screen" style={{ backgroundColor: '#0a0a0c' }}>
      {/* Header */}
      <header className="fixed top-0 left-0 right-0 z-50" style={{ backgroundColor: 'rgba(10, 10, 12, 0.95)', backdropFilter: 'blur(20px)', borderBottom: '1px solid #1a1a1f' }}>
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex items-center justify-between h-16 sm:h-20">
            {/* Logo */}
            <div className="flex items-center gap-3">
              <div className="w-11 h-11 rounded-xl flex items-center justify-center" style={{ background: 'linear-gradient(135deg, #3b82f6 0%, #8b5cf6 100%)' }}>
                <span className="text-white font-bold text-lg">A</span>
              </div>
              <span className="text-white font-bold text-xl hidden sm:block">Adversity</span>
            </div>

            {/* Search - Desktop */}
            <div className="hidden md:flex flex-1 max-w-xl mx-8">
              <div className="relative w-full group">
                <Search className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-500 group-focus-within:text-blue-400 transition-colors" size={18} />
                <input
                  type="text"
                  placeholder="Search products..."
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                  className="w-full rounded-xl pl-11 pr-4 py-3 text-white placeholder-gray-500 focus:outline-none transition-all duration-300"
                  style={{ backgroundColor: '#121214', border: '1px solid #252529', boxShadow: '0 0 0 0px rgba(59, 130, 246, 0)' }}
                  onFocus={(e) => { e.target.style.borderColor = '#3b82f6'; e.target.style.boxShadow = '0 0 20px rgba(59, 130, 246, 0.15)'; }}
                  onBlur={(e) => { e.target.style.borderColor = '#252529'; e.target.style.boxShadow = '0 0 0 0px rgba(59, 130, 246, 0)'; }}
                />
              </div>
            </div>

            {/* Actions */}
            <div className="flex items-center gap-1 sm:gap-2">
              <button 
                onClick={() => setShowWishlist(true)}
                className="p-2.5 rounded-xl hover:bg-[#1a1a1f] text-gray-400 hover:text-white transition-all relative"
              >
                <Heart size={20} />
                {wishlist.length > 0 && (
                  <span className="absolute -top-1 -right-1 w-5 h-5 rounded-full flex items-center justify-center text-xs font-bold text-white" style={{ backgroundColor: '#ef4444' }}>
                    {wishlist.length}
                  </span>
                )}
              </button>
              <button 
                onClick={() => setShowCart(true)}
                className="p-2.5 rounded-xl hover:bg-[#1a1a1f] text-gray-400 hover:text-white transition-all relative"
              >
                <ShoppingCart size={20} />
                {cartCount > 0 && (
                  <span className="absolute -top-1 -right-1 w-5 h-5 rounded-full flex items-center justify-center text-xs font-bold text-white" style={{ backgroundColor: '#3b82f6' }}>
                    {cartCount}
                  </span>
                )}
              </button>
              <a 
                href="/admin" 
                className="hidden sm:block px-4 py-2.5 rounded-xl text-gray-400 hover:text-white hover:bg-[#1a1a1f] transition-all text-sm font-medium"
              >
                Admin
              </a>
              <button 
                onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
                className="p-2.5 rounded-xl hover:bg-[#1a1a1f] text-gray-400 hover:text-white transition-all md:hidden"
              >
                {mobileMenuOpen ? <X size={20} /> : <Menu size={20} />}
              </button>
            </div>
          </div>

          {/* Mobile Search & Menu */}
          {mobileMenuOpen && (
            <div className="pb-4 animate-fade-in">
              <div className="relative mb-4">
                <Search className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-500" size={18} />
                <input
                  type="text"
                  placeholder="Search products..."
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                  className="w-full rounded-xl pl-11 pr-4 py-3 text-white placeholder-gray-500 focus:outline-none"
                  style={{ backgroundColor: '#121214', border: '1px solid #252529' }}
                />
              </div>
              <div className="flex flex-wrap gap-2">
                {CATEGORIES.map((category) => (
                  <button
                    key={category}
                    onClick={() => setActiveCategory(category)}
                    className="px-5 py-2.5 rounded-xl text-sm font-semibold transition-all"
                    style={activeCategory === category 
                      ? { background: 'linear-gradient(135deg, #3b82f6 0%, #2563eb 100%)', color: 'white', boxShadow: '0 4px 15px rgba(59, 130, 246, 0.4)' }
                      : { backgroundColor: '#1a1a1f', color: '#9ca3af', border: '1px solid #252529' }
                    }
                  >
                    {category}
                  </button>
                ))}
              </div>
            </div>
          )}
        </div>
      </header>

      {/* Main Content */}
      <main className="pt-24 sm:pt-28 pb-12">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 w-full">
          {/* Hero */}
          <div className="text-center mb-12">
            <h1 className="text-4xl sm:text-5xl md:text-6xl font-bold text-white mb-4">
              Build Your <span style={{ background: 'linear-gradient(135deg, #60a5fa 0%, #a855f7 100%)', WebkitBackgroundClip: 'text', WebkitTextFillColor: 'transparent', backgroundClip: 'text' }}>Dream PC</span>
            </h1>
            <p className="text-gray-400 text-lg">Premium components at the best prices in the Philippines</p>
          </div>

          {/* Categories & Sort - Desktop */}
          <div className="hidden md:flex flex-col items-center mb-10">
            <div className="flex flex-wrap justify-center gap-3 mb-6">
              {CATEGORIES.map((category) => (
                <button
                  key={category}
                  onClick={() => setActiveCategory(category)}
                  className="px-6 py-3 rounded-xl text-base font-semibold transition-all duration-300"
                  style={activeCategory === category 
                    ? { background: 'linear-gradient(135deg, #3b82f6 0%, #2563eb 100%)', color: 'white', boxShadow: '0 4px 20px rgba(59, 130, 246, 0.4)', transform: 'scale(1.05)' }
                    : { backgroundColor: '#1a1a1f', color: '#9ca3af', border: '1px solid #252529', transform: 'scale(1)' }
                  }
                >
                  {category}
                </button>
              ))}
            </div>

            <div className="relative">
              <button
                onClick={() => setShowSortDropdown(!showSortDropdown)}
                className="flex items-center gap-2 px-5 py-2.5 rounded-xl text-gray-400 hover:text-white transition-colors text-sm"
                style={{ backgroundColor: '#1a1a1f', border: '1px solid #252529' }}
              >
                <SlidersHorizontal size={16} />
                <span>Sort</span>
              </button>
              
              {showSortDropdown && (
                <div className="absolute right-0 mt-2 w-52 rounded-xl overflow-hidden z-20 shadow-2xl" style={{ backgroundColor: '#1a1a1f', border: '1px solid #252529' }}>
                  {[
                    { value: 'default', label: 'Default' },
                    { value: 'price-asc', label: 'Price: Low to High' },
                    { value: 'price-desc', label: 'Price: High to Low' },
                    { value: 'name-asc', label: 'Name: A-Z' },
                  ].map((option) => (
                    <button
                      key={option.value}
                      onClick={() => { setSortBy(option.value); setShowSortDropdown(false); }}
                      className="w-full px-5 py-3.5 text-left text-sm transition-colors"
                      style={sortBy === option.value ? { backgroundColor: 'rgba(59, 130, 246, 0.15)', color: '#60a5fa' } : { color: '#d1d5db' }}
                    >
                      {option.label}
                    </button>
                  ))}
                </div>
              )}
            </div>
          </div>

          {/* Mobile Sort & Categories */}
          <div className="md:hidden mb-8 space-y-4">
            <select
              value={sortBy}
              onChange={(e) => setSortBy(e.target.value)}
              className="w-full rounded-xl px-4 py-3.5 text-white text-sm focus:outline-none"
              style={{ backgroundColor: '#1a1a1f', border: '1px solid #252529' }}
            >
              <option value="default">Default Sorting</option>
              <option value="price-asc">Price: Low to High</option>
              <option value="price-desc">Price: High to Low</option>
              <option value="name-asc">Name: A-Z</option>
            </select>
            <div className="flex flex-wrap gap-2">
              {CATEGORIES.map((category) => (
                <button
                  key={category}
                  onClick={() => setActiveCategory(category)}
                  className="px-5 py-2.5 rounded-xl text-sm font-semibold transition-all"
                  style={activeCategory === category 
                    ? { background: 'linear-gradient(135deg, #3b82f6 0%, #2563eb 100%)', color: 'white' }
                    : { backgroundColor: '#1a1a1f', color: '#9ca3af', border: '1px solid #252529' }
                  }
                >
                  {category}
                </button>
              ))}
            </div>
          </div>

          {/* Loading */}
          {loading && (
            <div className="flex items-center justify-center py-32">
              <div className="w-12 h-12 rounded-full animate-spin" style={{ border: '3px solid #252529', borderTopColor: '#3b82f6' }}></div>
            </div>
          )}

          {/* Error */}
          {error && (
            <div className="rounded-xl px-6 py-4 text-center" style={{ backgroundColor: 'rgba(239, 68, 68, 0.1)', border: '1px solid rgba(239, 68, 68, 0.3)', color: '#f87171' }}>
              {error}
            </div>
          )}

          {/* Empty */}
          {!loading && !error && filteredProducts.length === 0 && (
            <div className="text-center py-32">
              <p className="text-gray-500 text-lg">No products found</p>
            </div>
          )}

          {/* Products Grid */}
          {!loading && !error && filteredProducts.length > 0 && (
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6 justify-items-center">
              {filteredProducts.map((product) => (
                <div key={product.id} className="w-full max-w-sm">
                  <ProductCard 
                    product={product} 
                    onViewDetails={setSelectedProduct}
                  />
                </div>
              ))}
            </div>
          )}
        </div>
      </main>

      {/* Footer */}
      <footer className="py-10" style={{ borderTop: '1px solid #1a1a1f' }}>
        <div className="max-w-7xl mx-auto px-4 text-center">
          <p className="text-gray-500 text-sm">© 2026 Adversity Store. All rights reserved.</p>
        </div>
      </footer>

      {/* Modals */}
      {selectedProduct && (
        <ProductDetail product={selectedProduct} onClose={() => setSelectedProduct(null)} />
      )}

      <CartDrawer 
        isOpen={showCart} 
        onClose={() => setShowCart(false)} 
        onCheckout={() => setShowCheckout(true)}
      />

      <WishlistDrawer 
        isOpen={showWishlist} 
        onClose={() => setShowWishlist(false)} 
      />

      {showCheckout && (
        <CheckoutModal onClose={() => setShowCheckout(false)} />
      )}
    </div>
  );
}
