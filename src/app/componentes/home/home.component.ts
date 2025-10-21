import { Component, OnInit, Inject, ViewChild, ElementRef, AfterViewInit, OnDestroy } from '@angular/core';
import { ClothingService } from '../../services/clothing.service';
import { LooksService } from '../../services/looks.service';
import { CartService } from '../../services/cart.service';
import { ActivatedRoute, Router } from '@angular/router';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { Clothing } from '../../model/clothing.model';

interface HeroSlide {
  imageUrl: string;
  title: string;
  subtitle: string;
  buttonText?: string;
  action?: string;
}

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss'],
  standalone: true,
  imports: [CommonModule, FormsModule]
})
export class HomeComponent implements OnInit, AfterViewInit, OnDestroy {
  @ViewChild('dressesCarousel') dressesCarousel!: ElementRef;
  @ViewChild('blousesCarousel') blousesCarousel!: ElementRef;
  @ViewChild('pantsCarousel') pantsCarousel!: ElementRef;
  @ViewChild('skirtsCarousel') skirtsCarousel!: ElementRef;
  @ViewChild('officeCarousel') officeCarousel!: ElementRef;
  @ViewChild('partyCarousel') partyCarousel!: ElementRef;
  @ViewChild('sportCarousel') sportCarousel!: ElementRef;
  @ViewChild('casualCarousel') casualCarousel!: ElementRef;
  heroSlides: HeroSlide[] = [
    {
      imageUrl: 'https://www.mariafilo.com.br/_next/image?url=https://mariafilo.vtexassets.com/assets/vtex.file-manager-graphql/images/92cd92f2-6e22-4d1b-9efd-0b8e1847f9a2___8af232c851db1f381d0fe1178a1bbd4a.jpg&w=3840&q=90',
      title: 'Descubra Seu Estilo Único',
      subtitle: 'Encontre as peças perfeitas para expressar sua personalidade',
      buttonText: 'Ver Coleção',
      action: 'collection'
    },
    {
      imageUrl: 'https://images.unsplash.com/photo-1441986300917-64674bd600d8?w=1200&h=600&fit=crop&crop=center',
      title: 'Nova Coleção Verão',
      subtitle: 'Looks frescos e modernos para os dias quentes',
      buttonText: 'Explorar',
      action: 'summer'
    },
    {
      imageUrl: 'https://images.unsplash.com/photo-1445205170230-053b83016050?w=1200&h=600&fit=crop&crop=center',
      title: 'Elegância para o Trabalho',
      subtitle: 'Peças sofisticadas para o ambiente profissional',
      buttonText: 'Ver Roupas',
      action: 'office'
    },
    {
      imageUrl: 'https://images.unsplash.com/photo-1434389677669-e08b4cac3105?w=1200&h=600&fit=crop&crop=center',
      title: 'Looks para Festas',
      subtitle: 'Brilhe em qualquer ocasião especial',
      buttonText: 'Descobrir',
      action: 'party'
    }
  ];

  currentSlideIndex: number = 0;
  carouselInterval: any;
  autoSlideInterval: number = 5000;
  casualClothing: Clothing[] = [];
  officeClothing: Clothing[] = [];
  partyClothing: Clothing[] = [];
  sportClothing: Clothing[] = [];
  skirts: Clothing[] = [];
  dresses: Clothing[] = [];
  pants: Clothing[] = [];
  blouses: Clothing[] = [];

  carouselImages: string[] = [];
  categories: string[] = [];
  filteredCatalog: Clothing[] = [];
  isSearching: boolean = false;
  currentSearchTerm: string = '';
  priceFilter: string = '';
  sizeFilter: string = '';
  originalSearchResults: Clothing[] = [];
  carouselStates: { [key: string]: { scrollPosition: number } } = {};
  showPaymentModal: boolean = false;
  currentProduct: Clothing | null = null;

  constructor(private clothingService: ClothingService, @Inject(LooksService) private looksService: LooksService, private cartService: CartService, private route: ActivatedRoute, private router: Router) { }

  ngOnInit(): void {
    this.clothingService.getCarouselImages().subscribe(images => {
      this.carouselImages = images;
    });

    this.clothingService.getCategories().subscribe(categories => {
      this.categories = categories;
    });

    this.loadProductsByCategory();
    this.route.queryParams.subscribe(params => {
      const search = params['q'];
      if (search && search.trim() !== '') {
        this.currentSearchTerm = search.trim();
        this.isSearching = true;
        this.clothingService.searchClothing(search).subscribe(results => {
          this.originalSearchResults = results.map(product => ({
            ...product,
            sizes: this.getRandomSizes()
          }));
          this.filteredCatalog = [...this.originalSearchResults];
          this.resetFilters();
        });
      } else {
        this.currentSearchTerm = '';
        this.isSearching = false;
        this.filteredCatalog = [];
        this.originalSearchResults = [];
        this.resetFilters();
      }
    });
  }

