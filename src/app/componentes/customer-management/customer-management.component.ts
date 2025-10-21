import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';
import { FormsModule } from '@angular/forms';
import { AdminService } from '../../services/admin.service';
import { User } from '../../model/user.model';

@Component({
  selector: 'app-customer-management',
  templateUrl: './customer-management.component.html',
  styleUrls: ['./customer-management.component.scss'],
  standalone: true,
  imports: [CommonModule, RouterModule, FormsModule]
})
export class CustomerManagementComponent implements OnInit {
  customers: User[] = [];
  filteredCustomers: User[] = [];
  loading = true;
  searchTerm = '';
  selectedStatus = 'all';
  
  // Paginação
  currentPage = 1;
  itemsPerPage = 10;
  totalPages = 0;

  constructor(private adminService: AdminService) {}

  ngOnInit(): void {
    this.loadCustomers();
  }

  loadCustomers(): void {
    this.loading = true;
    
    this.adminService.getCustomers().subscribe({
      next: (customers) => {
        this.customers = customers;
        this.applyFilters();
        this.loading = false;
      },
      error: (error) => {
        console.error('Erro ao carregar clientes:', error);
        this.loading = false;
      }
    });
  }

  applyFilters(): void {
    let filtered = [...this.customers];

    // Filtro por texto
    if (this.searchTerm.trim()) {
      const search = this.searchTerm.toLowerCase();
      filtered = filtered.filter(customer => 
        customer.name.toLowerCase().includes(search) ||
        customer.email.toLowerCase().includes(search)
      );
    }

    // Filtro por status
    if (this.selectedStatus !== 'all') {
      const isActive = this.selectedStatus === 'active';
      filtered = filtered.filter(customer => customer.isActive === isActive);
    }

    this.filteredCustomers = filtered;
    this.calculatePagination();
  }

  calculatePagination(): void {
    this.totalPages = Math.ceil(this.filteredCustomers.length / this.itemsPerPage);
    if (this.currentPage > this.totalPages && this.totalPages > 0) {
      this.currentPage = this.totalPages;
    }
  }

  getPaginatedCustomers(): User[] {
    const startIndex = (this.currentPage - 1) * this.itemsPerPage;
    const endIndex = startIndex + this.itemsPerPage;
    return this.filteredCustomers.slice(startIndex, endIndex);
  }

  onSearchChange(): void {
    this.currentPage = 1;
    this.applyFilters();
  }

  onStatusChange(): void {
    this.currentPage = 1;
    this.applyFilters();
  }

  toggleCustomerStatus(customer: User): void {
    const updatedCustomer = { ...customer, isActive: !customer.isActive };
    
    this.adminService.updateCustomer(updatedCustomer).subscribe({
      next: (updated) => {
        const index = this.customers.findIndex(c => c.id === customer.id);
        if (index !== -1) {
          this.customers[index] = updated;
          this.applyFilters();
        }
      },
      error: (error) => {
        console.error('Erro ao atualizar status do cliente:', error);
      }
    });
  }

  goToPage(page: number): void {
    if (page >= 1 && page <= this.totalPages) {
      this.currentPage = page;
    }
  }

  getPageNumbers(): number[] {
    const pages: number[] = [];
    const maxVisible = 5;
    let start = Math.max(1, this.currentPage - Math.floor(maxVisible / 2));
    let end = Math.min(this.totalPages, start + maxVisible - 1);
    
    if (end - start + 1 < maxVisible) {
      start = Math.max(1, end - maxVisible + 1);
    }
    
    for (let i = start; i <= end; i++) {
      pages.push(i);
    }
    
    return pages;
  }

  formatDate(date: Date): string {
    return new Intl.DateTimeFormat('pt-BR', {
      day: '2-digit',
      month: '2-digit',
      year: 'numeric'
    }).format(new Date(date));
  }

  getStatusText(isActive: boolean): string {
    return isActive ? 'Ativo' : 'Inativo';
  }

  getStatusClass(isActive: boolean): string {
    return isActive ? 'status-active' : 'status-inactive';
  }
}