import { X, Plus, Minus, Trash2, ShoppingBag, ArrowRight, ArrowLeft } from 'lucide-react';
import { useCart } from '../context/CartContext';

export default function CartDrawer({ isOpen, onClose, onCheckout }) {
  const { cart, updateQuantity, removeFromCart, cartTotal, clearCart } = useCart();

  if (!isOpen) return null;

  const shippingFree = cartTotal >= 10000;
  const shippingAmount = shippingFree ? 0 : 350;

  return (
    <div className="fixed inset-0 z-50">
      <div className="absolute inset-0 bg-black/60" onClick={onClose}></div>
      <div className="absolute right-0 top-0 h-full w-full max-w-md flex flex-col" style={{ backgroundColor: '#1a1a22', borderLeft: '1px solid #2a2a35' }}>
        <div className="p-6" style={{ borderBottom: '1px solid #2a2a35' }}>
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-3">
              <div className="p-2 rounded-xl" style={{ backgroundColor: 'rgba(59, 130, 246, 0.1)' }}>
                <ShoppingBag size={20} className="text-blue-500" />
              </div>
              <div>
                <h2 className="text-lg font-bold text-white">Your Cart</h2>
                <p className="text-gray-500 text-sm">{cart.length} item{cart.length !== 1 ? 's' : ''}</p>
              </div>
            </div>
            <button onClick={onClose} className="p-2 rounded-lg hover:bg-[#2a2a35] text-gray-400 hover:text-white transition-colors">
              <X size={20} />
            </button>
          </div>
        </div>

        <div className="flex-1 overflow-y-auto p-6">
          {cart.length === 0 ? (
            <div className="text-center py-12">
              <div className="w-16 h-16 rounded-full flex items-center justify-center mx-auto mb-4" style={{ backgroundColor: '#141418' }}>
                <ShoppingBag size={28} className="text-gray-600" />
              </div>
              <p className="text-gray-400 mb-2">Your cart is empty</p>
              <p className="text-gray-600 text-sm mb-6">Add products to get started</p>
              <button 
                onClick={onClose} 
                className="inline-flex items-center gap-2 text-blue-500 hover:text-blue-400 font-medium text-sm"
              >
                <ArrowLeft size={16} />
                Continue Shopping
              </button>
            </div>
          ) : (
            <div className="space-y-3">
              {cart.map((item) => (
                <div key={item.product.id} className="flex gap-3 rounded-xl p-3" style={{ backgroundColor: '#141418' }}>
                  <div className="w-20 h-20 rounded-lg overflow-hidden flex items-center justify-center flex-shrink-0" style={{ backgroundColor: '#1a1a22' }}>
                    {item.product.image_url ? (
                      <img src={item.product.image_url} alt="" className="w-full h-full object-contain p-1" />
                    ) : (
                      <span className="text-xs text-gray-600">IMG</span>
                    )}
                  </div>
                  <div className="flex-1 min-w-0">
                    <h4 className="text-white font-medium text-sm line-clamp-2 mb-1">{item.product.name}</h4>
                    <p className="text-cyan-400 font-bold text-sm">₱{Number(item.product.price).toLocaleString('en-PH')}</p>
                    <div className="flex items-center justify-between mt-2">
                      <div className="flex items-center rounded-lg" style={{ backgroundColor: '#1a1a22' }}>
                        <button
                          onClick={() => updateQuantity(item.product.id, item.quantity - 1)}
                          className="p-1.5 text-gray-400 hover:text-white transition-colors"
                        >
                          <Minus size={12} />
                        </button>
                        <span className="text-white text-xs w-6 text-center font-medium">{item.quantity}</span>
                        <button
                          onClick={() => updateQuantity(item.product.id, item.quantity + 1)}
                          className="p-1.5 text-gray-400 hover:text-white transition-colors"
                        >
                          <Plus size={12} />
                        </button>
                      </div>
                      <button
                        onClick={() => removeFromCart(item.product.id)}
                        className="p-1.5 text-red-500 hover:bg-red-500/10 rounded-lg transition-colors"
                      >
                        <Trash2 size={14} />
                      </button>
                    </div>
                  </div>
                  <div className="text-right">
                    <p className="text-white font-bold text-sm">
                      ₱{(item.product.price * item.quantity).toLocaleString('en-PH')}
                    </p>
                  </div>
                </div>
              ))}
            </div>
          )}
        </div>

        {cart.length > 0 && (
          <div className="p-6" style={{ borderTop: '1px solid #2a2a35', backgroundColor: '#141418' }}>
            <div className="space-y-2 mb-4">
              <div className="flex items-center justify-between">
                <span className="text-gray-400 text-sm">Subtotal</span>
                <span className="text-white font-medium">₱{cartTotal.toLocaleString('en-PH')}</span>
              </div>
              <div className="flex items-center justify-between">
                <span className="text-gray-400 text-sm">Shipping</span>
                <span className={shippingFree ? 'text-emerald-500' : 'text-gray-400'}>
                  {shippingFree ? 'FREE' : `₱${shippingAmount}`}
                </span>
              </div>
              {!shippingFree && (
                <p className="text-xs text-gray-500">Add ₱{(10000 - cartTotal).toLocaleString('en-PH')} more for free shipping</p>
              )}
              <div className="flex items-center justify-between pt-2" style={{ borderTop: '1px solid #2a2a35' }}>
                <span className="text-white font-bold">Total</span>
                <span className="text-cyan-400 font-bold text-xl">
                  ₱{(cartTotal + (shippingFree ? 0 : shippingAmount)).toLocaleString('en-PH')}
                </span>
              </div>
            </div>
            <button
              onClick={() => { onClose(); onCheckout(); }}
              className="w-full py-3.5 rounded-xl font-bold text-white flex items-center justify-center gap-2 transition-all"
              style={{ background: 'linear-gradient(135deg, #3b82f6 0%, #2563eb 100%)' }}
            >
              CHECKOUT
              <ArrowRight size={18} />
            </button>
            <button
              onClick={clearCart}
              className="w-full py-2 mt-2 text-gray-500 hover:text-red-400 text-sm transition-colors"
            >
              Clear Cart
            </button>
          </div>
        )}
      </div>
    </div>
  );
}
