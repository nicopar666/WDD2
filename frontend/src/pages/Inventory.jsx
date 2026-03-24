import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import Button from '../components/Button';
import { useAuth } from '../context/AuthContext';
import { addProduct } from '../services/inventoryServices';
import './Inventory.css';

export default function Inventory() {
  const [productName, setProductName] = useState('');
  const [description, setDescription] = useState('');
  const [quantity, setQuantity] = useState('');
  const [price, setPrice] = useState('');
  const [loading, setLoading] = useState(false);
  const [message, setMessage] = useState({ type: '', text: '' });
  const navigate = useNavigate();
  const { logout } = useAuth();

  async function handleSubmit(e) {
    e.preventDefault();
    setLoading(true);
    setMessage({ type: '', text: '' });

    try {
      await addProduct({
        productName,
        description,
        quantity: Number(quantity),
        price: Number(price),
      });
      setMessage({ type: 'success', text: 'Product added successfully!' });
      setProductName('');
      setDescription('');
      setQuantity('');
      setPrice('');
    } catch {
      setMessage({ type: 'error', text: 'Failed to add product' });
    } finally {
      setLoading(false);
    }
  }

  function handleLogout() {
    logout();
    navigate('/login');
  }

  return (
    <div className="inventory-page">
      <div className="inventory-container">
        <div className="inventory-header">
          <h1 className="inventory-title">Inventory Management</h1>
          <Button variant="secondary" onClick={handleLogout}>
            Logout
          </Button>
        </div>

        <form className="inventory-form" onSubmit={handleSubmit}>
          {message.text && (
            <div className={message.type === 'success' ? 'card-success' : 'card-error'}>
              {message.text}
            </div>
          )}

          <div className="form-group">
            <label htmlFor="productName" className="form-label">Product Name</label>
            <input
              id="productName"
              type="text"
              className="form-input"
              value={productName}
              onChange={(e) => setProductName(e.target.value)}
              placeholder="Enter product name"
              required
            />
          </div>

          <div className="form-group">
            <label htmlFor="description" className="form-label">Description</label>
            <input
              id="description"
              type="text"
              className="form-input"
              value={description}
              onChange={(e) => setDescription(e.target.value)}
              placeholder="Enter description"
            />
          </div>

          <div className="form-row">
            <div className="form-group">
              <label htmlFor="quantity" className="form-label">Quantity</label>
              <input
                id="quantity"
                type="number"
                className="form-input"
                value={quantity}
                onChange={(e) => setQuantity(e.target.value)}
                placeholder="0"
                min="0"
                required
              />
            </div>

            <div className="form-group">
              <label htmlFor="price" className="form-label">Price</label>
              <input
                id="price"
                type="number"
                className="form-input"
                value={price}
                onChange={(e) => setPrice(e.target.value)}
                placeholder="0.00"
                min="0"
                step="0.01"
                required
              />
            </div>
          </div>

          <Button type="submit" loading={loading}>
            Add Product
          </Button>
        </form>
      </div>
    </div>
  );
}
