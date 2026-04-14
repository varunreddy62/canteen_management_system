import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { getAllFoods } from '../services/api';
import FoodCard from '../components/FoodCard';
import { FiArrowRight, FiCoffee, FiSun, FiDroplet } from 'react-icons/fi';
import { MdRestaurantMenu } from 'react-icons/md';
import './Home.css';

const Home = () => {
  const [featuredFoods, setFeaturedFoods] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetchFeaturedFoods();
  }, []);

  const fetchFeaturedFoods = async () => {
    try {
      const response = await getAllFoods();
      // Show first 8 items as featured
      setFeaturedFoods(response.data.slice(0, 8));
    } catch (error) {
      console.error('Error fetching foods:', error);
    } finally {
      setLoading(false);
    }
  };

  const categories = [
    { name: 'Breakfast', icon: <FiCoffee />, color: '#f7931e', desc: 'Start your day right' },
    { name: 'Lunch', icon: <FiSun />, color: '#27ae60', desc: 'Hearty afternoon meals' },
    { name: 'Snacks', icon: <MdRestaurantMenu />, color: '#e74c3c', desc: 'Quick bites & treats' },
    { name: 'Drinks', icon: <FiDroplet />, color: '#3498db', desc: 'Refreshing beverages' },
  ];

  return (
    <div className="home-page" id="home-page">
      {/* Hero Section */}
      <section className="hero" id="hero-section">
        <div className="hero-bg-elements">
          <div className="hero-circle hero-circle-1"></div>
          <div className="hero-circle hero-circle-2"></div>
          <div className="hero-circle hero-circle-3"></div>
        </div>
        <div className="hero-content">
          <span className="hero-badge">🍽️ Campus Canteen</span>
          <h1 className="hero-title">
            Delicious Meals,
            <br />
            <span className="hero-highlight">Delivered Fresh</span>
          </h1>
          <p className="hero-subtitle">
            Order your favorite meals from the campus canteen. Browse our menu,
            add to cart, and enjoy hassle-free ordering.
          </p>
          <div className="hero-actions">
            <Link to="/menu" className="hero-btn hero-btn-primary" id="hero-browse-menu">
              Browse Menu <FiArrowRight />
            </Link>
            <Link to="/orders" className="hero-btn hero-btn-secondary" id="hero-view-orders">
              View Orders
            </Link>
          </div>
          <div className="hero-stats">
            <div className="hero-stat">
              <span className="stat-number">20+</span>
              <span className="stat-label">Menu Items</span>
            </div>
            <div className="hero-stat">
              <span className="stat-number">4</span>
              <span className="stat-label">Categories</span>
            </div>
            <div className="hero-stat">
              <span className="stat-number">₹15</span>
              <span className="stat-label">Starting Price</span>
            </div>
          </div>
        </div>
      </section>

      {/* Categories Section */}
      <section className="categories-section" id="categories-section">
        <h2 className="section-title">Explore Categories</h2>
        <div className="categories-grid">
          {categories.map((cat) => (
            <Link
              to="/menu"
              key={cat.name}
              className="category-card"
              id={`category-${cat.name.toLowerCase()}`}
              style={{ '--cat-color': cat.color }}
            >
              <div className="category-icon">{cat.icon}</div>
              <h3>{cat.name}</h3>
              <p>{cat.desc}</p>
            </Link>
          ))}
        </div>
      </section>

      {/* Featured Foods Section */}
      <section className="featured-section" id="featured-section">
        <div className="section-header">
          <h2 className="section-title">Today's Specials</h2>
          <Link to="/menu" className="view-all-link">
            View All <FiArrowRight />
          </Link>
        </div>
        {loading ? (
          <div className="loading-spinner">
            <div className="spinner"></div>
            <p>Loading delicious options...</p>
          </div>
        ) : (
          <div className="food-grid">
            {featuredFoods.map((food) => (
              <FoodCard key={food.id} food={food} />
            ))}
          </div>
        )}
      </section>
    </div>
  );
};

export default Home;