  private loadProductsByCategory(): void {
    this.clothingService.getClothingByCategory('Casual').subscribe(products => {
      this.casualClothing = products;
    });

    this.clothingService.getClothingByCategory('Escritório').subscribe(products => {
      this.officeClothing = products;
    });

    this.clothingService.getClothingByCategory('Festa').subscribe(products => {
      this.partyClothing = products;
    });

    this.clothingService.getClothingByCategory('Esporte').subscribe(products => {
      this.sportClothing = products;
    });

    this.clothingService.getClothingByCategory('Saias').subscribe(products => {
      this.skirts = products;
    });

    this.clothingService.getClothingByCategory('Vestidos').subscribe(products => {
      this.dresses = products;
    });

    this.clothingService.getClothingByCategory('Calças').subscribe(products => {
      this.pants = products;
    });

    this.clothingService.getClothingByCategory('Blusas').subscribe(products => {
      this.blouses = products;
    });
  }

  toggleFavorite(product: Clothing): void {
    const look = {
      id: product.id,
      name: product.name,
      category: product.category,
      image: product.imageUrl,
      description: product.description || ''
    };

    if (this.isFavorite(product)) {
      this.looksService.removeFavorite(look);
    } else {
      this.looksService.addFavorite(look);
    }
  }

  isFavorite(product: Clothing): boolean {
    const look = {
      id: product.id,
      name: product.name,
      category: product.category,
      image: product.imageUrl,
      description: product.description || ''
    };
    return this.looksService.isFavorite(look);
  }

  addToCart(product: Clothing): void {
    const cartItem = {
      id: product.id,
      name: product.name,
      price: product.price,
      originalPrice: product.originalPrice,
      quantity: 1,
      image: product.imageUrl,
      category: product.category,
      stock: product.stock || 99, // Assumir estoque padrão se não informado
      discount: product.originalPrice ? ((product.originalPrice - product.price) / product.originalPrice) * 100 : 0
    };

    const result = this.cartService.addToCartWithValidation(cartItem);
    
    if (result.success) {
      this.showSuccessNotification(result.message);
    } else {
      this.showErrorNotification(result.message);
    }
  }

  buyNow(product: Clothing): void {
    // Adicionar ao carrinho primeiro
    const cartItem = {
      id: product.id,
      name: product.name,
      price: product.price,
      originalPrice: product.originalPrice,
      quantity: 1,
      image: product.imageUrl,
      category: product.category,
      stock: product.stock || 99,
      discount: product.originalPrice ? ((product.originalPrice - product.price) / product.originalPrice) * 100 : 0
    };

    const result = this.cartService.addToCartWithValidation(cartItem);
    
    if (result.success) {
      this.router.navigate(['/compra']);
    } else {
      this.showErrorNotification(result.message);
    }
  }

  closePaymentModal(): void {
    this.showPaymentModal = false;
    this.currentProduct = null;
  }

  onPaymentComplete(paymentData: any): void {
    // Processar pagamento concluído
    console.log('Pagamento concluído:', paymentData);
    
    // Mostrar notificação de sucesso
    this.showSuccessNotification(`Compra realizada com sucesso! Pedido #${paymentData.orderId}`);
    
    // Fechar modal
    this.closePaymentModal();
  }

  getCurrentProductAsCartItems(): any[] {
    if (!this.currentProduct) return [];
    
    return [{
      id: this.currentProduct.id,
      name: this.currentProduct.name,
      price: this.currentProduct.price,
      quantity: 1,
      image: this.currentProduct.imageUrl
    }];
  }

  getCurrentProductTotal(): number {
    return this.currentProduct ? this.currentProduct.price : 0;
  }



  ngAfterViewInit(): void {
    // Inicializar estado dos carrosseis
    this.initializeCarouselStates();
    
    // Inicializar tooltips Bootstrap
    this.initializeTooltips();
    
    // Adicionar listeners de scroll para atualizar estado dos botões
    this.setupScrollListeners();
    
    // Iniciar carrossel automático do hero
    this.startAutoSlide();
  }

