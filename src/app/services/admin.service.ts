import { Injectable } from '@angular/core';
import { BehaviorSubject, Observable, of } from 'rxjs';
import { Order, DashboardStats, ProductSales, MonthlyRevenue } from '../model/order.model';
import { User } from '../model/user.model';

@Injectable({
  providedIn: 'root'
})
export class AdminService {
  private ordersSubject = new BehaviorSubject<Order[]>([]);
  public orders$ = this.ordersSubject.asObservable();

  private customersSubject = new BehaviorSubject<User[]>([]);
  public customers$ = this.customersSubject.asObservable();

  constructor() {
    this.initializeMockData();
  }

  private initializeMockData(): void {
    // Dados fictícios de clientes
    const mockCustomers: User[] = [
      {
        id: 1,
        name: 'Ana Silva',
        email: 'ana@email.com',
        role: 'customer',
        phone: '(11) 99999-1111',
        createdAt: new Date('2024-01-15'),
        isActive: true,
        address: {
          street: 'Rua das Flores',
          number: '123',
          neighborhood: 'Centro',
          city: 'São Paulo',
          state: 'SP',
          zipCode: '01000-000'
        }
      },
      {
        id: 2,
        name: 'Maria Santos',
        email: 'maria@email.com',
        role: 'customer',
        phone: '(11) 99999-2222',
        createdAt: new Date('2024-02-20'),
        isActive: true,
        address: {
          street: 'Av. Principal',
          number: '456',
          neighborhood: 'Vila Nova',
          city: 'São Paulo',
          state: 'SP',
          zipCode: '02000-000'
        }
      },
      {
        id: 3,
        name: 'Julia Costa',
        email: 'julia@email.com',
        role: 'customer',
        phone: '(11) 99999-3333',
        createdAt: new Date('2024-03-10'),
        isActive: true,
        address: {
          street: 'Rua da Paz',
          number: '789',
          neighborhood: 'Jardim',
          city: 'São Paulo',
          state: 'SP',
          zipCode: '03000-000'
        }
      }
    ];

    // Dados fictícios de pedidos
    const mockOrders: Order[] = [
      {
        id: 1001,
        customerId: 1,
        customerName: 'Ana Silva',
        customerEmail: 'ana@email.com',
        items: [
          {
            id: 1,
            productId: 1,
            productName: 'Vestido Floral Verão',
            productImage: 'https://images.unsplash.com/photo-1515372039744-b8f02a3ae446?w=300&h=300&fit=crop',
            price: 89.90,
            quantity: 1,
            size: 'M',
            subtotal: 89.90
          }
        ],
        totalAmount: 89.90,
        status: 'delivered',
        paymentMethod: 'Cartão de Crédito',
        paymentStatus: 'paid',
        shippingAddress: mockCustomers[0].address!,
        createdAt: new Date('2024-10-15'),
        updatedAt: new Date('2024-10-18')
      },
      {
        id: 1002,
        customerId: 2,
        customerName: 'Maria Santos',
        customerEmail: 'maria@email.com',
        items: [
          {
            id: 2,
            productId: 2,
            productName: 'Blusa Casual Básica',
            productImage: 'https://images.unsplash.com/photo-1551698618-1dfe5d97d256?w=300&h=300&fit=crop',
            price: 45.90,
            quantity: 2,
            size: 'P',
            subtotal: 91.80
          }
        ],
        totalAmount: 91.80,
        status: 'processing',
        paymentMethod: 'PIX',
        paymentStatus: 'paid',
        shippingAddress: mockCustomers[1].address!,
        createdAt: new Date('2024-10-18'),
        updatedAt: new Date('2024-10-18')
      },
      {
        id: 1003,
        customerId: 3,
        customerName: 'Julia Costa',
        customerEmail: 'julia@email.com',
        items: [
          {
            id: 3,
            productId: 3,
            productName: 'Calça Jeans Skinny',
            productImage: 'https://images.unsplash.com/photo-1541099649105-f69ad21f3246?w=300&h=300&fit=crop',
            price: 129.90,
            quantity: 1,
            size: 'G',
            subtotal: 129.90
          }
        ],
        totalAmount: 129.90,
        status: 'pending',
        paymentMethod: 'Cartão de Débito',
        paymentStatus: 'pending',
        shippingAddress: mockCustomers[2].address!,
        createdAt: new Date('2024-10-20'),
        updatedAt: new Date('2024-10-20')
      }
    ];

    this.customersSubject.next(mockCustomers);
    this.ordersSubject.next(mockOrders);
  }

