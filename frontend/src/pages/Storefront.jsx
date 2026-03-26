import { useState, useEffect } from 'react';
import { ShoppingCart, Heart, Menu, X, User, LogOut, Package, Cpu, SlidersHorizontal } from 'lucide-react';
import { Link, useNavigate } from 'react-router-dom';
import { motion, AnimatePresence } from 'framer-motion';
import ProductCard from '../components/ProductCard';
import ProductDetail from '../components/ProductDetail';
import CartDrawer from '../components/CartDrawer';
import WishlistDrawer from '../components/WishlistDrawer';
import CheckoutModal from '../components/CheckoutModal';
import { useCart } from '../context/CartContext';
import { useAuth } from '../context/AuthContext';
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
  const [showUserMenu, setShowUserMenu] = useState(false);
  const { cartCount, wishlist } = useCart();
  const { currentUser, logout } = useAuth();
  const navigate = useNavigate();

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
            <div className="flex items-center gap-2">
              <Link to="/" className="flex items-center gap-2">
                <div className="w-9 h-9 rounded-lg flex items-center justify-center" style={{ background: 'linear-gradient(135deg, #3b82f6 0%, #8b5cf6 100%)' }}>
                  <Cpu className="text-white w-5 h-5" />
                </div>
                <span className="text-white font-bold text-lg hidden sm:block">Adversity</span>
              </Link>
            </div>

            {/* Search - Desktop */}
            <div className="hidden md:flex flex-1 max-w-md mx-auto">
              <input
                type="text"
                placeholder="Search products..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="w-full px-4 py-2.5 text-sm text-white placeholder-gray-500 bg-gray-900/50 border border-gray-700 rounded-xl focus:outline-none focus:border-blue-500 focus:ring-2 focus:ring-blue-500/20 transition-all duration-300"
              />
            </div>

            {/* Actions */}
            <div className="flex items-center gap-1 sm:gap-2">
              <button 
                onClick={() => setShowWishlist(true)}
                className="p-2 rounded-lg hover:bg-[#1a1a1f] text-gray-400 hover:text-white transition-all relative"
              >
                <Heart size={18} />
                {wishlist.length > 0 && (
                  <span className="absolute -top-0.5 -right-0.5 w-4 h-4 rounded-full flex items-center justify-center text-[10px] font-bold text-white" style={{ backgroundColor: '#ef4444' }}>
                    {wishlist.length}
                  </span>
                )}
              </button>
              <button 
                onClick={() => setShowCart(true)}
                className="p-2 rounded-lg hover:bg-[#1a1a1f] text-gray-400 hover:text-white transition-all relative"
              >
                <ShoppingCart size={18} />
                {cartCount > 0 && (
                  <span className="absolute -top-0.5 -right-0.5 w-4 h-4 rounded-full flex items-center justify-center text-[10px] font-bold text-white" style={{ backgroundColor: '#3b82f6' }}>
                    {cartCount}
                  </span>
                )}
              </button>
              
              {currentUser ? (
                <div className="relative">
                  <button 
                    onClick={() => setShowUserMenu(!showUserMenu)}
                    className="hidden sm:flex items-center gap-2 px-3 py-2 rounded-xl text-gray-400 hover:text-white hover:bg-[#1a1a1f] transition-all text-sm font-medium"
                  >
                    <div className="w-7 h-7 rounded-full flex items-center justify-center" style={{ background: 'linear-gradient(135deg, #3b82f6 0%, #8b5cf6 100%)' }}>
                      <User size={14} className="text-white" />
                    </div>
                    <span className="max-w-[100px] truncate">{currentUser.name}</span>
                  </button>
                  {showUserMenu && (
                    <div className="absolute right-0 mt-2 w-56 rounded-xl overflow-hidden z-50 shadow-2xl" style={{ backgroundColor: '#1a1a1f', border: '1px solid #252529' }}>
                      <div className="px-4 py-3 border-b" style={{ borderColor: '#252529' }}>
                        <p className="text-white text-sm font-medium truncate">{currentUser.name}</p>
                        <p className="text-gray-500 text-xs truncate">{currentUser.email}</p>
                      </div>
                      <button
                        onClick={() => { navigate('/orders'); setShowUserMenu(false); }}
                        className="w-full px-4 py-3 text-left text-sm flex items-center gap-3 transition-colors text-gray-300 hover:bg-[#252529]"
                      >
                        <Package size={16} />
                        My Orders
                      </button>
                      <button
                        onClick={() => { logout(); navigate('/'); setShowUserMenu(false); }}
                        className="w-full px-4 py-3 text-left text-sm flex items-center gap-3 transition-colors text-red-400 hover:bg-[#252529]"
                      >
                        <LogOut size={16} />
                        Logout
                      </button>
                    </div>
                  )}
                </div>
              ) : (
                <div className="hidden sm:flex items-center gap-2">
                  <Link 
                    to="/login" 
                    className="px-4 py-2.5 rounded-xl text-gray-400 hover:text-white hover:bg-[#1a1a1f] transition-all text-sm font-medium"
                  >
                    Login
                  </Link>
                  <Link 
                    to="/register" 
                    className="px-4 py-2.5 rounded-xl text-white text-sm font-medium"
                    style={{ background: 'linear-gradient(135deg, #3b82f6 0%, #2563eb 100%)' }}
                  >
                    Sign Up
                  </Link>
                </div>
              )}
              
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
              <div className="mb-4">
                <input
                  type="text"
                  placeholder="Search products..."
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                  className="w-full px-4 py-3 text-white placeholder-gray-500 bg-gray-900/50 border border-gray-700 rounded-xl focus:outline-none focus:border-blue-500"
                />
              </div>
              <div className="flex flex-wrap gap-2">
                {CATEGORIES.map((category) => (
                  <button
                    key={category}
                    onClick={() => { setActiveCategory(category); setMobileMenuOpen(false); }}
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
          <div className="relative text-center mb-16">
            {/* Animated background glow */}
            <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[600px] h-[300px] rounded-full opacity-20" style={{ background: 'radial-gradient(ellipse, rgba(59, 130, 246, 0.4) 0%, transparent 70%)' }} />
            
            <motion.div
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6 }}
            >
              <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full mb-6" style={{ backgroundColor: 'rgba(59, 130, 246, 0.1)', border: '1px solid rgba(59, 130, 246, 0.2)' }}>
                <Cpu className="w-4 h-4 text-blue-400" />
                <span className="text-blue-400 text-sm font-medium">Premium PC Components</span>
              </div>
            </motion.div>

            <motion.h1 
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.1 }}
              className="text-3xl sm:text-4xl md:text-5xl font-bold text-white mb-4 relative"
            >
              Build Your{' '}
              <span 
                className="relative"
                style={{ background: 'linear-gradient(135deg, #60a5fa 0%, #a855f7 100%)', WebkitBackgroundClip: 'text', WebkitTextFillColor: 'transparent', backgroundClip: 'text' }}
              >
                Dream PC
              </span>
            </motion.h1>
            
            <motion.p 
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.2 }}
              className="text-gray-400 text-lg max-w-2xl mx-auto"
            >
              Premium components at the best prices in the Philippines. Fast shipping, warranty included.
            </motion.p>

            <motion.div 
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.3 }}
              className="flex flex-wrap justify-center gap-4 mt-8"
            >
              <button 
                onClick={() => document.getElementById('products')?.scrollIntoView({ behavior: 'smooth' })}
                className="px-8 py-3 rounded-xl text-white font-semibold transition-all hover:scale-105"
                style={{ background: 'linear-gradient(135deg, #3b82f6 0%, #2563eb 100%)', boxShadow: '0 4px 20px rgba(59, 130, 246, 0.4)' }}
              >
                Shop Now
              </button>
              <button 
                onClick={() => navigate('/admin')}
                className="px-8 py-3 rounded-xl font-semibold transition-all hover:scale-105"
                style={{ backgroundColor: '#1a1a1f', border: '1px solid #252529', color: '#9ca3af' }}
              >
                Admin Access
              </button>
            </motion.div>
          </div>

          {/* Categories & Sort - Desktop */}
          <div className="mb-10 flex flex-col items-center" style={{ zIndex: 5, position: 'relative' }}>
            <div className="flex flex-wrap justify-center gap-4" style={{ pointerEvents: 'auto' }}>
              {CATEGORIES.map((category) => (
                <button
                  key={category}
                  type="button"
                  onClick={() => setActiveCategory(category)}
                  style={{ pointerEvents: 'auto' }}
                  className={`px-5 py-2.5 rounded-lg text-sm font-medium transition-all duration-200 ${
                    activeCategory === category 
                      ? 'bg-blue-600 text-white shadow-lg shadow-blue-500/30' 
                      : 'bg-[#1a1a1f] text-gray-400 hover:text-white hover:bg-[#252529] border border-[#252529]'
                  }`}
                >
                  {category}
                </button>
              ))}
            </div>

            <div className="relative">
              <button
                onClick={() => setShowSortDropdown(!showSortDropdown)}
                className="flex items-center gap-2 px-4 py-2 rounded-lg text-gray-400 hover:text-white transition-colors text-sm bg-[#1a1a1f] border border-[#252529] hover:border-gray-600"
              >
                <SlidersHorizontal size={14} />
                <span>Sort</span>
              </button>
              
              {showSortDropdown && (
                <div className="absolute right-0 mt-2 w-48 rounded-lg overflow-hidden z-20 shadow-xl bg-[#1a1a1f] border border-[#252529]">
                  {[
                    { value: 'default', label: 'Default' },
                    { value: 'price-asc', label: 'Price: Low to High' },
                    { value: 'price-desc', label: 'Price: High to Low' },
                    { value: 'name-asc', label: 'Name: A-Z' },
                  ].map((option) => (
                    <button
                      key={option.value}
                      onClick={() => { setSortBy(option.value); setShowSortDropdown(false); }}
                      className={`w-full px-4 py-2.5 text-left text-sm transition-colors ${
                        sortBy === option.value ? 'bg-blue-500/20 text-blue-400' : 'text-gray-300 hover:bg-[#252529]'
                      }`}
                    >
                      {option.label}
                    </button>
                  ))}
                </div>
              )}
            </div>
          </div>

          {/* Mobile Sort & Categories */}
          <div className="md:hidden mb-8 space-y-4" style={{ zIndex: 5, position: 'relative' }}>
            <select
              value={sortBy}
              onChange={(e) => setSortBy(e.target.value)}
              className="w-full rounded-lg px-3 py-2.5 text-white text-sm bg-[#1a1a1f] border border-[#252529] focus:outline-none focus:border-blue-500"
            >
              <option value="default">Default Sorting</option>
              <option value="price-asc">Price: Low to High</option>
              <option value="price-desc">Price: High to Low</option>
              <option value="name-asc">Name: A-Z</option>
            </select>
            <div className="flex flex-wrap justify-center gap-3" style={{ pointerEvents: 'auto' }}>
              {CATEGORIES.map((category) => (
                <button
                  key={category}
                  type="button"
                  onClick={() => setActiveCategory(category)}
                  style={{ pointerEvents: 'auto' }}
                  className={`px-4 py-2 rounded-lg text-xs font-medium transition-all ${
                    activeCategory === category 
                      ? 'bg-blue-600 text-white' 
                      : 'bg-[#1a1a1f] text-gray-400 border border-[#252529] hover:text-white'
                  }`}
                >
                  {category}
                </button>
              ))}
            </div>
          </div>

          {/* Loading */}
          {loading && (
            <div className="flex items-center justify-center py-32">
              <div className="flex flex-col items-center gap-4">
                <div className="w-12 h-12 rounded-full animate-spin" style={{ border: '3px solid #252529', borderTopColor: '#3b82f6' }}></div>
                <p className="text-gray-500 text-sm">Loading products...</p>
              </div>
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
          <div id="products" className="max-w-7xl mx-auto">
          {!loading && !error && filteredProducts.length > 0 && (
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-4">
              {filteredProducts.map((product, index) => (
                <motion.div
                  key={product.id}
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.3, delay: index * 0.05 }}
                  className="w-full"
                >
                  <ProductCard 
                    product={product} 
                    onViewDetails={setSelectedProduct}
                  />
                </motion.div>
              ))}
            </div>
          )}
          </div>
        </div>
      </main>

      {/* Footer */}
      <footer className="py-12 mt-12" style={{ borderTop: '1px solid #1a1a1f', backgroundColor: '#0a0a0c' }}>
        <div className="max-w-7xl mx-auto px-4">
          <div className="flex flex-col md:flex-row items-center justify-between gap-6">
            <div className="flex items-center gap-2">
              <div className="w-8 h-8 rounded-lg flex items-center justify-center" style={{ background: 'linear-gradient(135deg, #3b82f6 0%, #8b5cf6 100%)' }}>
                <Cpu className="text-white w-4 h-4" />
              </div>
              <span className="text-white font-bold">Adversity</span>
            </div>
            <div className="flex items-center gap-6 text-sm text-gray-500">
              <a href="#" className="hover:text-white transition-colors">About</a>
              <a href="#" className="hover:text-white transition-colors">Contact</a>
              <a href="#" className="hover:text-white transition-colors">Privacy</a>
              <a href="#" className="hover:text-white transition-colors">Terms</a>
            </div>
            <p className="text-gray-500 text-sm">© 2026 Adversity Store. All rights reserved.</p>
          </div>
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
