import React from 'react';
import { Link } from 'react-router-dom';
import { useCart } from '../context/CartContext';
import CartItem from '../components/CartItem';
import { FiShoppingBag, FiArrowRight, FiTrash2 } from 'react-icons/fi';
import './Cart.css';

const Cart = () => {
  const { cartItems, getCartTotal, clearCart } = useCart();

  if (cartItems.length === 0) {
    return (
      <div className="cart-page" id="cart-page">
        <div className="empty-cart" id="empty-cart">
          <FiShoppingBag className="empty-icon" />
          <h2>Your cart is empty</h2>
          <p>Add some delicious items from our menu!</p>
          <Link to="/menu" className="empty-cart-btn" id="go-to-menu">
            Browse Menu <FiArrowRight />
          </Link>
        </div>
      </div>
    );
  }

  return (
    <div className="cart-page" id="cart-page">
      <div className="cart-header">
        <h1 className="cart-title">Your Cart</h1>
        <button className="clear-cart-btn" onClick={clearCart} id="clear-cart-btn">
          <FiTrash2 /> Clear All
        </button>
      </div>

      <div className="cart-layout">
        <div className="cart-items-list" id="cart-items-list">
          {cartItems.map((item) => (
            <CartItem key={item.id} item={item} />
          ))}
        </div>

        <div className="cart-summary" id="cart-summary">
          <h3 className="summary-title">Order Summary</h3>
          <div className="summary-details">
            {cartItems.map((item) => (
              <div key={item.id} className="summary-item">
                <span>{item.name} × {item.quantity}</span>
                <span>₹{(item.price * item.quantity).toFixed(2)}</span>
              </div>
            ))}
          </div>
          <div className="summary-divider"></div>
          <div className="summary-total">
            <span>Total</span>
            <span className="total-amount">₹{getCartTotal().toFixed(2)}</span>
          </div>
          <Link to="/checkout" className="checkout-btn" id="checkout-btn">
            Proceed to Checkout <FiArrowRight />
          </Link>
        </div>
      </div>
    </div>
  );
};

export default Cart;
