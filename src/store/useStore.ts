import { create } from "zustand";
import type { Product, User, CartItem, Auth } from "@/types";

interface StoreState extends Auth {
  products: Product[];

  //cart
  cart: CartItem[];
  addToCart: (product: Product) => void;

  // Auth
  login: (email: string, password: string) => boolean;
  logout: () => void;

  //config
  nthOrder: number;
}

// Static users
const users: User[] = [
  {
    id: "1",
    email: "user@example.com",
    password: "user123",
    role: "user",
  },
  {
    id: "2",
    email: "admin@example.com",
    password: "admin123",
    role: "admin",
  },
];

// Dummy products
const initialProducts: Product[] = [
  {
    id: "1",
    name: "Wireless Headphones",
    price: 12999.00,
    description: "Premium wireless headphones with noise cancellation",
    image:
      "https://images.pexels.com/photos/3394650/pexels-photo-3394650.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1",
  },
  {
    id: "2",
    name: "Smartwatch",
    price: 1599.00,
    description: "Feature-rich smartwatch with health tracking",
    image:
      "https://images.pexels.com/photos/437037/pexels-photo-437037.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1",
  },
  {
    id: "3",
    name: "Bluetooth Speaker",
    price: 7900.00,
    description: "Portable Bluetooth speaker with deep bass",
    image:
      "https://images.pexels.com/photos/1279107/pexels-photo-1279107.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1",
  },
  {
    id: "4",
    name: "Laptop Backpack",
    price: 5999.00,
    description: "Stylish and functional laptop backpack",
    image:
      "https://images.pexels.com/photos/1338574/pexels-photo-1338574.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1",
  },
  {
    id: "5",
    name: "Wireless Charger",
    price: 34.99,
    description: "Fast wireless charger for smartphones",
    image:
      "https://images.pexels.com/photos/914912/pexels-photo-914912.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1",
  },
  {
    id: "6",
    name: "Coffee Mug",
    price: 1199.00,
    description: "Ceramic coffee mug with elegant design",
    image:
      "https://images.pexels.com/photos/1566308/pexels-photo-1566308.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1",
  },
];

export const useStore = create<StoreState>((set, get) => ({
  //Auth State
  user: null,
  isAuthenticated: false,

  //Product
  products: initialProducts,
  nthOrder: 3,
  cart: [],
  orders: [],
  discountCodes: [],

  login: (email: string, password: string) => {
    const user = users.find((u) => u.email === email && u.password == password);
    if (user) {
      set({ user: user, isAuthenticated: true });
      return true;
    }
    return false;
  },

  logout: () => {
    set({ user: null, isAuthenticated: false });
  },

  addToCart: (product) =>
    set((state) => {
      const existingItem = state.cart.find(
        (item) => item.product.id === product.id
      );

      if (existingItem) {
        return {
          cart: state.cart.map((item) =>
            item.product.id === product.id
              ? { ...item, quantity: item.quantity + 1 }
              : item
          ),
        };
      }

      return {
        cart: [...state.cart, { product, quantity: 1 }],
      };
    }),
}));
