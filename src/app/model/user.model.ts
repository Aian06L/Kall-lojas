export interface User {
  id: number;
  name: string;
  email: string;
  password?: string;
  role: 'admin' | 'customer';
  phone?: string;
  address?: Address;
  createdAt: Date;
  isActive: boolean;
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