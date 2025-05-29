// Type definitions for the e-commerce application

export interface Product {
  id: string;
  name: string;
  price: number;
  originalPrice?: number;
  description: string;
  images: string[];
  category: string;
  tags: string[];
  colors: Color[];
  sizes: Size[];
  featured?: boolean;
  newArrival?: boolean;
  bestSeller?: boolean;
  stock: number;
  rating: number;
  reviews: number;
}

export interface Color {
  name: string;
  value: string;
}

export type Size = 'XS' | 'S' | 'M' | 'L' | 'XL' | 'XXL';

export interface CartItem {
  product: Product;
  quantity: number;
  selectedColor: Color;
  selectedSize: Size;
}

export interface User {
  id: string;
  name: string;
  email: string;
  wishlist: string[];
  orders: Order[];
}

export interface Order {
  id: string;
  date: string;
  items: CartItem[];
  status: 'pending' | 'processing' | 'shipped' | 'delivered';
  total: number;
  shippingAddress: Address;
  paymentMethod: string;
}

export interface Address {
  firstName: string;
  lastName: string;
  street: string;
  city: string;
  state: string;
  zipCode: string;
  country: string;
}

export interface Category {
  id: string;
  name: string;
  image: string;
  description: string;
}

export interface Collection {
  id: string;
  name: string;
  description: string;
  image: string;
  products: string[];
}