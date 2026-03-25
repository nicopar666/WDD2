import { useState } from 'react';
import { X, Heart, ShoppingCart, Plus, Minus, Star, Check, ChevronRight, Package, Truck, Shield } from 'lucide-react';
import { useCart } from '../context/CartContext';

export default function ProductDetail({ product, onClose }) {
  const [quantity, setQuantity] = useState(1);
  const [imageError, setImageError] = useState(false);
  const [isAdded, setIsAdded] = useState(false);
  const { addToCart, addToWishlist, removeFromWishlist, isInWishlist } = useCart();

  if (!product) return null;

  const isOutOfStock = product.stock_count <= 0 && !product.is_preorder;
  const inWishlist = isInWishlist(product.id);

  const handleAddToCart = () => {
    if (!isOutOfStock) {
      addToCart(product, quantity);
      setIsAdded(true);
      setTimeout(() => {
        setIsAdded(false);
        onClose();
      }, 1500);
    }
  };

  const handleWishlist = () => {
    if (inWishlist) {
      removeFromWishlist(product.id);
    } else {
      addToWishlist(product);
    }
  };

  const getInitials = (name) => {
    return name.split(' ').slice(0, 2).map(w => w[0]).join('').toUpperCase();
  };

  return (
    <div className="fixed inset-0 z-50 overflow-y-auto">
      <div className="fixed inset-0 bg-black/70" onClick={onClose}></div>
      
      <div className="relative min-h-screen flex items-center justify-center p-4 py-8">
        <div 
          className="relative w-full max-w-4xl rounded-2xl overflow-hidden animate-fade-in"
          style={{ backgroundColor: '#1a1a22', border: '1px solid #2a2a35' }}
          onClick={e => e.stopPropagation()}
        >
          <button 
            onClick={onClose} 
            className="absolute top-4 right-4 z-10 p-2 rounded-lg hover:bg-[#2a2a35] text-gray-400 hover:text-white transition-colors"
          >
            <X size={22} />
          </button>

          <div className="grid grid-cols-1 md:grid-cols-2">
            {/* Image */}
            <div className="aspect-square sm:aspect-auto flex items-center justify-center p-8" style={{ backgroundColor: '#141418' }}>
              {!imageError && product.image_url ? (
                <img
                  src={product.image_url}
                  alt={product.name}
                  onError={() => setImageError(true)}
                  className="w-full h-full max-w-xs object-contain"
                />
              ) : (
                <span className="text-7xl font-bold" style={{ color: '#3a3a45' }}>
                  {getInitials(product.name)}
                </span>
              )}
            </div>

            {/* Details */}
            <div className="p-6 sm:p-8">
              <div className="flex items-center gap-2 mb-3">
                <span className="px-3 py-1 rounded-full text-xs font-medium" style={{ backgroundColor: '#2a2a35', color: '#60a5fa' }}>
                  {product.category}
                </span>
                {product.is_preorder && (
                  <span className="px-3 py-1 rounded-full text-xs font-medium text-white"
                    style={{ background: 'linear-gradient(135deg, #f59e0b 0%, #ea580c 100%)' }}>
                    Pre-order
                  </span>
                )}
              </div>

              <h2 className="text-2xl font-bold text-white mb-3">{product.name}</h2>
              
              <div className="flex items-center gap-2 mb-4">
                <div className="flex items-center gap-0.5">
                  {[...Array(5)].map((_, i) => (
                    <Star key={i} size={16} className="text-yellow-400 fill-yellow-400" />
                  ))}
                </div>
                <span className="text-gray-500 text-sm">(24 reviews)</span>
              </div>

              <p className="text-cyan-400 font-bold text-4xl mb-6">
                ₱{Number(product.price).toLocaleString('en-PH')}
              </p>

              {/* Features */}
              <div className="flex flex-wrap gap-2 mb-6">
                <div className="flex items-center gap-2 px-3 py-2 rounded-xl" style={{ backgroundColor: '#141418' }}>
                  <Package size={16} className="text-blue-400" />
                  <span className="text-gray-300 text-xs">In Stock</span>
                </div>
                <div className="flex items-center gap-2 px-3 py-2 rounded-xl" style={{ backgroundColor: '#141418' }}>
                  <Truck size={16} className="text-emerald-400" />
                  <span className="text-gray-300 text-xs">Free Shipping</span>
                </div>
                <div className="flex items-center gap-2 px-3 py-2 rounded-xl" style={{ backgroundColor: '#141418' }}>
                  <Shield size={16} className="text-purple-400" />
                  <span className="text-gray-300 text-xs">2 Yr Warranty</span>
                </div>
              </div>

              {/* Stock Bar */}
              <div className="rounded-xl p-4 mb-6" style={{ backgroundColor: '#141418' }}>
                <div className="flex items-center justify-between mb-2">
                  <span className="text-gray-400 text-sm">Availability</span>
                  <span className="text-sm font-medium" style={{ color: product.stock_count > 10 ? '#34d399' : product.stock_count > 0 ? '#fbbf24' : '#f87171' }}>
                    {product.stock_count > 0 ? `${product.stock_count} available` : 'Out of stock'}
                  </span>
                </div>
                <div className="h-1.5 rounded-full overflow-hidden" style={{ backgroundColor: '#2a2a35' }}>
                  <div 
                    className="h-full rounded-full"
                    style={{ 
                      width: `${Math.min((product.stock_count / 50) * 100, 100)}%`,
                      background: product.stock_count > 10 ? 'linear-gradient(90deg, #34d399, #10b981)' : product.stock_count > 0 ? 'linear-gradient(90deg, #fbbf24, #f59e0b)' : '#dc2626'
                    }}
                  />
                </div>
              </div>

              {/* Quantity & Actions */}
              {!isOutOfStock && (
                <div className="flex items-center gap-3 mb-6">
                  <div className="flex items-center rounded-xl" style={{ backgroundColor: '#141418' }}>
                    <button
                      onClick={() => setQuantity(q => Math.max(1, q - 1))}
                      className="p-3 hover:bg-[#2a2a35] text-gray-400 hover:text-white transition-colors rounded-l-xl"
                    >
                      <Minus size={18} />
                    </button>
                    <span className="text-white font-semibold w-12 text-center">{quantity}</span>
                    <button
                      onClick={() => setQuantity(q => Math.min(product.stock_count, q + 1))}
                      className="p-3 hover:bg-[#2a2a35] text-gray-400 hover:text-white transition-colors rounded-r-xl"
                    >
                      <Plus size={18} />
                    </button>
                  </div>

                  <button
                    onClick={handleWishlist}
                    className="p-3 rounded-xl border transition-all"
                    style={inWishlist 
                      ? { borderColor: '#ef4444', backgroundColor: 'rgba(239, 68, 68, 0.1)', color: '#ef4444' }
                      : { borderColor: '#3a3a45', color: '#9ca3af' }
                    }
                  >
                    <Heart size={18} fill={inWishlist ? "currentColor" : "none"} />
                  </button>
                </div>
              )}

              <button
                onClick={handleAddToCart}
                disabled={isOutOfStock}
                className="w-full py-4 rounded-xl font-bold transition-all flex items-center justify-center gap-2"
                style={isOutOfStock
                  ? { backgroundColor: '#27272a', color: '#71717a', cursor: 'not-allowed' }
                  : isAdded
                    ? { backgroundColor: '#10b981', color: 'white' }
                    : { background: 'linear-gradient(135deg, #3b82f6 0%, #2563eb 100%)', color: 'white' }
                }
              >
                {isOutOfStock ? (
                  'OUT OF STOCK'
                ) : isAdded ? (
                  <>
                    <Check size={20} />
                    ADDED TO CART
                  </>
                ) : (
                  <>
                    <ShoppingCart size={20} />
                    ADD TO CART - ₱{(product.price * quantity).toLocaleString('en-PH')}
                  </>
                )}
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
