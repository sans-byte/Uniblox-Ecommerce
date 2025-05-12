export interface Product {
  id: string;
  name: string;
  price: number;
  description: string;
  image: string;
}

export interface User {
  id: string;
  email: string;
  password: string;
  role: string;
}

export interface Auth {
  user: User | null;
  isAuthenticated: boolean;
}

export interface CartItem {
  product: Product;
  quantity: number;
}

export interface StoreStats {
  totalItemsPurchased: number;
  totalPurchaseAmount: number;
  usedDiscountCodes: string[];
  totalDiscountAmount: number;
}

export interface Order {
  id: string;
  items: CartItem[];
  total: number;
  discountCode?: string;
  discountAmount: number;
  finalTotal: number;
  createdAt: Date;
}

export interface DiscountCode {
  code: string;
  percentage: number;
  isUsed: boolean;
  createdAt: Date;
}
