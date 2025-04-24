import axios, { AxiosInstance } from 'axios';

const API_URL = 'http://localhost:5000/api';

interface LoginResponse {
  _id: string;
  name: string;
  email: string;
  isAdmin: boolean;
  token: string;
}

interface HealthCheckResponse {
  status: string;
  mongodb: 'connected' | 'disconnected';
}

interface CartResponse {
  products: Array<{
    productId: {
      _id: string;
      name: string;
      price: number;
      description: string;
      imageUrl: string;
      stock: number;
      category: string;
    };
    quantity: number;
  }>;
}

const api: AxiosInstance = axios.create({
  baseURL: API_URL,
  headers: {
    'Content-Type': 'application/json',
  },
  withCredentials: false
});

api.interceptors.request.use(
  (config) => {
    const token = localStorage.getItem('token');
    if (token && config.headers) {
      config.headers.Authorization = `Bearer ${token}`;
    }
    return config;
  },
  (error) => {
    return Promise.reject(error);
  }
);

api.interceptors.response.use(
  (response) => response,
  (error) => {
    if (error.response?.status === 401) {
      localStorage.removeItem('token');
      localStorage.removeItem('userId');
      localStorage.removeItem('isAdmin');
      window.location.href = '/login';
    }
    return Promise.reject(error.response?.data || error);
  }
);

export const authAPI = {
  login: async (email: string, password: string): Promise<LoginResponse> => {
    try {
      const response = await api.post<LoginResponse>('/auth/login', { email, password });
      localStorage.setItem('token', response.data.token);
      localStorage.setItem('userId', response.data._id);
      localStorage.setItem('isAdmin', response.data.isAdmin.toString());
      return response.data;
    } catch (error: any) {
      throw new Error(error.message || 'Login failed');
    }
  },

  register: async (name: string, email: string, password: string): Promise<LoginResponse> => {
    try {
      const response = await api.post<LoginResponse>('/auth/register', { name, email, password });
      localStorage.setItem('token', response.data.token);
      localStorage.setItem('userId', response.data._id);
      localStorage.setItem('isAdmin', response.data.isAdmin.toString());
      return response.data;
    } catch (error: any) {
      throw new Error(error.message || 'Registration failed');
    }
  },

  logout: () => {
    localStorage.removeItem('token');
    localStorage.removeItem('userId');
    localStorage.removeItem('isAdmin');
  }
};

export const adminAPI = {
  getDashboardStats: async () => {
    const response = await api.get('/admin/dashboard');
    return response.data;
  },

  getProducts: async () => {
    const response = await api.get('/admin/products');
    return response.data;
  },

  addProduct: async (productData: any) => {
    const response = await api.post('/admin/products', productData);
    return response.data;
  },

  updateProduct: async (productId: string, productData: any) => {
    const response = await api.put(`/admin/products/${productId}`, productData);
    return response.data;
  },

  deleteProduct: async (productId: string) => {
    const response = await api.delete(`/admin/products/${productId}`);
    return response.data;
  },

  getOrders: async () => {
    const response = await api.get('/admin/orders');
    return response.data;
  },

  updateOrderStatus: async (orderId: string, status: string) => {
    const response = await api.put(`/admin/orders/${orderId}`, { status });
    return response.data;
  }
};

export const cartAPI = {
  getCart: async () => {
    const response = await api.get<CartResponse>('/cart');
    return response.data.products.map(item => ({
      product: item.productId,
      quantity: item.quantity
    }));
  },

  addToCart: async (productId: string, quantity: number) => {
    const response = await api.post<CartResponse>('/cart/add', { productId, quantity });
    return {
      products: response.data.products.map(item => ({
        product: item.productId,
        quantity: item.quantity
      }))
    };
  },

  updateQuantity: async (productId: string, quantity: number) => {
    const response = await api.put<CartResponse>(`/cart/${productId}`, { quantity });
    return {
      products: response.data.products.map(item => ({
        product: item.productId,
        quantity: item.quantity
      }))
    };
  },

  removeFromCart: async (productId: string) => {
    const response = await api.delete<CartResponse>(`/cart/${productId}`);
    return {
      products: response.data.products.map(item => ({
        product: item.productId,
        quantity: item.quantity
      }))
    };
  }
};

export const productsAPI = {
  getAll: async () => {
    const response = await api.get('/products');
    return response.data;
  },

  getById: async (id: string) => {
    const response = await api.get(`/products/${id}`);
    return response.data;
  }
};

export const orderAPI = {
  createOrder: async (orderData: any) => {
    try {
      const response = await api.post('/orders', orderData);
      return response.data;
    } catch (error: any) {
      throw new Error(error.message || 'Failed to create order');
    }
  },

  getOrders: async () => {
    const userId = localStorage.getItem('userId');
    const response = await api.get(`/orders/myorders/${userId}`);
    return response.data;
  }
};

export const healthAPI = {
  check: async (): Promise<HealthCheckResponse> => {
    const response = await api.get<HealthCheckResponse>('/health');
    return response.data;
  }
};

export default api;