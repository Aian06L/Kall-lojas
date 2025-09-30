import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ActivatedRoute, Router } from '@angular/router';
import { LooksService, Look } from '../../services/looks.service';

@Component({
  selector: 'app-looks',
  imports: [CommonModule],
  templateUrl: './looks.component.html',
  styleUrls: ['./looks.component.scss']
})
export class LooksComponent implements OnInit {
  looks: Look[] = [];
  filteredLooks: Look[] = [];
  categories: string[] = [];
  selectedCategory: string = '';

  constructor(
    private looksService: LooksService,
    private route: ActivatedRoute,
    private router: Router
  ) {}

  ngOnInit(): void {
    this.looks = this.looksService.getLooks();
    this.categories = this.looksService.getCategories();

    this.route.queryParams.subscribe(params => {
      this.selectedCategory = params['category'] || '';
      this.filterLooks();
    });
  }

  filterLooks(): void {
    if (this.selectedCategory) {
      this.filteredLooks = this.looksService.getLooksByCategory(this.selectedCategory);
    } else {
      this.filteredLooks = this.looks;
    }
  }

  onCategoryChange(category: string): void {
    this.router.navigate(['/looks'], { queryParams: { category } });
  }

  clearFilter(): void {
    this.router.navigate(['/looks']);
  }

  toggleFavorite(look: Look): void {
    if (this.isFavorite(look)) {
      this.looksService.removeFavorite(look);
    } else {
      this.looksService.addFavorite(look);
    }
  }

  isFavorite(look: Look): boolean {
    return this.looksService.isFavorite(look);
  }

  addToCart(look: Look): void {
    // Implement add to cart logic here
    console.log(`Added to cart: ${look.name}`);
  }

  buyNow(look: Look): void {
    // Implement buy now logic here
    console.log(`Buying now: ${look.name}`);
  }
}
