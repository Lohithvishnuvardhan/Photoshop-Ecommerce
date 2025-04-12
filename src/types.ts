export interface Product {
  _id: string;
  name: string;
  category: string;
  price: number;
  description: string;
  features: string[];
  specifications: Record<string, string>;
  images: string[];
  stock: number;
}

export interface CartItem {
  product: Product;
  quantity: number;
}

export interface User {
  _id: string;
  email: string;
  name: string;
  isAdmin: boolean;
  token?: string;
}

export interface OrderItem {
  product: string;
  quantity: number;
  price: number;
}

export interface Order {
  _id: string;
  user: string;
  items: OrderItem[];
  totalAmount: number;
  status: string;
  createdAt: string;
  updatedAt: string;
}
