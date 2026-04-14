import React, { useState, useEffect } from 'react';
import { getAllOrders } from '../services/api';
import { FiClock, FiCheckCircle, FiLoader, FiPackage } from 'react-icons/fi';
import './Orders.css';

const Orders = () => {
  const [orders, setOrders] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetchOrders();
  }, []);

  const fetchOrders = async () => {
    try {
      const response = await getAllOrders();
      setOrders(response.data);
    } catch (error) {
      console.error('Error fetching orders:', error);
    } finally {
      setLoading(false);
    }
  };

  const getStatusIcon = (status) => {
    switch (status) {
      case 'Pending': return <FiClock />;
      case 'Preparing': return <FiLoader />;
      case 'Completed': return <FiCheckCircle />;
      default: return <FiPackage />;
    }
  };

  const getStatusClass = (status) => {
    switch (status) {
      case 'Pending': return 'status-pending';
      case 'Preparing': return 'status-preparing';
      case 'Completed': return 'status-completed';
      default: return '';
    }
  };

  const formatDate = (dateStr) => {
    if (!dateStr) return '';
    const date = new Date(dateStr);
    return date.toLocaleDateString('en-IN', {
      day: 'numeric',
      month: 'short',
      year: 'numeric',
      hour: '2-digit',
      minute: '2-digit',
    });
  };

  if (loading) {
    return (
      <div className="orders-page">
        <div className="loading-spinner">
          <div className="spinner"></div>
          <p>Loading orders...</p>
        </div>
      </div>
    );
  }

  return (
    <div className="orders-page" id="orders-page">
      <h1 className="orders-title">My Orders</h1>

      {orders.length === 0 ? (
        <div className="no-orders" id="no-orders">
          <FiPackage className="no-orders-icon" />
          <h3>No orders yet</h3>
          <p>Your order history will appear here</p>
        </div>
      ) : (
        <div className="orders-list" id="orders-list">
          {orders.map((order) => (
            <div key={order.id} className="order-card" id={`order-${order.id}`}>
              <div className="order-card-header">
                <div className="order-info">
                  <span className="order-number">Order #{order.id}</span>
                  <span className="order-date">{formatDate(order.createdAt)}</span>
                </div>
                <span className={`order-status ${getStatusClass(order.status)}`}>
                  {getStatusIcon(order.status)} {order.status}
                </span>
              </div>

              <div className="order-card-body">
                <div className="order-customer">
                  <span className="label">Customer:</span>
                  <span className="value">{order.customerName}</span>
                </div>
                <div className="order-items-list">
                  {order.orderItems && order.orderItems.map((item) => (
                    <div key={item.id} className="order-item-row">
                      <span className="item-name">
                        {item.foodItem?.name || 'Food Item'} × {item.quantity}
                      </span>
                      <span className="item-price">₹{item.price?.toFixed(2)}</span>
                    </div>
                  ))}
                </div>
              </div>

              <div className="order-card-footer">
                <span className="order-total-label">Total</span>
                <span className="order-total-amount">₹{order.totalAmount?.toFixed(2)}</span>
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
};

export default Orders;
