import { useState } from 'react';
import { X, MapPin, Truck, Store, CreditCard, Check, ChevronRight, User } from 'lucide-react';
import { useCart } from '../context/CartContext';
import { createOrder } from '../services/api';

export default function CheckoutModal({ onClose }) {
  const { cart, cartTotal, clearCart } = useCart();
  const [loading, setLoading] = useState(false);
  const [success, setSuccess] = useState(false);
  const [error, setError] = useState('');
  const [formData, setFormData] = useState({
    customer_name: '',
    email: '',
    phone: '',
    delivery_type: 'delivery',
    shipping_address: '',
    payment_gateway: 'Cash on Delivery',
  });

  const shippingFree = cartTotal >= 10000;
  const shippingAmount = shippingFree ? 0 : 350;
  const finalTotal = cartTotal + shippingAmount;

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    setError('');

    try {
      for (const item of cart) {
        await createOrder({
          customer_name: formData.customer_name,
          product_id: item.product.id,
          quantity: item.quantity,
          email: formData.email,
          phone: formData.phone,
          delivery_type: formData.delivery_type,
          shipping_address: formData.shipping_address,
          payment_gateway: formData.payment_gateway,
        });
      }
      
      setSuccess(true);
      setTimeout(() => {
        clearCart();
        onClose();
      }, 3000);
    } catch (err) {
      setError(err.message || 'Order failed. Please try again.');
    } finally {
      setLoading(false);
    }
  };

  const paymentMethods = ['Cash on Delivery', 'GCash', 'Maya', 'Visa', 'Mastercard'];

  if (success) {
    return (
      <div className="fixed inset-0 z-50 overflow-y-auto">
        <div className="fixed inset-0 bg-black/70" onClick={onClose}></div>
        <div className="relative min-h-screen flex items-center justify-center p-4">
          <div className="relative w-full max-w-md rounded-2xl p-8 text-center animate-fade-in" style={{ backgroundColor: '#1a1a22', border: '1px solid #2a2a35' }}>
            <div className="w-20 h-20 rounded-full flex items-center justify-center mx-auto mb-6" style={{ background: 'linear-gradient(135deg, #10b981 0%, #059669 100%)' }}>
              <Check size={40} className="text-white" />
            </div>
            <h2 className="text-2xl font-bold text-white mb-2">Order Placed!</h2>
            <p className="text-gray-400 mb-6">Thank you for your purchase. A confirmation email has been sent.</p>
            <button
              onClick={onClose}
              className="w-full py-3.5 rounded-xl font-bold text-white"
              style={{ background: 'linear-gradient(135deg, #3b82f6 0%, #2563eb 100%)' }}
            >
              CONTINUE SHOPPING
            </button>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="fixed inset-0 z-50 overflow-y-auto">
      <div className="fixed inset-0 bg-black/70" onClick={onClose}></div>
      <div className="relative min-h-screen flex items-center justify-center p-4 py-8">
        <div 
          className="relative w-full max-w-2xl rounded-2xl overflow-hidden max-h-[90vh] overflow-y-auto"
          style={{ backgroundColor: '#1a1a22', border: '1px solid #2a2a35' }}
          onClick={e => e.stopPropagation()}
        >
          <div className="sticky top-0 px-6 py-4 flex items-center justify-between" style={{ backgroundColor: '#1a1a22', borderBottom: '1px solid #2a2a35' }}>
            <h2 className="text-lg font-bold text-white">Checkout</h2>
            <button onClick={onClose} className="p-2 rounded-lg hover:bg-[#2a2a35] text-gray-400 hover:text-white transition-colors">
              <X size={20} />
            </button>
          </div>

          <form onSubmit={handleSubmit} className="p-6 space-y-6">
            {/* Contact */}
            <div>
              <h3 className="text-white font-semibold mb-4 flex items-center gap-2">
                <User size={18} className="text-blue-500" />
                Contact Information
              </h3>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
                <input
                  type="text"
                  placeholder="Full Name *"
                  value={formData.customer_name}
                  onChange={e => setFormData({...formData, customer_name: e.target.value})}
                  className="w-full px-4 py-3 rounded-xl text-white placeholder-gray-500 focus:outline-none input-dark"
                  style={{ backgroundColor: '#141418', border: '1px solid #2a2a35' }}
                  required
                />
                <input
                  type="email"
                  placeholder="Email *"
                  value={formData.email}
                  onChange={e => setFormData({...formData, email: e.target.value})}
                  className="w-full px-4 py-3 rounded-xl text-white placeholder-gray-500 focus:outline-none input-dark"
                  style={{ backgroundColor: '#141418', border: '1px solid #2a2a35' }}
                  required
                />
                <input
                  type="tel"
                  placeholder="Phone *"
                  value={formData.phone}
                  onChange={e => setFormData({...formData, phone: e.target.value})}
                  className="w-full px-4 py-3 rounded-xl text-white placeholder-gray-500 focus:outline-none input-dark md:col-span-2"
                  style={{ backgroundColor: '#141418', border: '1px solid #2a2a35' }}
                  required
                />
              </div>
            </div>

            {/* Delivery */}
            <div>
              <h3 className="text-white font-semibold mb-4 flex items-center gap-2">
                <Truck size={18} className="text-blue-500" />
                Delivery Method
              </h3>
              <div className="grid grid-cols-2 gap-3">
                <label className={`flex items-center gap-3 p-4 rounded-xl border cursor-pointer transition-all ${
                  formData.delivery_type === 'delivery' 
                    ? 'border-blue-500' 
                    : 'border-[#2a2a35] hover:border-gray-600'
                }`} style={formData.delivery_type === 'delivery' ? { backgroundColor: 'rgba(59, 130, 246, 0.1)' } : {}}>
                  <input
                    type="radio"
                    name="delivery_type"
                    value="delivery"
                    checked={formData.delivery_type === 'delivery'}
                    onChange={e => setFormData({...formData, delivery_type: e.target.value})}
                    className="hidden"
                  />
                  <Truck size={20} className={formData.delivery_type === 'delivery' ? 'text-blue-500' : 'text-gray-500'} />
                  <span className={formData.delivery_type === 'delivery' ? 'text-white' : 'text-gray-400'}>Delivery</span>
                </label>
                <label className={`flex items-center gap-3 p-4 rounded-xl border cursor-pointer transition-all ${
                  formData.delivery_type === 'pickup' 
                    ? 'border-blue-500' 
                    : 'border-[#2a2a35] hover:border-gray-600'
                }`} style={formData.delivery_type === 'pickup' ? { backgroundColor: 'rgba(59, 130, 246, 0.1)' } : {}}>
                  <input
                    type="radio"
                    name="delivery_type"
                    value="pickup"
                    checked={formData.delivery_type === 'pickup'}
                    onChange={e => setFormData({...formData, delivery_type: e.target.value})}
                    className="hidden"
                  />
                  <Store size={20} className={formData.delivery_type === 'pickup' ? 'text-blue-500' : 'text-gray-500'} />
                  <span className={formData.delivery_type === 'pickup' ? 'text-white' : 'text-gray-400'}>Pickup</span>
                </label>
              </div>
            </div>

            {formData.delivery_type === 'delivery' && (
              <div>
                <h3 className="text-white font-semibold mb-4 flex items-center gap-2">
                  <MapPin size={18} className="text-blue-500" />
                  Shipping Address
                </h3>
                <textarea
                  placeholder="Enter your complete address *"
                  value={formData.shipping_address}
                  onChange={e => setFormData({...formData, shipping_address: e.target.value})}
                  className="w-full px-4 py-3 rounded-xl text-white placeholder-gray-500 focus:outline-none input-dark h-24 resize-none"
                  style={{ backgroundColor: '#141418', border: '1px solid #2a2a35' }}
                  required={formData.delivery_type === 'delivery'}
                />
              </div>
            )}

            {/* Payment */}
            <div>
              <h3 className="text-white font-semibold mb-4 flex items-center gap-2">
                <CreditCard size={18} className="text-blue-500" />
                Payment Method
              </h3>
              <div className="grid grid-cols-2 sm:grid-cols-3 gap-2">
                {paymentMethods.map((method) => (
                  <label key={method} className={`flex items-center justify-center p-3 rounded-xl border cursor-pointer transition-all ${
                    formData.payment_gateway === method 
                      ? 'border-blue-500' 
                      : 'border-[#2a2a35] hover:border-gray-600'
                  }`} style={formData.payment_gateway === method ? { backgroundColor: 'rgba(59, 130, 246, 0.1)' } : {}}>
                    <input
                      type="radio"
                      name="payment_gateway"
                      value={method}
                      checked={formData.payment_gateway === method}
                      onChange={e => setFormData({...formData, payment_gateway: e.target.value})}
                      className="hidden"
                    />
                    <span className={`text-xs ${formData.payment_gateway === method ? 'text-white' : 'text-gray-400'}`}>
                      {method}
                    </span>
                  </label>
                ))}
              </div>
            </div>

            {/* Summary */}
            <div className="rounded-xl p-4" style={{ backgroundColor: '#141418' }}>
              <h4 className="text-white font-semibold mb-3">Order Summary</h4>
              <div className="space-y-2 text-sm max-h-32 overflow-y-auto">
                {cart.map(item => (
                  <div key={item.product.id} className="flex justify-between text-gray-400">
                    <span className="line-clamp-1 flex-1 mr-4">{item.product.name} x{item.quantity}</span>
                    <span className="text-white">₱{(item.product.price * item.quantity).toLocaleString('en-PH')}</span>
                  </div>
                ))}
              </div>
              <div className="mt-4 pt-3 space-y-2" style={{ borderTop: '1px solid #2a2a35' }}>
                <div className="flex justify-between text-gray-400 text-sm">
                  <span>Subtotal</span>
                  <span className="text-white">₱{cartTotal.toLocaleString('en-PH')}</span>
                </div>
                <div className="flex justify-between text-gray-400 text-sm">
                  <span>Shipping</span>
                  <span className={shippingFree ? 'text-emerald-500' : ''}>{shippingFree ? 'FREE' : `₱${shippingAmount}`}</span>
                </div>
                <div className="flex justify-between text-white font-bold pt-2" style={{ borderTop: '1px solid #2a2a35' }}>
                  <span>Total</span>
                  <span className="text-cyan-400 text-lg">₱{finalTotal.toLocaleString('en-PH')}</span>
                </div>
              </div>
            </div>

            {error && (
              <div className="rounded-xl px-4 py-3 text-sm" style={{ backgroundColor: 'rgba(239, 68, 68, 0.1)', border: '1px solid rgba(239, 68, 68, 0.3)', color: '#f87171' }}>
                {error}
              </div>
            )}

            <button
              type="submit"
              disabled={loading}
              className="w-full py-4 rounded-xl font-bold text-white flex items-center justify-center gap-2 disabled:opacity-50"
              style={{ background: 'linear-gradient(135deg, #3b82f6 0%, #2563eb 100%)' }}
            >
              {loading ? (
                <div className="w-5 h-5 border-2 border-white/30 border-t-white rounded-full animate-spin" />
              ) : (
                <>
                  PLACE ORDER - ₱{finalTotal.toLocaleString('en-PH')}
                  <ChevronRight size={18} />
                </>
              )}
            </button>
          </form>
        </div>
      </div>
    </div>
  );
}
