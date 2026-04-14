import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useCart } from '../context/CartContext';
import { createOrder } from '../services/api';
import { FiCheck, FiArrowLeft } from 'react-icons/fi';
import './Checkout.css';

const Checkout = () => {
  const { cartItems, getCartTotal, clearCart } = useCart();
  const navigate = useNavigate();
  const [customerName, setCustomerName] = useState('');
  const [loading, setLoading] = useState(false);
  const [orderPlaced, setOrderPlaced] = useState(false);
  const [orderId, setOrderId] = useState(null);
  const [error, setError] = useState('');

  const handlePlaceOrder = async (e) => {
    e.preventDefault();

    if (!customerName.trim()) {
      setError('Please enter your name');
      return;
    }

    if (cartItems.length === 0) {
      setError('Your cart is empty');
      return;
    }

    setLoading(true);
    setError('');

    try {
      const orderData = {
        customerName: customerName.trim(),
        items: cartItems.map((item) => ({
          foodItemId: item.id,
          quantity: item.quantity,
        })),
      };

      const response = await createOrder(orderData);
      setOrderId(response.data.id);
      setOrderPlaced(true);
      clearCart();
    } catch (err) {
      console.error('Error placing order:', err);
      setError('Failed to place order. Please try again.');
    } finally {
      setLoading(false);
    }
  };

  if (orderPlaced) {
    return (
      <div className="checkout-page" id="checkout-page">
        <div className="order-success" id="order-success">
          <div className="success-icon-wrapper">
            <FiCheck className="success-icon" />
          </div>
          <h2>Order Placed Successfully!</h2>
          <p className="order-id">Order ID: #{orderId}</p>
          <p className="success-msg">Your order has been received and is being prepared.</p>
          <div className="success-actions">
            <button onClick={() => navigate('/orders')} className="success-btn primary" id="view-orders-btn">
              View Orders
            </button>
            <button onClick={() => navigate('/menu')} className="success-btn secondary" id="order-more-btn">
              Order More
            </button>
          </div>
        </div>
      </div>
    );
  }

  if (cartItems.length === 0) {
    navigate('/cart');
    return null;
  }

  return (
    <div className="checkout-page" id="checkout-page">
      <button className="back-btn" onClick={() => navigate('/cart')} id="back-to-cart">
        <FiArrowLeft /> Back to Cart
      </button>

      <h1 className="checkout-title">Checkout</h1>

      <div className="checkout-layout">
        <form className="checkout-form" onSubmit={handlePlaceOrder} id="checkout-form">
          <div className="form-section">
            <h3>Customer Details</h3>
            <div className="form-group">
              <label htmlFor="customer-name">Your Name</label>
              <input
                type="text"
                id="customer-name"
                value={customerName}
                onChange={(e) => setCustomerName(e.target.value)}
                placeholder="Enter your full name"
                className="form-input"
              />
            </div>
          </div>

          <div className="form-section">
            <h3>Order Items ({cartItems.length})</h3>
            <div className="checkout-items">
              {cartItems.map((item) => (
                <div key={item.id} className="checkout-item">
                  <img
                    src={item.imageUrl || 'https://images.unsplash.com/photo-1546069901-ba9599a7e63c?w=400'}
                    alt={item.name}
                    onError={(e) => {
                      e.target.src = 'https://images.unsplash.com/photo-1546069901-ba9599a7e63c?w=400';
                    }}
                  />
                  <div className="checkout-item-info">
                    <span className="checkout-item-name">{item.name}</span>
                    <span className="checkout-item-qty">Qty: {item.quantity}</span>
                  </div>
                  <span className="checkout-item-price">₹{(item.price * item.quantity).toFixed(2)}</span>
                </div>
              ))}
            </div>
          </div>

          {error && <div className="form-error" id="checkout-error">{error}</div>}

          <button
            type="submit"
            className="place-order-btn"
            disabled={loading}
            id="place-order-btn"
          >
            {loading ? 'Placing Order...' : `Place Order — ₹${getCartTotal().toFixed(2)}`}
          </button>
        </form>

        <div className="checkout-summary">
          <h3>Payment Summary</h3>
          <div className="summary-row">
            <span>Subtotal</span>
            <span>₹{getCartTotal().toFixed(2)}</span>
          </div>
          <div className="summary-row">
            <span>Tax</span>
            <span>₹0.00</span>
          </div>
          <div className="summary-row">
            <span>Delivery</span>
            <span className="free-tag">Free</span>
          </div>
          <div className="summary-divider"></div>
          <div className="summary-row total-row">
            <span>Total</span>
            <span>₹{getCartTotal().toFixed(2)}</span>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Checkout;
