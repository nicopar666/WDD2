import { X, Heart, ShoppingCart, Trash2, ArrowRight } from 'lucide-react';
import { useCart } from '../context/CartContext';

export default function WishlistDrawer({ isOpen, onClose }) {
  const { wishlist, removeFromWishlist, addToCart } = useCart();

  if (!isOpen) return null;

  const handleAddToCart = (product) => {
    addToCart(product, 1);
    removeFromWishlist(product.id);
  };

  return (
    <div className="fixed inset-0 z-50">
      <div className="absolute inset-0 bg-black/60" onClick={onClose}></div>
      <div className="absolute right-0 top-0 h-full w-full max-w-md flex flex-col" style={{ backgroundColor: '#1a1a22', borderLeft: '1px solid #2a2a35' }}>
        <div className="p-6" style={{ borderBottom: '1px solid #2a2a35' }}>
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-3">
              <div className="p-2 rounded-xl" style={{ backgroundColor: 'rgba(239, 68, 68, 0.1)' }}>
                <Heart size={20} className="text-red-500" />
              </div>
              <div>
                <h2 className="text-lg font-bold text-white">Wishlist</h2>
                <p className="text-gray-500 text-sm">{wishlist.length} saved item{wishlist.length !== 1 ? 's' : ''}</p>
              </div>
            </div>
            <button onClick={onClose} className="p-2 rounded-lg hover:bg-[#2a2a35] text-gray-400 hover:text-white transition-colors">
              <X size={20} />
            </button>
          </div>
        </div>

        <div className="flex-1 overflow-y-auto p-6">
          {wishlist.length === 0 ? (
            <div className="text-center py-12">
              <div className="w-16 h-16 rounded-full flex items-center justify-center mx-auto mb-4" style={{ backgroundColor: '#141418' }}>
                <Heart size={28} className="text-gray-600" />
              </div>
              <p className="text-gray-400 mb-2">Your wishlist is empty</p>
              <p className="text-gray-600 text-sm mb-6">Save items you like for later</p>
              <button 
                onClick={onClose} 
                className="inline-flex items-center gap-2 text-blue-500 hover:text-blue-400 font-medium text-sm"
              >
                Browse Products
                <ArrowRight size={16} />
              </button>
            </div>
          ) : (
            <div className="space-y-3">
              {wishlist.map((product) => (
                <div key={product.id} className="flex gap-3 rounded-xl p-3" style={{ backgroundColor: '#141418' }}>
                  <div className="w-20 h-20 rounded-lg overflow-hidden flex items-center justify-center flex-shrink-0" style={{ backgroundColor: '#1a1a22' }}>
                    {product.image_url ? (
                      <img src={product.image_url} alt="" className="w-full h-full object-contain p-1" />
                    ) : (
                      <span className="text-xs text-gray-600">IMG</span>
                    )}
                  </div>
                  <div className="flex-1 min-w-0">
                    <h4 className="text-white font-medium text-sm line-clamp-2 mb-1">{product.name}</h4>
                    <p className="text-cyan-400 font-bold text-sm">₱{Number(product.price).toLocaleString('en-PH')}</p>
                    <div className="flex items-center justify-between mt-2">
                      <button
                        onClick={() => handleAddToCart(product)}
                        className="flex items-center gap-1.5 text-xs text-blue-500 hover:text-blue-400 font-medium"
                      >
                        <ShoppingCart size={12} />
                        Add to Cart
                      </button>
                      <button
                        onClick={() => removeFromWishlist(product.id)}
                        className="p-1.5 text-red-500 hover:bg-red-500/10 rounded-lg transition-colors"
                      >
                        <Trash2 size={14} />
                      </button>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
