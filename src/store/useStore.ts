import { create } from "zustand";
import type {
  Product,
  User,
  CartItem,
  Auth,
  Order,
  StoreStats,
  DiscountCode,
} from "@/types";
import { generateDiscountCode } from "@/utils/discount";

interface StoreState extends Auth {
  //product
  products: Product[];

  //cart
  cart: CartItem[];
  addToCart: (product: Product) => void;

  //order
  orders: Order[];

  // discount
  discountCodes: DiscountCode[];
  generateDiscountCode: () => DiscountCode | null;
  validateDiscountCode: (code: string) => boolean;

  //stats
  getStoreStats: () => StoreStats;

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
    price: 12999.0,
    description: "Premium wireless headphones with noise cancellation",
    image:
      "https://images.pexels.com/photos/3394650/pexels-photo-3394650.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1",
  },
  {
    id: "2",
    name: "Smartwatch",
    price: 1599.0,
    description: "Feature-rich smartwatch with health tracking",
    image:
      "https://images.pexels.com/photos/437037/pexels-photo-437037.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1",
  },
  {
    id: "3",
    name: "Bluetooth Speaker",
    price: 7900.0,
    description: "Portable Bluetooth speaker with deep bass",
    image:
      "https://images.pexels.com/photos/1279107/pexels-photo-1279107.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1",
  },
  {
    id: "4",
    name: "Laptop Backpack",
    price: 5999.0,
    description: "Stylish and functional laptop backpack",
    image:
      "https://modernquests.com/cdn/shop/files/inateck-roll-top-laptop-backpack-black-1.jpg?v=1716108665",
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
    price: 1199.0,
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

  getStoreStats: () => {
    const { orders } = get();

    const totalItemsPurchased = orders.reduce((total, order) => {
      return (
        total +
        order.items.reduce((itemTotal, item) => itemTotal + item.quantity, 0)
      );
    }, 0);

    const totalPurchaseAmount = orders.reduce(
      (total, order) => total + order.finalTotal,
      0
    );

    const usedDiscountCodes = orders
      .filter((order) => order.discountCode)
      .map((order) => order.discountCode as string);

    const totalDiscountAmount = orders.reduce(
      (total, order) => total + order.discountAmount,
      0
    );

    return {
      totalItemsPurchased,
      totalPurchaseAmount,
      usedDiscountCodes,
      totalDiscountAmount,
    };
  },

  generateDiscountCode: () => {
    const code = generateDiscountCode();
    const newDiscountCode: DiscountCode = {
      code,
      percentage: 10,
      isUsed: false,
      createdAt: new Date(),
    };

    set((state) => ({
      discountCodes: [...state.discountCodes, newDiscountCode],
    }));

    return newDiscountCode;
  },

  validateDiscountCode: (code) => {
    const { discountCodes } = get();
    return discountCodes.some((dc) => dc.code === code && !dc.isUsed);
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
