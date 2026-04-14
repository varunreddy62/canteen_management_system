import axios from 'axios';

const API_BASE_URL = import.meta.env.VITE_API_BASE_URL || 'http://localhost:8080/api';

const api = axios.create({
  baseURL: API_BASE_URL,
  headers: {
    'Content-Type': 'application/json',
  },
});

// ==================== Food APIs ====================
export const getAllFoods = () => api.get('/foods');
export const getFoodById = (id) => api.get(`/foods/${id}`);
export const getFoodsByCategory = (category) => api.get(`/foods?category=${category}`);
export const searchFoods = (keyword) => api.get(`/foods?search=${keyword}`);
export const createFood = (food) => api.post('/foods', food);
export const updateFood = (id, food) => api.put(`/foods/${id}`, food);
export const deleteFood = (id) => api.delete(`/foods/${id}`);

// ==================== Order APIs ====================
export const createOrder = (order) => api.post('/orders', order);
export const getAllOrders = () => api.get('/orders');
export const updateOrderStatus = (id, status) => api.put(`/orders/${id}/status`, { status });

// ==================== Admin APIs ====================
export const adminLogin = (credentials) => api.post('/admin/login', credentials);

export default api;
