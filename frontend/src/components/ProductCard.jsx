import { useState, memo } from 'react';
import { Heart, ShoppingCart, Eye, Plus, Minus, Check } from 'lucide-react';
import { useCart } from '../context/CartContext';

const CATEGORY_IMAGES = {
  'CPU': 'https://images.unsplash.com/photo-1591799264318-7e6ef8ddb7ea?w=400&h=400&fit=crop&q=80',
  'GPU': 'https://images.unsplash.com/photo-1555685812-4b943f3db990?w=400&h=400&fit=crop&q=80',
  'Motherboard': 'https://images.unsplash.com/photo-1518770660439-4636190af475?w=400&h=400&fit=crop&q=80',
  'RAM': 'https://images.unsplash.com/photo-1562976540-1502c2145186?w=400&h=400&fit=crop&q=80',
  'SSD': 'https://images.unsplash.com/photo-1525547719571-a2d4ac8945e2?w=400&h=400&fit=crop&q=80',
  'Case': 'https://images.unsplash.com/photo-1587202372775-e229f172b9d7?w=400&h=400&fit=crop&q=80',
  'PSU': 'https://images.unsplash.com/photo-1605251307511-3f93f05b238c?w=400&h=400&fit=crop&q=80',
  'Cooler': 'https://images.unsplash.com/photo-1617305855058-336d24456869?w=400&h=400&fit=crop&q=80',
};

function ProductCard({ product, onViewDetails }) {
  const [quantity, setQuantity] = useState(1);
  const [imageError, setImageError] = useState(false);
  const [isAdded, setIsAdded] = useState(false);
  const [imageLoaded, setImageLoaded] = useState(false);
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

  const getImage = () => {
    if (!imageError && product.image_url) {
      return product.image_url;
    }
    return CATEGORY_IMAGES[product.category] || CATEGORY_IMAGES['CPU'];
  };

  return (
    <div 
      onClick={handleViewDetails}
      className="group relative bg-[#1a1a22] rounded-xl overflow-hidden border border-[#2a2a35] hover:border-blue-500/50 transition-all duration-300 cursor-pointer hover:-translate-y-1"
    >
      <div className="relative h-48 overflow-hidden bg-[#141418]">
        {!imageLoaded && (
          <div className="absolute inset-0 flex items-center justify-center bg-[#141418]">
            <div className="w-8 h-8 border-2 border-blue-500/30 border-t-blue-500 rounded-full animate-spin" />
          </div>
        )}
        <img
          src={getImage()}
          alt={product.name}
          loading="lazy"
          onLoad={() => setImageLoaded(true)}
          onError={() => setImageError(true)}
          className={`w-full h-full object-cover transition-transform duration-500 group-hover:scale-110 ${imageLoaded ? 'opacity-100' : 'opacity-0'}`}
        />

        <div className="absolute top-2 left-2 flex flex-col gap-1">
          {product.is_preorder && (
            <span className="px-2 py-0.5 rounded text-[10px] font-semibold text-white bg-gradient-to-r from-amber-500 to-orange-500">
              PRE-ORDER
            </span>
          )}
        </div>

        {product.stock_count > 0 && product.stock_count <= 5 && (
          <span className="absolute top-2 right-2 px-2 py-0.5 rounded text-[10px] font-medium text-white bg-red-500">
            {product.stock_count} left
          </span>
        )}

        <div className="absolute top-2 right-2 flex flex-col gap-1 opacity-0 group-hover:opacity-100 transition-opacity duration-200">
          <button
            onClick={handleWishlist}
            className="p-1.5 rounded-lg bg-black/70 text-white hover:bg-red-500 transition-colors"
          >
            <Heart size={12} fill={inWishlist ? "currentColor" : "none"} />
          </button>
          <button
            onClick={handleViewDetails}
            className="p-1.5 rounded-lg bg-black/70 text-white hover:bg-blue-500 transition-colors"
          >
            <Eye size={12} />
          </button>
        </div>
      </div>
      
      <div className="p-3">
        <p className="text-[10px] font-medium uppercase tracking-wider text-gray-500 mb-1">{product.category}</p>
        
        <h3 className="text-white font-medium text-sm leading-snug mb-2 line-clamp-2 h-10">
          {product.name}
        </h3>
        
        <p className="text-cyan-400 font-bold text-lg mb-2">
          ₱{Number(product.price).toLocaleString('en-PH')}
        </p>

        <p className={`text-xs mb-3 ${product.stock_count > 10 ? 'text-emerald-400' : product.stock_count > 0 ? 'text-amber-400' : 'text-red-400'}`}>
          {product.stock_count > 0 ? `${product.stock_count} in stock` : 'Out of stock'}
        </p>

        {!isOutOfStock && (
          <div className="flex items-center gap-2 mb-3">
            <div className="flex items-center flex-1 rounded-lg bg-[#141418]">
              <button
                onClick={(e) => { e.stopPropagation(); setQuantity(q => Math.max(1, q - 1)); }}
                className="p-1.5 text-gray-400 hover:text-white transition-colors"
              >
                <Minus size={12} />
              </button>
              <span className="flex-1 text-center text-white text-xs font-medium">{quantity}</span>
              <button
                onClick={(e) => { e.stopPropagation(); setQuantity(q => Math.min(product.stock_count, q + 1)); }}
                className="p-1.5 text-gray-400 hover:text-white transition-colors"
              >
                <Plus size={12} />
              </button>
            </div>
          </div>
        )}

        <button
          onClick={handleAddToCart}
          disabled={isOutOfStock}
          className={`w-full py-2 rounded-lg font-medium text-sm flex items-center justify-center gap-2 transition-all ${
            isOutOfStock 
              ? 'bg-zinc-800 text-zinc-500 cursor-not-allowed' 
              : isAdded
                ? 'bg-emerald-500 text-white'
                : 'bg-gradient-to-r from-blue-600 to-blue-700 text-white hover:from-blue-500 hover:to-blue-600'
          }`}
        >
          {isOutOfStock ? (
            'OUT OF STOCK'
          ) : isAdded ? (
            <>
              <Check size={14} />
              ADDED
            </>
          ) : (
            <>
              <ShoppingCart size={14} />
              ADD TO CART
            </>
          )}
        </button>
      </div>
    </div>
  );
}

export default memo(ProductCard);
