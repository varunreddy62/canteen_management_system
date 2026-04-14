import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import {
  getAllFoods, createFood, updateFood, deleteFood,
  getAllOrders, updateOrderStatus,
} from '../services/api';
import {
  FiPlus, FiEdit2, FiTrash2, FiLogOut, FiPackage, FiGrid,
  FiX, FiSave, FiDollarSign, FiShoppingCart, FiCheckCircle,
} from 'react-icons/fi';
import './AdminDashboard.css';

const AdminDashboard = () => {
  const navigate = useNavigate();
  const [activeTab, setActiveTab] = useState('foods');
  const [foods, setFoods] = useState([]);
  const [orders, setOrders] = useState([]);
  const [loading, setLoading] = useState(true);
  const [showModal, setShowModal] = useState(false);
  const [editingFood, setEditingFood] = useState(null);
  const [foodForm, setFoodForm] = useState({
    name: '', description: '', category: 'Breakfast', price: '', imageUrl: '',
  });

  useEffect(() => {
    const isAdmin = localStorage.getItem('adminLoggedIn');
    if (!isAdmin) {
      navigate('/admin/login');
      return;
    }
    fetchData();
  }, [navigate]);

  const fetchData = async () => {
    setLoading(true);
    try {
      const [foodsRes, ordersRes] = await Promise.all([getAllFoods(), getAllOrders()]);
      setFoods(foodsRes.data);
      setOrders(ordersRes.data);
    } catch (error) {
      console.error('Error fetching data:', error);
    } finally {
      setLoading(false);
    }
  };

  const handleLogout = () => {
    localStorage.removeItem('adminLoggedIn');
    navigate('/admin/login');
  };

  // Food CRUD
  const openAddModal = () => {
    setEditingFood(null);
    setFoodForm({ name: '', description: '', category: 'Breakfast', price: '', imageUrl: '' });
    setShowModal(true);
  };

  const openEditModal = (food) => {
    setEditingFood(food);
    setFoodForm({
      name: food.name,
      description: food.description || '',
      category: food.category,
      price: food.price.toString(),
      imageUrl: food.imageUrl || '',
    });
    setShowModal(true);
  };

  const handleSaveFood = async (e) => {
    e.preventDefault();
    const foodData = { ...foodForm, price: parseFloat(foodForm.price) };

    try {
      if (editingFood) {
        await updateFood(editingFood.id, foodData);
      } else {
        await createFood(foodData);
      }
      setShowModal(false);
      fetchData();
    } catch (error) {
      console.error('Error saving food:', error);
    }
  };

  const handleDeleteFood = async (id) => {
    if (window.confirm('Are you sure you want to delete this item?')) {
      try {
        await deleteFood(id);
        fetchData();
      } catch (error) {
        console.error('Error deleting food:', error);
      }
    }
  };

  const handleStatusChange = async (orderId, newStatus) => {
    try {
      await updateOrderStatus(orderId, newStatus);
      fetchData();
    } catch (error) {
      console.error('Error updating status:', error);
    }
  };

  const formatDate = (dateStr) => {
    if (!dateStr) return '';
    const date = new Date(dateStr);
    return date.toLocaleDateString('en-IN', {
      day: 'numeric', month: 'short', hour: '2-digit', minute: '2-digit',
    });
  };

  // Stats
  const totalRevenue = orders.reduce((sum, o) => sum + (o.totalAmount || 0), 0);
  const pendingOrders = orders.filter((o) => o.status === 'Pending').length;
  // Removed unused completedOrders for linting

  if (loading) {
    return (
      <div className="admin-dashboard">
        <div className="loading-spinner">
          <div className="spinner"></div>
          <p>Loading dashboard...</p>
        </div>
      </div>
    );
  }

  return (
    <div className="admin-dashboard" id="admin-dashboard">
      {/* Sidebar */}
      <aside className="admin-sidebar" id="admin-sidebar">
        <div className="sidebar-header">
          <h3>Admin Panel</h3>
        </div>
        <nav className="sidebar-nav">
          <button
            className={`sidebar-btn ${activeTab === 'foods' ? 'active' : ''}`}
            onClick={() => setActiveTab('foods')}
            id="tab-foods"
          >
            <FiGrid /> Food Items
          </button>
          <button
            className={`sidebar-btn ${activeTab === 'orders' ? 'active' : ''}`}
            onClick={() => setActiveTab('orders')}
            id="tab-orders"
          >
            <FiPackage /> Orders
          </button>
        </nav>
        <button className="sidebar-logout" onClick={handleLogout} id="admin-logout">
          <FiLogOut /> Logout
        </button>
      </aside>

      {/* Main Content */}
      <main className="admin-main">
        {/* Stats Row */}
        <div className="stats-row" id="stats-row">
          <div className="stat-card">
            <FiGrid className="stat-icon" style={{ color: '#ff6b35' }} />
            <div>
              <span className="stat-value">{foods.length}</span>
              <span className="stat-label">Menu Items</span>
            </div>
          </div>
          <div className="stat-card">
            <FiShoppingCart className="stat-icon" style={{ color: '#3498db' }} />
            <div>
              <span className="stat-value">{orders.length}</span>
              <span className="stat-label">Total Orders</span>
            </div>
          </div>
          <div className="stat-card">
            <FiDollarSign className="stat-icon" style={{ color: '#27ae60' }} />
            <div>
              <span className="stat-value">₹{totalRevenue.toFixed(0)}</span>
              <span className="stat-label">Revenue</span>
            </div>
          </div>
          <div className="stat-card">
            <FiCheckCircle className="stat-icon" style={{ color: '#f1c40f' }} />
            <div>
              <span className="stat-value">{pendingOrders}</span>
              <span className="stat-label">Pending</span>
            </div>
          </div>
        </div>

        {/* Food Items Tab */}
        {activeTab === 'foods' && (
          <div className="admin-section" id="admin-foods-section">
            <div className="section-header">
              <h2>Food Items</h2>
              <button className="add-btn" onClick={openAddModal} id="add-food-btn">
                <FiPlus /> Add Item
              </button>
            </div>
            <div className="admin-table-wrapper">
              <table className="admin-table" id="foods-table">
                <thead>
                  <tr>
                    <th>ID</th>
                    <th>Image</th>
                    <th>Name</th>
                    <th>Category</th>
                    <th>Price</th>
                    <th>Actions</th>
                  </tr>
                </thead>
                <tbody>
                  {foods.map((food) => (
                    <tr key={food.id}>
                      <td>{food.id}</td>
                      <td>
                        <img
                          src={food.imageUrl || 'https://images.unsplash.com/photo-1546069901-ba9599a7e63c?w=100'}
                          alt={food.name}
                          className="table-food-img"
                          onError={(e) => {
                            e.target.src = 'https://images.unsplash.com/photo-1546069901-ba9599a7e63c?w=100';
                          }}
                        />
                      </td>
                      <td className="cell-name">{food.name}</td>
                      <td><span className={`cat-badge cat-${food.category.toLowerCase()}`}>{food.category}</span></td>
                      <td className="cell-price">₹{food.price.toFixed(2)}</td>
                      <td>
                        <div className="action-btns">
                          <button
                            className="action-edit"
                            onClick={() => openEditModal(food)}
                            id={`edit-food-${food.id}`}
                          >
                            <FiEdit2 />
                          </button>
                          <button
                            className="action-delete"
                            onClick={() => handleDeleteFood(food.id)}
                            id={`delete-food-${food.id}`}
                          >
                            <FiTrash2 />
                          </button>
                        </div>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>
        )}

        {/* Orders Tab */}
        {activeTab === 'orders' && (
          <div className="admin-section" id="admin-orders-section">
            <div className="section-header">
              <h2>Orders ({orders.length})</h2>
            </div>
            <div className="admin-table-wrapper">
              <table className="admin-table" id="orders-table">
                <thead>
                  <tr>
                    <th>ID</th>
                    <th>Customer</th>
                    <th>Items</th>
                    <th>Total</th>
                    <th>Date</th>
                    <th>Status</th>
                  </tr>
                </thead>
                <tbody>
                  {orders.map((order) => (
                    <tr key={order.id}>
                      <td>#{order.id}</td>
                      <td className="cell-name">{order.customerName}</td>
                      <td className="cell-items">
                        {order.orderItems?.map((item) => (
                          <span key={item.id} className="item-tag">
                            {item.foodItem?.name} ×{item.quantity}
                          </span>
                        ))}
                      </td>
                      <td className="cell-price">₹{order.totalAmount?.toFixed(2)}</td>
                      <td className="cell-date">{formatDate(order.createdAt)}</td>
                      <td>
                        <select
                          className={`status-select status-${order.status?.toLowerCase()}`}
                          value={order.status}
                          onChange={(e) => handleStatusChange(order.id, e.target.value)}
                          id={`status-select-${order.id}`}
                        >
                          <option value="Pending">Pending</option>
                          <option value="Preparing">Preparing</option>
                          <option value="Completed">Completed</option>
                        </select>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>
        )}
      </main>

      {/* Add/Edit Food Modal */}
      {showModal && (
        <div className="modal-overlay" onClick={() => setShowModal(false)} id="food-modal">
          <div className="modal-card" onClick={(e) => e.stopPropagation()}>
            <div className="modal-header">
              <h3>{editingFood ? 'Edit Food Item' : 'Add Food Item'}</h3>
              <button className="modal-close" onClick={() => setShowModal(false)}>
                <FiX />
              </button>
            </div>
            <form onSubmit={handleSaveFood} className="modal-form" id="food-form">
              <div className="form-group">
                <label htmlFor="food-name">Name</label>
                <input
                  type="text"
                  id="food-name"
                  value={foodForm.name}
                  onChange={(e) => setFoodForm({ ...foodForm, name: e.target.value })}
                  placeholder="Food item name"
                  className="form-input"
                  required
                />
              </div>
              <div className="form-group">
                <label htmlFor="food-desc">Description</label>
                <textarea
                  id="food-desc"
                  value={foodForm.description}
                  onChange={(e) => setFoodForm({ ...foodForm, description: e.target.value })}
                  placeholder="Brief description"
                  className="form-input form-textarea"
                  rows="3"
                />
              </div>
              <div className="form-row">
                <div className="form-group">
                  <label htmlFor="food-category">Category</label>
                  <select
                    id="food-category"
                    value={foodForm.category}
                    onChange={(e) => setFoodForm({ ...foodForm, category: e.target.value })}
                    className="form-input"
                  >
                    <option value="Breakfast">Breakfast</option>
                    <option value="Lunch">Lunch</option>
                    <option value="Snacks">Snacks</option>
                    <option value="Drinks">Drinks</option>
                  </select>
                </div>
                <div className="form-group">
                  <label htmlFor="food-price">Price (₹)</label>
                  <input
                    type="number"
                    id="food-price"
                    value={foodForm.price}
                    onChange={(e) => setFoodForm({ ...foodForm, price: e.target.value })}
                    placeholder="0.00"
                    className="form-input"
                    step="0.01"
                    min="0"
                    required
                  />
                </div>
              </div>
              <div className="form-group">
                <label htmlFor="food-image">Image URL</label>
                <input
                  type="url"
                  id="food-image"
                  value={foodForm.imageUrl}
                  onChange={(e) => setFoodForm({ ...foodForm, imageUrl: e.target.value })}
                  placeholder="https://example.com/image.jpg"
                  className="form-input"
                />
              </div>
              <button type="submit" className="modal-submit" id="save-food-btn">
                <FiSave /> {editingFood ? 'Update Item' : 'Add Item'}
              </button>
            </form>
          </div>
        </div>
      )}
    </div>
  );
};

export default AdminDashboard;