  private initializeCarouselStates(): void {
    const categories = ['dresses', 'blouses', 'pants', 'skirts', 'office', 'party', 'sport', 'casual'];
    categories.forEach(category => {
      this.carouselStates[category] = { scrollPosition: 0 };
    });
  }

  private initializeTooltips(): void {
    // Inicializar tooltips Bootstrap se disponível
    if (typeof (window as any).bootstrap !== 'undefined') {
      const tooltipTriggerList = document.querySelectorAll('[data-bs-toggle="tooltip"]');
      tooltipTriggerList.forEach(tooltipTriggerEl => {
        new (window as any).bootstrap.Tooltip(tooltipTriggerEl);
      });
    }
  }

  private setupScrollListeners(): void {
    const categories = ['dresses', 'blouses', 'pants', 'skirts', 'office', 'party', 'sport', 'casual'];
    
    setTimeout(() => {
      categories.forEach(category => {
        const carousel = this.getCarouselElement(category);
        if (carousel) {
          carousel.addEventListener('scroll', () => {
            // Debounce para evitar muitas chamadas
            setTimeout(() => {
              this.carouselStates[category].scrollPosition = carousel.scrollLeft;
            }, 50);
          });
        }
      });
    }, 100);
  }

  scrollCarousel(category: string, direction: number): void {
    const carousel = this.getCarouselElement(category);
    if (!carousel) return;

    // Calcular a largura real do item + gap
    const firstItem = carousel.querySelector('.catalog-item') as HTMLElement;
    const itemWidth = firstItem ? firstItem.offsetWidth + 20 : 200; // 20px é o gap
    const visibleWidth = carousel.clientWidth;
    const itemsToScroll = Math.floor(visibleWidth / itemWidth) || 1;
    const scrollAmount = itemWidth * itemsToScroll * direction;
    
    carousel.scrollBy({
      left: scrollAmount,
      behavior: 'smooth'
    });

    // Atualizar estado após a animação
    setTimeout(() => {
      this.carouselStates[category].scrollPosition = carousel.scrollLeft;
    }, 300);
  }

  canScrollLeft(category: string): boolean {
    const carousel = this.getCarouselElement(category);
    return carousel ? carousel.scrollLeft > 0 : false;
  }

  canScrollRight(category: string): boolean {
    const carousel = this.getCarouselElement(category);
    if (!carousel) return false;
    
    // Adicionar uma margem de tolerância de 1px para evitar problemas de arredondamento
    return carousel.scrollLeft < (carousel.scrollWidth - carousel.clientWidth - 1);
  }

  private getCarouselElement(category: string): HTMLElement | null {
    switch (category) {
      case 'dresses': return this.dressesCarousel?.nativeElement;
      case 'blouses': return this.blousesCarousel?.nativeElement;
      case 'pants': return this.pantsCarousel?.nativeElement;
      case 'skirts': return this.skirtsCarousel?.nativeElement;
      case 'office': return this.officeCarousel?.nativeElement;
      case 'party': return this.partyCarousel?.nativeElement;
      case 'sport': return this.sportCarousel?.nativeElement;
      case 'casual': return this.casualCarousel?.nativeElement;
      default: return null;
    }
  }

  // Métodos do carrossel automático
  ngOnDestroy(): void {
    if (this.carouselInterval) {
      clearInterval(this.carouselInterval);
    }
  }

  private startAutoSlide(): void {
    this.carouselInterval = setInterval(() => {
      this.nextSlide();
    }, this.autoSlideInterval);
  }

  private stopAutoSlide(): void {
    if (this.carouselInterval) {
      clearInterval(this.carouselInterval);
    }
  }

  nextSlide(): void {
    this.currentSlideIndex = (this.currentSlideIndex + 1) % this.heroSlides.length;
  }

  previousSlide(): void {
    this.currentSlideIndex = this.currentSlideIndex === 0 
      ? this.heroSlides.length - 1 
      : this.currentSlideIndex - 1;
  }

  goToSlide(index: number): void {
    this.currentSlideIndex = index;
    this.stopAutoSlide();
    setTimeout(() => this.startAutoSlide(), 3000); // Reinicia após 3 segundos
  }

  onHeroButtonClick(slide: HeroSlide): void {
    switch (slide.action) {
      case 'collection':
        window.scrollTo({ top: 600, behavior: 'smooth' });
        break;
      case 'summer':
        this.filterByCategory('Casual');
        break;
      case 'office':
        this.filterByCategory('Escritório');
        break;
      case 'party':
        this.filterByCategory('Festa');
        break;
      default:
        window.scrollTo({ top: 600, behavior: 'smooth' });
    }
  }