  getOrders(): Observable<Order[]> {
    return this.orders$;
  }

  getCustomers(): Observable<User[]> {
    return new Observable(observer => {
      setTimeout(() => {
        const registeredUsers = this.getAllRegisteredUsers();
        const systemCustomers = this.customersSubject.value;
        const allCustomers = [...systemCustomers, ...registeredUsers];
        observer.next(allCustomers);
        observer.complete();
      }, 500);
    });
  }

  updateOrderStatus(orderId: number, status: Order['status']): Observable<boolean> {
    const orders = this.ordersSubject.value;
    const orderIndex = orders.findIndex(order => order.id === orderId);
    
    if (orderIndex !== -1) {
      orders[orderIndex].status = status;
      orders[orderIndex].updatedAt = new Date();
      this.ordersSubject.next([...orders]);
      return of(true);
    }
    
    return of(false);
  }

  getDashboardStats(): Observable<DashboardStats> {
    const orders = this.ordersSubject.value;
    const customers = this.customersSubject.value;

    const stats: DashboardStats = {
      totalCustomers: customers.length,
      totalOrders: orders.length,
      totalRevenue: orders.reduce((sum, order) => sum + order.totalAmount, 0),
      pendingOrders: orders.filter(o => o.status === 'pending').length,
      completedOrders: orders.filter(o => o.status === 'delivered').length,
      topSellingProducts: this.calculateTopSellingProducts(orders),
      recentOrders: orders.slice(-5).reverse(),
      monthlyRevenue: this.calculateMonthlyRevenue(orders)
    };

    return of(stats);
  }

  private calculateTopSellingProducts(orders: Order[]): ProductSales[] {
    const productMap = new Map<number, ProductSales>();

    orders.forEach(order => {
      order.items.forEach(item => {
        const existing = productMap.get(item.productId);
        if (existing) {
          existing.totalSold += item.quantity;
          existing.revenue += item.subtotal;
        } else {
          productMap.set(item.productId, {
            productId: item.productId,
            productName: item.productName,
            productImage: item.productImage,
            totalSold: item.quantity,
            revenue: item.subtotal
          });
        }
      });
    });

    return Array.from(productMap.values())
      .sort((a, b) => b.totalSold - a.totalSold)
      .slice(0, 5);
  }

  private calculateMonthlyRevenue(orders: Order[]): MonthlyRevenue[] {
    const monthMap = new Map<string, { revenue: number; orders: number }>();
    
    orders.forEach(order => {
      const month = order.createdAt.toISOString().slice(0, 7); // YYYY-MM
      const existing = monthMap.get(month);
      
      if (existing) {
        existing.revenue += order.totalAmount;
        existing.orders += 1;
      } else {
        monthMap.set(month, {
          revenue: order.totalAmount,
          orders: 1
        });
      }
    });

    return Array.from(monthMap.entries())
      .map(([month, data]) => ({
        month,
        revenue: data.revenue,
        orders: data.orders
      }))
      .sort((a, b) => a.month.localeCompare(b.month))
      .slice(-6); // Últimos 6 meses
  }

  getOrderById(id: number): Observable<Order | null> {
    const order = this.ordersSubject.value.find(o => o.id === id);
    return of(order || null);
  }

  deleteOrder(id: number): Observable<boolean> {
    const orders = this.ordersSubject.value;
    const filteredOrders = orders.filter(o => o.id !== id);
    
    if (filteredOrders.length < orders.length) {
      this.ordersSubject.next(filteredOrders);
      return of(true);
    }
    
    return of(false);
  }

  updateCustomer(customer: User): Observable<User> {
    return new Observable(observer => {
      setTimeout(() => {
        // Atualizar na lista de clientes do sistema
        const customers = this.customersSubject.value;
        const index = customers.findIndex(c => c.id === customer.id);
        
        if (index !== -1) {
          customers[index] = customer;
          this.customersSubject.next([...customers]);
        } else {
          // Se não estiver na lista do sistema, tentar atualizar nos registrados
          const registeredUsers = this.getAllRegisteredUsers();
          const regIndex = registeredUsers.findIndex(u => u.id === customer.id);
          
          if (regIndex !== -1) {
            registeredUsers[regIndex] = customer;
            localStorage.setItem('registeredUsers', JSON.stringify(registeredUsers));
          }
        }
        
        observer.next(customer);
        observer.complete();
      }, 300);
    });
  }

  private getAllRegisteredUsers(): User[] {
    const stored = localStorage.getItem('registeredUsers');
    return stored ? JSON.parse(stored) : [];
  }
}