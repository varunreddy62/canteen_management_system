import React from 'react';
import { FiMinus, FiPlus, FiTrash2 } from 'react-icons/fi';
import { useCart } from '../context/CartContext';
import './CartItem.css';

const CartItem = ({ item }) => {
  const { updateQuantity, removeFromCart } = useCart();

  return (
    <div className="cart-item" id={`cart-item-${item.id}`}>
      <div className="cart-item-image">
        <img
          src={item.imageUrl || 'https://images.unsplash.com/photo-1546069901-ba9599a7e63c?w=400'}
          alt={item.name}
          onError={(e) => {
            e.target.src = 'https://images.unsplash.com/photo-1546069901-ba9599a7e63c?w=400';
          }}
        />
      </div>
      <div className="cart-item-details">
        <h4 className="cart-item-name">{item.name}</h4>
        <span className="cart-item-category">{item.category}</span>
        <span className="cart-item-price">₹{item.price.toFixed(2)}</span>
      </div>
      <div className="cart-item-actions">
        <div className="quantity-controls">
          <button
            className="qty-btn"
            onClick={() => updateQuantity(item.id, item.quantity - 1)}
            id={`qty-minus-${item.id}`}
          >
            <FiMinus />
          </button>
          <span className="qty-value">{item.quantity}</span>
          <button
            className="qty-btn"
            onClick={() => updateQuantity(item.id, item.quantity + 1)}
            id={`qty-plus-${item.id}`}
          >
            <FiPlus />
          </button>
        </div>
        <span className="cart-item-subtotal">₹{(item.price * item.quantity).toFixed(2)}</span>
        <button
          className="cart-item-remove"
          onClick={() => removeFromCart(item.id)}
          id={`remove-item-${item.id}`}
        >
          <FiTrash2 />
        </button>
      </div>
    </div>
  );
};

export default CartItem;
