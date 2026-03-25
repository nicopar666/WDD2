import { useState, useEffect } from 'react';
import { getProducts, createProduct, updateStock, updateProduct, deleteProduct, getOrders } from '../services/api';

export default function AdminDashboard() {
  const [products, setProducts] = useState([]);
  const [orders, setOrders] = useState([]);
  const [loading, setLoading] = useState(true);
  const [activeTab, setActiveTab] = useState('inventory');
  const [showAddProduct, setShowAddProduct] = useState(false);
  const [message, setMessage] = useState('');

  const [newProduct, setNewProduct] = useState({
    name: '',
    price: '',
    stock_count: '',
    category: '',
    image_url: '',
    is_preorder: false,
  });

  useEffect(() => {
    loadData();
  }, []);

  async function loadData() {
    try {
      const [productsRes, ordersRes] = await Promise.all([
        getProducts(),
        getOrders(),
      ]);
      setProducts(productsRes.data);
      setOrders(ordersRes.data);
    } catch (error) {
      setMessage(error.message);
    } finally {
      setLoading(false);
    }
  }

  async function handleAddProduct(e) {
    e.preventDefault();
    try {
      await createProduct(newProduct);
      setMessage('Product added successfully');
      setShowAddProduct(false);
      setNewProduct({
        name: '',
        price: '',
        stock_count: '',
        category: '',
        image_url: '',
        is_preorder: false,
      });
      loadData();
    } catch (error) {
      setMessage(error.message);
    }
  }

  async function handleUpdateStock(id, newStock) {
    try {
      await updateStock(id, parseInt(newStock));
      setMessage('Stock updated');
      loadData();
    } catch (error) {
      setMessage(error.message);
    }
  }

  async function handleUpdatePrice(id, newPrice) {
    try {
      const product = products.find(p => p.id === id);
      await updateProduct(id, { ...product, price: parseFloat(newPrice) });
      setMessage('Price updated');
      loadData();
    } catch (error) {
      setMessage(error.message);
    }
  }

  async function handleDeleteProduct(id) {
    if (!confirm('Are you sure you want to delete this product?')) return;
    try {
      await deleteProduct(id);
      setMessage('Product deleted');
      loadData();
    } catch (error) {
      setMessage(error.message);
    }
  }

  const totalRevenue = orders.reduce((sum, o) => sum + parseFloat(o.total_price || 0), 0);
  const totalOrders = orders.length;
  const totalProducts = products.length;

  if (loading) {
    return (
      <div className="min-h-screen bg-[#0d1117] flex items-center justify-center">
        <div className="w-8 h-8 border-2 border-gray-700 border-t-blue-500 rounded-full animate-spin"></div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-[#0d1117]">
      <nav className="fixed top-0 left-0 right-0 z-50 bg-[#0d1117]/90 backdrop-blur-md border-b border-gray-800">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex items-center justify-between h-16">
            <div className="flex items-center gap-3">
              <div className="w-9 h-9 bg-gradient-to-br from-blue-600 to-blue-800 rounded-lg flex items-center justify-center">
                <span className="text-white font-bold text-sm">A</span>
              </div>
              <span className="text-white text-lg font-semibold">Adversity Inventory & Logistics</span>
            </div>
            <div className="flex items-center gap-6">
              <a href="/" className="text-gray-400 hover:text-white text-sm transition-colors">Storefront</a>
              <button
                onClick={() => {
                  localStorage.removeItem('admin_token');
                  window.location.href = '/admin/login';
                }}
                className="text-gray-400 hover:text-red-400 text-sm transition-colors"
              >
                Logout
              </button>
            </div>
          </div>
        </div>
      </nav>

      <main className="pt-24 pb-16 px-4 sm:px-6 lg:px-8 max-w-7xl mx-auto">
        {message && (
          <div className="mb-6 bg-green-900/20 border border-green-800 text-green-400 px-4 py-3 rounded-xl text-sm flex items-center justify-between">
            {message}
            <button onClick={() => setMessage('')} className="hover:text-white">×</button>
          </div>
        )}

        <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-8">
          <div className="bg-[#161b22] border border-gray-800 rounded-2xl p-6">
            <p className="text-gray-500 text-sm uppercase tracking-wider">Total Products</p>
            <p className="text-3xl font-bold text-white mt-1">{totalProducts}</p>
          </div>
          <div className="bg-[#161b22] border border-gray-800 rounded-2xl p-6">
            <p className="text-gray-500 text-sm uppercase tracking-wider">Total Orders</p>
            <p className="text-3xl font-bold text-white mt-1">{totalOrders}</p>
          </div>
          <div className="bg-[#161b22] border border-gray-800 rounded-2xl p-6">
            <p className="text-gray-500 text-sm uppercase tracking-wider">Total Revenue</p>
            <p className="text-3xl font-bold text-white mt-1">₱{totalRevenue.toLocaleString('en-PH')}</p>
          </div>
        </div>

        <div className="flex gap-2 mb-6">
          <button
            onClick={() => setActiveTab('inventory')}
            className={`px-5 py-2.5 rounded-lg text-sm font-medium transition-all ${
              activeTab === 'inventory'
                ? 'bg-blue-600 text-white'
                : 'bg-[#161b22] text-gray-300 hover:bg-[#21262d] border border-gray-700'
            }`}
          >
            Inventory
          </button>
          <button
            onClick={() => setActiveTab('sales')}
            className={`px-5 py-2.5 rounded-lg text-sm font-medium transition-all ${
              activeTab === 'sales'
                ? 'bg-blue-600 text-white'
                : 'bg-[#161b22] text-gray-300 hover:bg-[#21262d] border border-gray-700'
            }`}
          >
            Transaction Ledger
          </button>
        </div>

        {activeTab === 'inventory' && (
          <div>
            <div className="flex justify-between items-center mb-6">
              <h2 className="text-xl font-semibold text-white">Product Inventory</h2>
              <button
                onClick={() => setShowAddProduct(true)}
                className="bg-blue-600 text-white px-4 py-2.5 rounded-lg text-sm font-medium hover:bg-blue-500 transition-colors"
              >
                + Add Product
              </button>
            </div>

            <div className="bg-[#161b22] border border-gray-800 rounded-2xl overflow-hidden">
              <div className="overflow-x-auto">
                <table className="w-full">
                  <thead className="bg-[#0d1117]/50">
                    <tr>
                      <th className="text-left text-gray-500 px-4 py-3 text-xs uppercase tracking-wider font-medium">Product</th>
                      <th className="text-left text-gray-500 px-4 py-3 text-xs uppercase tracking-wider font-medium">Category</th>
                      <th className="text-left text-gray-500 px-4 py-3 text-xs uppercase tracking-wider font-medium">Price</th>
                      <th className="text-left text-gray-500 px-4 py-3 text-xs uppercase tracking-wider font-medium">Stock</th>
                      <th className="text-left text-gray-500 px-4 py-3 text-xs uppercase tracking-wider font-medium"></th>
                    </tr>
                  </thead>
                  <tbody className="divide-y divide-gray-800">
                    {products.map((product) => (
                      <tr key={product.id} className="hover:bg-[#0d1117]/30 transition-colors">
                        <td className="px-4 py-4">
                          <div className="flex items-center gap-3">
                            <div className="w-10 h-10 bg-[#21262d] rounded-lg flex items-center justify-center overflow-hidden">
                              {product.image_url ? (
                                <img src={product.image_url} alt="" className="w-full h-full object-cover" />
                              ) : (
                                <span className="text-gray-600 text-xs">-</span>
                              )}
                            </div>
                            <div>
                              <p className="text-white text-sm font-medium">{product.name}</p>
                              {product.is_preorder && (
                                <span className="text-blue-500 text-xs">Pre-order</span>
                              )}
                            </div>
                          </div>
                        </td>
                        <td className="px-4 py-4 text-gray-400 text-sm">{product.category || '-'}</td>
                        <td className="px-4 py-4">
                          <input
                            type="number"
                            step="0.01"
                            defaultValue={product.price}
                            onBlur={(e) => handleUpdatePrice(product.id, e.target.value)}
                            className="bg-[#0d1117] border border-gray-700 text-white text-sm px-3 py-2 rounded-lg w-28 focus:border-blue-500 focus:outline-none transition-colors"
                          />
                        </td>
                        <td className="px-4 py-4">
                          <input
                            type="number"
                            defaultValue={product.stock_count}
                            onBlur={(e) => handleUpdateStock(product.id, e.target.value)}
                            className="bg-[#0d1117] border border-gray-700 text-white text-sm px-3 py-2 rounded-lg w-20 focus:border-blue-500 focus:outline-none transition-colors"
                          />
                        </td>
                        <td className="px-4 py-4">
                          <button
                            onClick={() => handleDeleteProduct(product.id)}
                            className="text-gray-500 hover:text-red-400 text-sm transition-colors"
                          >
                            Delete
                          </button>
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
              {products.length === 0 && (
                <div className="text-center py-12 text-gray-500">
                  No products yet. Add one to get started.
                </div>
              )}
            </div>
          </div>
        )}

        {activeTab === 'sales' && (
          <div>
            <h2 className="text-xl font-semibold text-white mb-6">Transaction Ledger</h2>

            <div className="bg-[#161b22] border border-gray-800 rounded-2xl overflow-hidden">
              <div className="overflow-x-auto">
                <table className="w-full">
                  <thead className="bg-[#0d1117]/50">
                    <tr>
                      <th className="text-left text-gray-500 px-4 py-3 text-xs uppercase tracking-wider font-medium">Order ID</th>
                      <th className="text-left text-gray-500 px-4 py-3 text-xs uppercase tracking-wider font-medium">Customer</th>
                      <th className="text-left text-gray-500 px-4 py-3 text-xs uppercase tracking-wider font-medium">Product</th>
                      <th className="text-left text-gray-500 px-4 py-3 text-xs uppercase tracking-wider font-medium">Amount</th>
                      <th className="text-left text-gray-500 px-4 py-3 text-xs uppercase tracking-wider font-medium">Date</th>
                      <th className="text-left text-gray-500 px-4 py-3 text-xs uppercase tracking-wider font-medium">Status</th>
                    </tr>
                  </thead>
                  <tbody className="divide-y divide-gray-800">
                    {orders.map((order) => (
                      <tr key={order.id} className="hover:bg-[#0d1117]/30 transition-colors">
                        <td className="px-4 py-4 text-blue-400 text-sm font-medium">#{order.id.toString().padStart(6, '0')}</td>
                        <td className="px-4 py-4 text-white text-sm">{order.customer_name}</td>
                        <td className="px-4 py-4 text-gray-400 text-sm">{order.product?.name || 'N/A'}</td>
                        <td className="px-4 py-4 text-white text-sm font-medium">₱{Number(order.total_price).toLocaleString('en-PH')}</td>
                        <td className="px-4 py-4 text-gray-500 text-sm">
                          {new Date(order.created_at).toLocaleString('en-PH')}
                        </td>
                        <td className="px-4 py-4">
                          <span className={`px-2.5 py-1 rounded-full text-xs font-medium ${
                            order.payment_status
                              ? 'bg-green-900/30 text-green-400 border border-green-800'
                              : 'bg-red-900/30 text-red-400 border border-red-800'
                          }`}>
                            {order.payment_status ? 'Completed' : 'Failed'}
                          </span>
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
              {orders.length === 0 && (
                <div className="text-center py-12 text-gray-500">
                  No transactions yet.
                </div>
              )}
            </div>
          </div>
        )}
      </main>

      {showAddProduct && (
        <div className="fixed inset-0 bg-black/70 modal-backdrop flex items-center justify-center z-50 p-4">
          <div className="bg-[#161b22] border border-gray-800 rounded-2xl p-6 w-full max-w-md">
            <h3 className="text-white text-xl font-semibold mb-6">Add Product</h3>
            
            <form onSubmit={handleAddProduct} className="space-y-4">
              <div>
                <label className="block text-gray-400 text-sm mb-2">Product Name</label>
                <input
                  type="text"
                  value={newProduct.name}
                  onChange={(e) => setNewProduct({ ...newProduct, name: e.target.value })}
                  className="w-full bg-[#0d1117] border border-gray-700 rounded-xl px-4 py-3.5 text-white placeholder-gray-500 focus:border-blue-500 focus:outline-none transition-colors"
                  required
                />
              </div>

              <div className="grid grid-cols-2 gap-4">
                <div>
                  <label className="block text-gray-400 text-sm mb-2">Price (₱)</label>
                  <input
                    type="number"
                    step="0.01"
                    value={newProduct.price}
                    onChange={(e) => setNewProduct({ ...newProduct, price: e.target.value })}
                    className="w-full bg-[#0d1117] border border-gray-700 rounded-xl px-4 py-3.5 text-white placeholder-gray-500 focus:border-blue-500 focus:outline-none transition-colors"
                    required
                  />
                </div>
                <div>
                  <label className="block text-gray-400 text-sm mb-2">Stock</label>
                  <input
                    type="number"
                    value={newProduct.stock_count}
                    onChange={(e) => setNewProduct({ ...newProduct, stock_count: e.target.value })}
                    className="w-full bg-[#0d1117] border border-gray-700 rounded-xl px-4 py-3.5 text-white placeholder-gray-500 focus:border-blue-500 focus:outline-none transition-colors"
                    required
                  />
                </div>
              </div>

              <div>
                <label className="block text-gray-400 text-sm mb-2">Category</label>
                <input
                  type="text"
                  value={newProduct.category}
                  onChange={(e) => setNewProduct({ ...newProduct, category: e.target.value })}
                  className="w-full bg-[#0d1117] border border-gray-700 rounded-xl px-4 py-3.5 text-white placeholder-gray-500 focus:border-blue-500 focus:outline-none transition-colors"
                  placeholder="e.g., CPU, GPU, RAM"
                />
              </div>

              <div>
                <label className="block text-gray-400 text-sm mb-2">Image URL</label>
                <input
                  type="text"
                  value={newProduct.image_url}
                  onChange={(e) => setNewProduct({ ...newProduct, image_url: e.target.value })}
                  className="w-full bg-[#0d1117] border border-gray-700 rounded-xl px-4 py-3.5 text-white placeholder-gray-500 focus:border-blue-500 focus:outline-none transition-colors"
                  placeholder="https://..."
                />
              </div>

              <label className="flex items-center gap-3 text-gray-400 text-sm cursor-pointer">
                <input
                  type="checkbox"
                  checked={newProduct.is_preorder}
                  onChange={(e) => setNewProduct({ ...newProduct, is_preorder: e.target.checked })}
                  className="rounded bg-[#0d1117] border-gray-700 text-blue-600 focus:ring-0 focus:ring-offset-0"
                />
                Enable Pre-order
              </label>

              <div className="flex gap-3 pt-4">
                <button
                  type="button"
                  onClick={() => setShowAddProduct(false)}
                  className="flex-1 py-3.5 border border-gray-700 text-gray-300 rounded-xl hover:bg-gray-800 transition-colors font-medium"
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  className="flex-1 py-3.5 bg-blue-600 rounded-xl font-medium text-white hover:bg-blue-500 transition-colors"
                >
                  Add Product
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
}
