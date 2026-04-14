import React, { useState, useEffect } from 'react';
import { getAllFoods, getFoodsByCategory, searchFoods } from '../services/api';
import FoodCard from '../components/FoodCard';
import { FiSearch, FiX } from 'react-icons/fi';
import './Menu.css';

const Menu = () => {
  const [foods, setFoods] = useState([]);
  const [loading, setLoading] = useState(true);
  const [activeCategory, setActiveCategory] = useState('All');
  const [searchTerm, setSearchTerm] = useState('');

  const categories = ['All', 'Breakfast', 'Lunch', 'Snacks', 'Drinks'];

  useEffect(() => {
    fetchFoods();
  }, []);

  const fetchFoods = async () => {
    setLoading(true);
    try {
      const response = await getAllFoods();
      setFoods(response.data);
    } catch (error) {
      console.error('Error fetching foods:', error);
    } finally {
      setLoading(false);
    }
  };

  const handleCategoryFilter = async (category) => {
    setActiveCategory(category);
    setSearchTerm('');
    setLoading(true);
    try {
      if (category === 'All') {
        const response = await getAllFoods();
        setFoods(response.data);
      } else {
        const response = await getFoodsByCategory(category);
        setFoods(response.data);
      }
    } catch (error) {
      console.error('Error filtering:', error);
    } finally {
      setLoading(false);
    }
  };

  const handleSearch = async (e) => {
    const value = e.target.value;
    setSearchTerm(value);
    setActiveCategory('All');

    if (value.trim() === '') {
      fetchFoods();
      return;
    }

    setLoading(true);
    try {
      const response = await searchFoods(value);
      setFoods(response.data);
    } catch (error) {
      console.error('Error searching:', error);
    } finally {
      setLoading(false);
    }
  };

  const clearSearch = () => {
    setSearchTerm('');
    fetchFoods();
  };

  return (
    <div className="menu-page" id="menu-page">
      <div className="menu-header">
        <h1 className="menu-title">Our Menu</h1>
        <p className="menu-subtitle">Choose from our wide variety of delicious meals</p>
      </div>

      {/* Search Bar */}
      <div className="menu-controls">
        <div className="search-bar" id="search-bar">
          <FiSearch className="search-icon" />
          <input
            type="text"
            placeholder="Search for food items..."
            value={searchTerm}
            onChange={handleSearch}
            className="search-input"
            id="search-input"
          />
          {searchTerm && (
            <button className="search-clear" onClick={clearSearch}>
              <FiX />
            </button>
          )}
        </div>

        {/* Category Filters */}
        <div className="category-filters" id="category-filters">
          {categories.map((cat) => (
            <button
              key={cat}
              className={`filter-btn ${activeCategory === cat ? 'active' : ''}`}
              onClick={() => handleCategoryFilter(cat)}
              id={`filter-${cat.toLowerCase()}`}
            >
              {cat}
            </button>
          ))}
        </div>
      </div>

      {/* Food Grid */}
      {loading ? (
        <div className="loading-spinner">
          <div className="spinner"></div>
          <p>Loading menu...</p>
        </div>
      ) : foods.length === 0 ? (
        <div className="no-results" id="no-results">
          <span className="no-results-emoji">🍽️</span>
          <h3>No items found</h3>
          <p>Try a different search or category</p>
        </div>
      ) : (
        <div className="food-grid" id="food-grid">
          {foods.map((food) => (
            <FoodCard key={food.id} food={food} />
          ))}
        </div>
      )}
    </div>
  );
};

export default Menu;