  filterByCategory(category: string): void {
    this.clothingService.getClothingByCategory(category).subscribe(products => {
      // Adicionar tamanhos fictícios e configurar para busca
      this.originalSearchResults = products.map(product => ({
        ...product,
        sizes: this.getRandomSizes()
      }));
      this.filteredCatalog = [...this.originalSearchResults];
      this.currentSearchTerm = category;
      this.isSearching = true;
      this.resetFilters();
      window.scrollTo({ top: 600, behavior: 'smooth' });
    });
  }

  clearSearch(): void {
    this.currentSearchTerm = '';
    this.isSearching = false;
    this.filteredCatalog = [];
    this.originalSearchResults = [];
    this.resetFilters();
    
    // Navegar para a home sem parâmetros de busca
    this.router.navigate(['/home']);
    
    // Scroll para o topo
    window.scrollTo({ top: 0, behavior: 'smooth' });
  }

  getRandomSizes(): string[] {
    const allSizes = ['PP', 'P', 'M', 'G', 'GG', 'XG'];
    const numSizes = Math.floor(Math.random() * 4) + 3; // Entre 3 e 6 tamanhos
    const shuffled = allSizes.sort(() => 0.5 - Math.random());
    return shuffled.slice(0, numSizes);
  }

  resetFilters(): void {
    this.priceFilter = '';
    this.sizeFilter = '';
  }

  onPriceFilterChange(): void {
    this.applyFilters();
  }

  onSizeFilterChange(): void {
    this.applyFilters();
  }

  applyFilters(): void {
    let filtered = [...this.originalSearchResults];

    // Filtro por tamanho
    if (this.sizeFilter && this.sizeFilter !== '') {
      filtered = filtered.filter(product => 
        product.sizes && product.sizes.includes(this.sizeFilter)
      );
    }

    // Filtro por preço
    if (this.priceFilter && this.priceFilter !== '') {
      switch (this.priceFilter) {
        case 'asc':
          filtered.sort((a, b) => a.price - b.price);
          break;
        case 'desc':
          filtered.sort((a, b) => b.price - a.price);
          break;
        case 'under50':
          filtered = filtered.filter(product => product.price < 50);
          break;
        case 'between50and100':
          filtered = filtered.filter(product => product.price >= 50 && product.price <= 100);
          break;
        case 'above100':
          filtered = filtered.filter(product => product.price > 100);
          break;
      }
    }

    this.filteredCatalog = filtered;
  }

  clearFilters(): void {
    this.resetFilters();
    this.filteredCatalog = [...this.originalSearchResults];
  }

  // Métodos de notificação
  private showSuccessNotification(message: string): void {
    this.createNotification(message, 'success');
  }

  private showErrorNotification(message: string): void {
    this.createNotification(message, 'error');
  }

  private createNotification(message: string, type: 'success' | 'error'): void {
    const notification = document.createElement('div');
    notification.className = `cart-notification ${type}`;
    
    const icon = type === 'success' ? 'bi-check-circle-fill' : 'bi-exclamation-triangle-fill';
    const bgColor = type === 'success' 
      ? 'linear-gradient(135deg, #28a745, #20c997)' 
      : 'linear-gradient(135deg, #dc3545, #c82333)';
    
    notification.innerHTML = `
      <i class="bi ${icon}"></i>
      <span>${message}</span>
    `;
    
    notification.style.cssText = `
      position: fixed;
      top: 20px;
      right: 20px;
      background: ${bgColor};
      color: white;
      padding: 15px 20px;
      border-radius: 8px;
      box-shadow: 0 4px 12px rgba(0,0,0,0.15);
      z-index: 99999;
      display: flex;
      align-items: center;
      gap: 10px;
      font-size: 14px;
      font-weight: 500;
      transform: translateX(100%);
      transition: transform 0.3s ease-out;
      max-width: 350px;
    `;

    document.body.appendChild(notification);

    // Animar entrada
    setTimeout(() => {
      notification.style.transform = 'translateX(0)';
    }, 100);

    // Remover após 4 segundos
    setTimeout(() => {
      notification.style.transform = 'translateX(100%)';
      setTimeout(() => {
        if (document.body.contains(notification)) {
          document.body.removeChild(notification);
        }
      }, 300);
    }, 4000);
  }

}
