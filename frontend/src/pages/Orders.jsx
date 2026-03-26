import { useState, useEffect } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { ArrowLeft, Package, Clock, CheckCircle, XCircle, ShoppingBag } from 'lucide-react';
import { useAuth } from '../context/AuthContext';
import { apiFetch } from '../services/api';

export default function Orders() {
  const [orders, setOrders] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');
  const { currentUser, logout } = useAuth();
  const navigate = useNavigate();

  useEffect(() => {
    if (!currentUser) {
      navigate('/login');
      return;
    }

    fetchOrders();
  }, [currentUser]);

  const fetchOrders = async () => {
    try {
      const data = await apiFetch('/my-orders');
      setOrders(data.data);
    } catch (err) {
      setError('Failed to load orders');
    } finally {
      setLoading(false);
    }
  };

  const getStatusIcon = (status) => {
    if (status) return <CheckCircle className="text-emerald-400" size={18} />;
    return <Clock className="text-yellow-400" size={18} />;
  };

  const getStatusColor = (status) => {
    return status ? 'text-emerald-400' : 'text-yellow-400';
  };

  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center" style={{ backgroundColor: '#0a0a0c' }}>
        <div className="w-10 h-10 rounded-full animate-spin" style={{ border: '3px solid #252529', borderTopColor: '#3b82f6' }}></div>
      </div>
    );
  }

  return (
    <div className="min-h-screen" style={{ backgroundColor: '#0a0a0c' }}>
      {/* Header */}
      <header className="fixed top-0 left-0 right-0 z-50" style={{ backgroundColor: 'rgba(10, 10, 12, 0.95)', backdropFilter: 'blur(20px)', borderBottom: '1px solid #1a1a1f' }}>
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex items-center justify-between h-16 sm:h-20">
            <div className="flex items-center gap-4">
              <Link 
                to="/" 
                className="p-2 rounded-xl hover:bg-[#1a1a1f] text-gray-400 hover:text-white transition-all"
              >
                <ArrowLeft size={20} />
              </Link>
              <h1 className="text-white font-bold text-xl">My Orders</h1>
            </div>
            {currentUser && (
              <button
                onClick={() => { logout(); navigate('/'); }}
                className="text-gray-400 hover:text-white text-sm font-medium"
              >
                Logout
              </button>
            )}
          </div>
        </div>
      </header>

      <main className="pt-24 sm:pt-28 pb-12">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
          {error && (
            <div className="rounded-xl px-6 py-4 mb-6" style={{ backgroundColor: 'rgba(239, 68, 68, 0.1)', border: '1px solid rgba(239, 68, 68, 0.3)', color: '#f87171' }}>
              {error}
            </div>
          )}

          {!error && orders.length === 0 && (
            <div className="text-center py-20">
              <div className="w-20 h-20 rounded-full flex items-center justify-center mx-auto mb-6" style={{ backgroundColor: '#1a1a1f' }}>
                <ShoppingBag size={32} className="text-gray-500" />
              </div>
              <h2 className="text-xl font-semibold text-white mb-2">No orders yet</h2>
              <p className="text-gray-400 mb-6">Start shopping to see your orders here</p>
              <Link 
                to="/" 
                className="inline-flex items-center gap-2 px-6 py-3 rounded-xl text-white font-medium"
                style={{ background: 'linear-gradient(135deg, #3b82f6 0%, #2563eb 100%)' }}
              >
                Browse Products
              </Link>
            </div>
          )}

          {orders.length > 0 && (
            <div className="space-y-4">
              {orders.map((order) => (
                <div 
                  key={order.id}
                  className="rounded-2xl overflow-hidden"
                  style={{ backgroundColor: '#1a1a22', border: '1px solid #2a2a35' }}
                >
                  <div className="p-5" style={{ backgroundColor: '#141418' }}>
                    <div className="flex items-center justify-between mb-4">
                      <div>
                        <p className="text-gray-400 text-sm">Order #{order.id}</p>
                        <p className="text-gray-500 text-xs">
                          {new Date(order.created_at).toLocaleDateString('en-PH', { 
                            year: 'numeric', 
                            month: 'long', 
                            day: 'numeric',
                            hour: '2-digit',
                            minute: '2-digit'
                          })}
                        </p>
                      </div>
                      <div className="flex items-center gap-2">
                        {getStatusIcon(order.payment_status)}
                        <span className={`text-sm font-medium ${getStatusColor(order.payment_status)}`}>
                          {order.payment_status ? 'Paid' : 'Pending'}
                        </span>
                      </div>
                    </div>

                    {order.product && (
                      <div className="flex items-center gap-4">
                        <div className="w-16 h-16 rounded-xl flex items-center justify-center" style={{ backgroundColor: '#1a1a22' }}>
                          <Package size={24} className="text-gray-500" />
                        </div>
                        <div className="flex-1">
                          <h3 className="text-white font-medium">{order.product.name}</h3>
                          <p className="text-gray-400 text-sm">Qty: {order.quantity} × ₱{Number(order.product.price).toLocaleString('en-PH')}</p>
                        </div>
                        <div className="text-right">
                          <p className="text-cyan-400 font-bold">₱{Number(order.total_price).toLocaleString('en-PH')}</p>
                        </div>
                      </div>
                    )}
                  </div>

                  <div className="px-5 py-3 flex items-center justify-between text-sm">
                    <div className="flex items-center gap-4">
                      <span className="text-gray-500">
                        {order.delivery_type === 'delivery' ? 'Delivery' : 'Pickup'}
                      </span>
                      <span className="text-gray-500">
                        {order.payment_gateway}
                      </span>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          )}
        </div>
      </main>
    </div>
  );
}
