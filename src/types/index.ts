export interface MenuItem {
  id: string;
  name: string;
  description: string;
  price: number;
  category: 'Starters' | 'Heritage' | 'Desserts';
  dietType: 'veg' | 'nonveg';
  imageUrl: string;
  cutoutUrl?: string;
  isSignature: boolean;
  isAvailable: boolean;
  createdAt: Date;
}

export interface OrderItem {
  id: string;
  orderId: string;
  menuItemId: string;
  name: string;
  price: number;
  quantity: number;
}

export interface Order {
  id: string;
  customerName: string;
  phone: string;
  address: string;
  orderType: 'delivery' | 'pickup';
  status: 'placed' | 'preparing' | 'ready' | 'delivered';
  totalAmount: number;
  notes?: string;
  items: OrderItem[];
  createdAt: Date;
}

export interface CartItem {
  id: string;
  name: string;
  price: number;
  quantity: number;
  imageUrl: string;
}

export type DietType = 'veg' | 'nonveg';
export type CategoryType = 'Starters' | 'Heritage' | 'Desserts';
