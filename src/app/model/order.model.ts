export interface Order {
  id: number;
  customerId: number;
  customerName: string;
  customerEmail: string;
  items: OrderItem[];
  totalAmount: number;
  status: 'pending' | 'confirmed' | 'processing' | 'shipped' | 'delivered' | 'cancelled';
  paymentMethod: string;
  paymentStatus: 'pending' | 'paid' | 'failed' | 'refunded';
  shippingAddress: Address;
  createdAt: Date;
  updatedAt: Date;
  notes?: string;
}

export interface OrderItem {
  id: number;
  productId: number;
  productName: string;
  productImage: string;
  price: number;
  quantity: number;
  size?: string;
  subtotal: number;
}

export interface Address {
  street: string;
  number: string;
  complement?: string;
  neighborhood: string;
  city: string;
  state: string;
  zipCode: string;
}

export interface DashboardStats {
  totalCustomers: number;
  totalOrders: number;
  totalRevenue: number;
  pendingOrders: number;
  completedOrders: number;
  topSellingProducts: ProductSales[];
  recentOrders: Order[];
  monthlyRevenue: MonthlyRevenue[];
}

export interface ProductSales {
  productId: number;
  productName: string;
  productImage: string;
  totalSold: number;
  revenue: number;
}

export interface MonthlyRevenue {
  month: string;
  revenue: number;
  orders: number;
}