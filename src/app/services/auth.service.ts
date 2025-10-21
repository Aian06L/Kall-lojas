import { Injectable } from '@angular/core';
import { BehaviorSubject, Observable } from 'rxjs';
import { User } from '../model/user.model';

@Injectable({
  providedIn: 'root'
})
export class AuthService {
  private isAuthenticatedSubject = new BehaviorSubject<boolean>(false);
  public isAuthenticated$ = this.isAuthenticatedSubject.asObservable();

  private currentUserSubject = new BehaviorSubject<User | null>(null);
  public currentUser$ = this.currentUserSubject.asObservable();

  constructor() {
    // Check if user is logged in from localStorage
    const token = localStorage.getItem('authToken');
    const userData = localStorage.getItem('currentUser');
    
    if (token && userData) {
      const user = JSON.parse(userData);
      this.currentUserSubject.next(user);
      this.isAuthenticatedSubject.next(true);
    }
  }

  login(email: string, password: string): { success: boolean; user?: User; error?: string } {
    // Mock users for demonstration
    const mockUsers: User[] = [
      {
        id: 1,
        name: 'Admin Kall Store',
        email: 'admin@kall.store',
        role: 'admin',
        phone: '(11) 3000-0001',
        createdAt: new Date('2024-01-01'),
        isActive: true,
        address: {
          street: 'Av. Paulista',
          number: '1000',
          complement: 'Conj. 801',
          neighborhood: 'Bela Vista',
          city: 'São Paulo',
          state: 'SP',
          zipCode: '01310-100'
        }
      },
      {
        id: 2,
        name: 'Cliente Demonstração',
        email: 'cliente@demo.com',
        role: 'customer',
        phone: '(11) 99999-8888',
        createdAt: new Date('2024-02-15'),
        isActive: true,
        address: {
          street: 'Rua das Flores',
          number: '456',
          complement: 'Apto 101',
          neighborhood: 'Jardins',
          city: 'São Paulo',
          state: 'SP',
          zipCode: '01420-010'
        }
      },
      {
        id: 3,
        name: 'João Silva',
        email: 'joao@teste.com',
        role: 'customer',
        phone: '(21) 98765-4321',
        createdAt: new Date('2024-03-10'),
        isActive: true,
        address: {
          street: 'Rua Copacabana',
          number: '123',
          complement: '',
          neighborhood: 'Copacabana',
          city: 'Rio de Janeiro',
          state: 'RJ',
          zipCode: '22070-011'
        }
      }
    ];

    // Check credentials
    let user: User | undefined;
    
    // ========== CREDENCIAIS DE TESTE PARA ADMINISTRADOR ==========
    if (email === 'admin@kall.store' && password === 'Kall@2025!') {
      user = mockUsers.find(u => u.role === 'admin');
    } 
    // ========== CREDENCIAIS DE TESTE PARA CLIENTE ==========
    else if (email === 'cliente@demo.com' && password === 'Demo123!') {
      user = mockUsers.find(u => u.email === 'cliente@demo.com');
    }
    else if (email === 'joao@teste.com' && password === 'Joao123!') {
      user = mockUsers.find(u => u.email === 'joao@teste.com');
    }
    // ========== CREDENCIAIS ANTIGAS PARA COMPATIBILIDADE ==========
    else if (email === 'admin@kall.com' && password === 'admin123') {
      user = mockUsers.find(u => u.role === 'admin');
    } 
    else if (email === 'cliente@email.com' && password === 'cliente123') {
      user = mockUsers.find(u => u.role === 'customer');
    } 
    else {
      // Check registered users (simulação - normalmente seria no backend com hash de senha)
      const registeredUsers = this.getAllUsers();
      user = registeredUsers.find(u => u.email === email);
      
      // Para demonstração, aceitar qualquer senha para usuários registrados
      // Em produção, verificaria o hash da senha
      if (!user) {
        return { success: false, error: 'Credenciais inválidas. Verifique email e senha.' };
      }
    }

    if (user) {
      localStorage.setItem('authToken', 'mock-token-' + user.role);
      localStorage.setItem('currentUser', JSON.stringify(user));
      this.currentUserSubject.next(user);
      this.isAuthenticatedSubject.next(true);
      return { success: true, user };
    }

    return { success: false, error: 'Credenciais inválidas' };
  }

  logout(): void {
    localStorage.removeItem('authToken');
    localStorage.removeItem('currentUser');
    this.currentUserSubject.next(null);
    this.isAuthenticatedSubject.next(false);
  }

  isAuthenticated(): boolean {
    return this.isAuthenticatedSubject.value;
  }

  getCurrentUser(): User | null {
    return this.currentUserSubject.value;
  }

  isAdmin(): boolean {
    const user = this.getCurrentUser();
    return user?.role === 'admin';
  }

  isCustomer(): boolean {
    const user = this.getCurrentUser();
    return user?.role === 'customer';
  }

  register(userData: { name: string, email: string, password: string }): { success: boolean, error?: string, user?: User } {
    // Verificar se email já existe
    if (this.emailExists(userData.email)) {
      return { success: false, error: 'Este email já está cadastrado' };
    }

    // Criar novo usuário
    const newUser: User = {
      id: Date.now(), // ID simples baseado no timestamp
      name: userData.name,
      email: userData.email,
      role: 'customer', // Novos usuários são sempre clientes
      createdAt: new Date(),
      isActive: true,
      address: {
        street: '',
        number: '',
        complement: '',
        neighborhood: '',
        city: '',
        state: '',
        zipCode: ''
      }
    };

    // Salvar usuário na lista (simulação - em produção seria no backend)
    const existingUsers = this.getAllUsers();
    existingUsers.push(newUser);
    localStorage.setItem('registeredUsers', JSON.stringify(existingUsers));

    return { success: true, user: newUser };
  }

  emailExists(email: string): boolean {
    // Verificar emails padrão do sistema
    const systemEmails = [
      'admin@kall.store',
      'cliente@demo.com', 
      'joao@teste.com',
      // Compatibilidade com emails antigos
      'admin@kall.com', 
      'cliente@email.com'
    ];
    
    if (systemEmails.includes(email)) {
      return true;
    }

    // Verificar usuários cadastrados
    const registeredUsers = this.getAllUsers();
    return registeredUsers.some(user => user.email === email);
  }

  private getAllUsers(): User[] {
    const stored = localStorage.getItem('registeredUsers');
    return stored ? JSON.parse(stored) : [];
  }

  updateUserProfile(userData: Partial<User>): Observable<User> {
    const currentUser = this.getCurrentUser();
    if (currentUser) {
      const updatedUser = { ...currentUser, ...userData };
      localStorage.setItem('currentUser', JSON.stringify(updatedUser));
      this.currentUserSubject.next(updatedUser);
      return new BehaviorSubject(updatedUser).asObservable();
    }
    throw new Error('Usuário não encontrado');
  }
}
