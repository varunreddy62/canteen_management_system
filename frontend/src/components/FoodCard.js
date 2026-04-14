import React from 'react';
import { useCart } from '../context/CartContext';
import { FiPlus, FiShoppingCart } from 'react-icons/fi';
import './FoodCard.css';

const FoodCard = ({ food }) => {
  const { addToCart, cartItems } = useCart();
  const inCart = cartItems.find((item) => item.id === food.id);

  const handleAddToCart = () => {
    addToCart(food);
  };

  const getCategoryColor = (category) => {
    const colors = {
      Breakfast: '#f7931e',
      Lunch: '#27ae60',
      Snacks: '#e74c3c',
      Drinks: '#3498db',
    };
    return colors[category] || '#ff6b35';
  };

  return (
    <div className="food-card" id={`food-card-${food.id}`}>
      <div className="food-card-image-wrapper">
        <img
          src={food.imageUrl || 'https://images.unsplash.com/photo-1546069901-ba9599a7e63c?w=400'}
          alt={food.name}
          className="food-card-image"
          onError={(e) => {
            e.target.src = 'https://images.unsplash.com/photo-1546069901-ba9599a7e63c?w=400';
          }}
        />
        <span
          className="food-card-category"
          style={{ background: getCategoryColor(food.category) }}
        >
          {food.category}
        </span>
      </div>
      <div className="food-card-content">
        <h3 className="food-card-name">{food.name}</h3>
        <p className="food-card-desc">{food.description}</p>
        <div className="food-card-footer">
          <span className="food-card-price">₹{food.price.toFixed(2)}</span>
          <button
            className={`food-card-btn ${inCart ? 'in-cart' : ''}`}
            onClick={handleAddToCart}
            id={`add-to-cart-${food.id}`}
          >
            {inCart ? (
              <>
                <FiShoppingCart /> In Cart ({inCart.quantity})
              </>
            ) : (
              <>
                <FiPlus /> Add
              </>
            )}
          </button>
        </div>
      </div>
    </div>
  );
};

export default FoodCard;
