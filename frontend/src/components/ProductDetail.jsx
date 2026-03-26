import { useState } from 'react';
import { X, Heart, ShoppingCart, Plus, Minus, Check, Package, Truck, Shield } from 'lucide-react';
import { useCart } from '../context/CartContext';

const CATEGORY_IMAGES = {
  'CPU': 'https://images.unsplash.com/photo-1591799264318-7e6ef8ddb7ea?w=400&h=400&fit=crop',
  'GPU': 'https://images.unsplash.com/photo-1555685812-4b943f3db990?w=400&h=400&fit=crop',
  'Motherboard': 'https://images.unsplash.com/photo-1518770660439-4636190af475?w=400&h=400&fit=crop',
  'RAM': 'https://images.unsplash.com/photo-1562976540-1502c2145186?w=400&h=400&fit=crop',
  'SSD': 'https://images.unsplash.com/photo-1525547719571-a2d4ac8945e2?w=400&h=400&fit=crop',
  'Case': 'https://images.unsplash.com/photo-1587202372775-e229f172b9d7?w=400&h=400&fit=crop',
  'PSU': 'https://images.unsplash.com/photo-1605251307511-3f93f05b238c?w=400&h=400&fit=crop',
  'Cooler': 'https://images.unsplash.com/photo-1617305855058-336d24456869?w=400&h=400&fit=crop',
};

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

  const getImage = () => {
    if (!imageError && product.image_url) {
      return product.image_url;
    }
    return CATEGORY_IMAGES[product.category] || CATEGORY_IMAGES['CPU'];
  };

  return (
    <div className="fixed inset-0 z-50 overflow-y-auto">
      <div className="fixed inset-0 bg-black/70" onClick={onClose}></div>
      
      <div className="relative min-h-screen flex items-center justify-center p-4 py-8">
        <div 
          className="relative w-full max-w-3xl rounded-xl overflow-hidden"
          style={{ backgroundColor: '#1a1a22', border: '1px solid #2a2a35' }}
          onClick={e => e.stopPropagation()}
        >
          <button 
            onClick={onClose} 
            className="absolute top-3 right-3 z-10 p-2 rounded-lg hover:bg-[#2a2a35] text-gray-400 hover:text-white transition-colors"
          >
            <X size={18} />
          </button>

          <div className="grid grid-cols-1 md:grid-cols-2">
            <div className="aspect-square flex items-center justify-center overflow-hidden" style={{ backgroundColor: '#141418' }}>
              <img
                src={getImage()}
                alt={product.name}
                onError={() => setImageError(true)}
                className="w-full h-full object-cover"
              />
            </div>

            <div className="p-5">
              <div className="flex items-center gap-2 mb-2">
                <span className="px-2 py-0.5 rounded text-[10px] font-medium" style={{ backgroundColor: '#2a2a35', color: '#60a5fa' }}>
                  {product.category}
                </span>
                {product.is_preorder && (
                  <span className="px-2 py-0.5 rounded text-[10px] font-medium text-white"
                    style={{ background: 'linear-gradient(135deg, #f59e0b 0%, #ea580c 100%)' }}>
                    Pre-order
                  </span>
                )}
              </div>

              <h2 className="text-lg font-bold text-white mb-2 line-clamp-2">{product.name}</h2>
              
              <p className="text-cyan-400 font-bold text-2xl mb-4">
                ₱{Number(product.price).toLocaleString('en-PH')}
              </p>

              <div className="flex flex-wrap gap-2 mb-4">
                <div className="flex items-center gap-2 px-3 py-1.5 rounded-lg" style={{ backgroundColor: '#141418' }}>
                  <Package size={14} className="text-blue-400" />
                  <span className="text-gray-300 text-xs">In Stock</span>
                </div>
                <div className="flex items-center gap-2 px-3 py-1.5 rounded-lg" style={{ backgroundColor: '#141418' }}>
                  <Truck size={14} className="text-emerald-400" />
                  <span className="text-gray-300 text-xs">Free Shipping</span>
                </div>
                <div className="flex items-center gap-2 px-3 py-1.5 rounded-lg" style={{ backgroundColor: '#141418' }}>
                  <Shield size={14} className="text-purple-400" />
                  <span className="text-gray-300 text-xs">2 Yr Warranty</span>
                </div>
              </div>

              <div className="rounded-lg p-3 mb-4" style={{ backgroundColor: '#141418' }}>
                <div className="flex items-center justify-between mb-1">
                  <span className="text-gray-400 text-xs">Availability</span>
                  <span className="text-xs font-medium" style={{ color: product.stock_count > 10 ? '#34d399' : product.stock_count > 0 ? '#fbbf24' : '#f87171' }}>
                    {product.stock_count > 0 ? `${product.stock_count} available` : 'Out of stock'}
                  </span>
                </div>
              </div>

              {!isOutOfStock && (
                <div className="flex items-center gap-3 mb-4">
                  <div className="flex items-center rounded-lg" style={{ backgroundColor: '#141418' }}>
                    <button
                      onClick={() => setQuantity(q => Math.max(1, q - 1))}
                      className="p-2 hover:bg-[#2a2a35] text-gray-400 hover:text-white transition-colors rounded-l-lg"
                    >
                      <Minus size={14} />
                    </button>
                    <span className="text-white font-medium w-8 text-center text-sm">{quantity}</span>
                    <button
                      onClick={() => setQuantity(q => Math.min(product.stock_count, q + 1))}
                      className="p-2 hover:bg-[#2a2a35] text-gray-400 hover:text-white transition-colors rounded-r-lg"
                    >
                      <Plus size={14} />
                    </button>
                  </div>

                  <button
                    onClick={handleWishlist}
                    className="p-2 rounded-lg border transition-all"
                    style={inWishlist 
                      ? { borderColor: '#ef4444', backgroundColor: 'rgba(239, 68, 68, 0.1)', color: '#ef4444' }
                      : { borderColor: '#3a3a45', color: '#9ca3af' }
                    }
                  >
                    <Heart size={14} fill={inWishlist ? "currentColor" : "none"} />
                  </button>
                </div>
              )}

              <button
                onClick={handleAddToCart}
                disabled={isOutOfStock}
                className={`w-full py-2.5 rounded-lg font-medium text-sm transition-all hover:opacity-90 disabled:opacity-50 ${
                  isOutOfStock ? 'cursor-not-allowed' : ''
                }`}
                style={{
                  background: isOutOfStock ? '#27272a' : isAdded ? '#10b981' : 'linear-gradient(135deg, #3b82f6 0%, #1d4ed8 100%)',
                  color: isOutOfStock ? '#71717a' : 'white'
                }}
              >
                {isOutOfStock ? (
                  'OUT OF STOCK'
                ) : isAdded ? (
                  <>
                    <Check size={16} />
                    ADDED TO CART
                  </>
                ) : (
                  <>
                    <ShoppingCart size={14} />
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
