import React from 'react';
import { MdRestaurantMenu } from 'react-icons/md';
import { FiGithub, FiMail, FiPhone } from 'react-icons/fi';
import './Footer.css';

const Footer = () => {
  return (
    <footer className="footer" id="footer">
      <div className="footer-container">
        <div className="footer-brand">
          <MdRestaurantMenu className="footer-icon" />
          <span className="footer-title">CampusBite</span>
          <p className="footer-tagline">Delicious meals for campus life</p>
        </div>
        <div className="footer-links">
          <div className="footer-col">
            <h4>Quick Links</h4>
            <a href="/">Home</a>
            <a href="/menu">Menu</a>
            <a href="/cart">Cart</a>
            <a href="/orders">My Orders</a>
          </div>
          <div className="footer-col">
            <h4>Categories</h4>
            <a href="/menu">Breakfast</a>
            <a href="/menu">Lunch</a>
            <a href="/menu">Snacks</a>
            <a href="/menu">Drinks</a>
          </div>
          <div className="footer-col">
            <h4>Contact</h4>
            <span><FiPhone /> +91 98765 43210</span>
            <span><FiMail /> canteen@campus.edu</span>
            <span><FiGithub /> github.com/campusbite</span>
          </div>
        </div>
      </div>
      <div className="footer-bottom">
        <p>© 2026 CampusBite Canteen Management System. All rights reserved.</p>
      </div>
    </footer>
  );
};

export default Footer;
