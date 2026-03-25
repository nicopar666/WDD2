import { useState } from 'react';
import { Heart, ShoppingCart, Eye, Plus, Minus, Star, Check } from 'lucide-react';
import { useCart } from '../context/CartContext';

export default function ProductCard({ product, onViewDetails }) {
  const [quantity, setQuantity] = useState(1);
  const [imageError, setImageError] = useState(false);
  const [isAdded, setIsAdded] = useState(false);
  const { addToCart, addToWishlist, removeFromWishlist, isInWishlist } = useCart();

  const isOutOfStock = product.stock_count <= 0 && !product.is_preorder;
  const inWishlist = isInWishlist(product.id);

  const handleAddToCart = (e) => {
    e.stopPropagation();
    if (!isOutOfStock) {
      addToCart(product, quantity);
      setIsAdded(true);
      setTimeout(() => {
        setIsAdded(false);
        setQuantity(1);
      }, 1500);
    }
  };

  const handleWishlist = (e) => {
    e.stopPropagation();
    if (inWishlist) {
      removeFromWishlist(product.id);
    } else {
      addToWishlist(product);
    }
  };

  const handleViewDetails = (e) => {
    e.stopPropagation();
    onViewDetails?.(product);
  };

  const getInitials = (name) => {
    return name.split(' ').slice(0, 2).map(w => w[0]).join('').toUpperCase();
  };

  return (
    <div 
      onClick={handleViewDetails}
      className="product-card rounded-2xl overflow-hidden cursor-pointer w-full"
      style={{ backgroundColor: '#1a1a22', border: '1px solid #2a2a35' }}
    >
      {/* Image Area */}
      <div className="relative h-44 flex items-center justify-center" style={{ backgroundColor: '#141418' }}>
        {!imageError && product.image_url ? (
          <img
            src={product.image_url}
            alt={product.name}
            onError={() => setImageError(true)}
            className="w-full h-full object-contain p-4"
          />
        ) : (
          <span className="text-4xl font-bold" style={{ color: '#3a3a45' }}>
            {getInitials(product.name)}
          </span>
        )}

        {/* Badges */}
        <div className="absolute top-3 left-3 flex flex-col gap-2">
          {product.is_preorder && (
            <span className="px-2.5 py-1 rounded-lg text-xs font-semibold text-white"
              style={{ background: 'linear-gradient(135deg, #f59e0b 0%, #ea580c 100%)' }}>
              PRE-ORDER
            </span>
          )}
        </div>

        {product.stock_count > 0 && product.stock_count <= 5 && (
          <span className="absolute top-3 right-3 px-2 py-1 rounded-md text-xs font-medium text-white"
            style={{ backgroundColor: '#dc2626' }}>
            {product.stock_count} left
          </span>
        )}

        {/* Action Buttons */}
        <div className="absolute top-3 right-3 flex flex-col gap-2">
          <button
            onClick={handleWishlist}
            className="p-2 rounded-lg transition-all"
            style={inWishlist ? { backgroundColor: '#ef4444', color: 'white' } : { backgroundColor: 'rgba(0,0,0,0.5)', color: 'white' }}
          >
            <Heart size={14} fill={inWishlist ? "currentColor" : "none"} />
          </button>
          <button
            onClick={handleViewDetails}
            className="p-2 rounded-lg transition-all bg-black/50 text-white hover:bg-black/70"
          >
            <Eye size={14} />
          </button>
        </div>
      </div>
      
      {/* Content */}
      <div className="p-4">
        <p className="text-xs font-medium uppercase tracking-wider mb-1" style={{ color: '#6b7280' }}>{product.category}</p>
        
        <h3 className="text-white font-semibold text-sm leading-snug mb-2 line-clamp-2" style={{ minHeight: '2.5rem' }}>
          {product.name}
        </h3>

        {/* Stars */}
        <div className="flex items-center gap-0.5 mb-3">
          {[...Array(5)].map((_, i) => (
            <Star key={i} size={12} className="text-yellow-400 fill-yellow-400" />
          ))}
        </div>
        
        <p className="text-cyan-400 font-bold text-xl mb-3">
          ₱{Number(product.price).toLocaleString('en-PH')}
        </p>

        <p className="text-xs mb-4" style={{ color: product.stock_count > 10 ? '#34d399' : product.stock_count > 0 ? '#fbbf24' : '#f87171' }}>
          {product.stock_count > 0 ? `${product.stock_count} in stock` : 'Out of stock'}
        </p>

        {/* Quantity & Button */}
        {!isOutOfStock && (
          <div className="flex items-center gap-2 mb-3">
            <div className="flex items-center flex-1 rounded-lg" style={{ backgroundColor: '#141418' }}>
              <button
                onClick={(e) => { e.stopPropagation(); setQuantity(q => Math.max(1, q - 1)); }}
                className="p-2 text-gray-400 hover:text-white transition-colors"
              >
                <Minus size={14} />
              </button>
              <span className="flex-1 text-center text-white text-sm font-medium">{quantity}</span>
              <button
                onClick={(e) => { e.stopPropagation(); setQuantity(q => Math.min(product.stock_count, q + 1)); }}
                className="p-2 text-gray-400 hover:text-white transition-colors"
              >
                <Plus size={14} />
              </button>
            </div>
          </div>
        )}

        <button
          onClick={handleAddToCart}
          disabled={isOutOfStock}
          className="w-full py-2.5 rounded-xl font-semibold text-sm flex items-center justify-center gap-2 transition-all"
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
              <Check size={16} />
              ADDED
            </>
          ) : (
            <>
              <ShoppingCart size={16} />
              ADD TO CART
            </>
          )}
        </button>
      </div>
    </div>
  );
}
