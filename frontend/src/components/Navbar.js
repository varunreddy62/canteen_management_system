import React from 'react';
import { Link, useLocation } from 'react-router-dom';
import { useCart } from '../context/CartContext';
import { FiShoppingCart, FiHome, FiGrid, FiList, FiUser } from 'react-icons/fi';
import { MdRestaurantMenu } from 'react-icons/md';
import './Navbar.css';

const Navbar = () => {
  const { getCartCount } = useCart();
  const location = useLocation();
  const cartCount = getCartCount();

  const isActive = (path) => location.pathname === path;

  return (
    <nav className="navbar-custom" id="main-navbar">
      <div className="nav-container">
        <Link to="/" className="nav-brand" id="nav-brand-link">
          <MdRestaurantMenu className="brand-icon" />
          <span className="brand-text">CampusBite</span>
        </Link>

        <div className="nav-links" id="nav-links">
          <Link to="/" className={`nav-link ${isActive('/') ? 'active' : ''}`} id="nav-home">
            <FiHome /> <span>Home</span>
          </Link>
          <Link to="/menu" className={`nav-link ${isActive('/menu') ? 'active' : ''}`} id="nav-menu">
            <FiGrid /> <span>Menu</span>
          </Link>
          <Link to="/orders" className={`nav-link ${isActive('/orders') ? 'active' : ''}`} id="nav-orders">
            <FiList /> <span>Orders</span>
          </Link>
          <Link to="/admin/login" className={`nav-link ${isActive('/admin/login') || isActive('/admin/dashboard') ? 'active' : ''}`} id="nav-admin">
            <FiUser /> <span>Admin</span>
          </Link>
        </div>

        <Link to="/cart" className="nav-cart" id="nav-cart-link">
          <FiShoppingCart className="cart-icon" />
          {cartCount > 0 && (
            <span className="cart-badge" id="cart-badge">{cartCount}</span>
          )}
        </Link>
      </div>
    </nav>
  );
};

export default Navbar;
