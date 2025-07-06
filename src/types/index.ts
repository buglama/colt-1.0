export interface Restaurant {
  id: string;
  name: string;
  imageUrl: string;
  categories: string[];
  rating: number;
  deliveryTime: number;
  deliveryFee: number;
  discount?: string;
  distance: number;
  address: string;
  description?: string;
  isOpen: boolean;
}

export interface Product {
  id: string;
  name: string;
  description: string;
  price: number;
  originalPrice?: number;
  imageUrl?: string;
  discount?: string;
  restaurant?: string;
  restaurantId?: string;
  category?: string;
  options?: ProductOption[];
}

export interface ProductOption {
  id: string;
  name: string;
  choices: {
    id: string;
    name: string;
    price: number;
  }[];
  required?: boolean;
  multiple?: boolean;
  max?: number;
}

export interface CartItem {
  id: string;
  name: string;
  price: number;
  imageUrl?: string;
  quantity: number;
  options?: {
    name: string;
    choices: {
      name: string;
      price: number;
    }[];
  }[];
}

export interface Category {
  id: string;
  name: string;
  icon: string;
}

export interface Order {
  id: string;
  restaurantId: string;
  restaurantName: string;
  items: CartItem[];
  status: 'Gözlənilir' | 'Hazırlanır' | 'Çatdırılır' | 'Çatdırıldı' | 'Ləğv edildi';
  total: number;
  subtotal: number;
  deliveryFee: number;
  cashbackAmount: number;
  cashbackPercent: number;
  date: string;
  deliveryAddress: {
    address: string;
    city: string;
    postalCode: string;
  };
  paymentMethod: string;
  estimatedDeliveryTime?: number;
}

export interface ReferralUser {
  id: string;
  name: string;
  email?: string;
  joinedDate: string;
  earnings: number;
  referredUsers?: number;
}

export interface CashbackTransaction {
  id: string;
  type: 'Sifariş' | 'Referal' | 'Çıxarış';
  amount: number;
  date: string;
  orderId?: string;
  referredUser?: string;
  referralLevel?: number;
  cashbackPercent?: number;
  method?: string;
}

export interface Address {
  id: string;
  label: string;
  address: string;
  details?: string;
  city: string;
  postalCode: string;
  isDefault: boolean;
}

export interface PaymentMethod {
  id: string;
  type: 'card' | 'paypal' | 'apple' | 'google';
  last4?: string;
  expiry?: string;
  brand?: string;
  name?: string;
  email?: string;
  isDefault: boolean;
}