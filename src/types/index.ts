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
