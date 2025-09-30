import { Component, OnInit } from '@angular/core';
import { LooksService, Look } from '../../services/looks.service';
import { CommonModule } from '@angular/common';
import { RouterLink } from "@angular/router";

@Component({
  selector: 'app-favoritos',
  templateUrl: './favoritos.component.html',
  styleUrls: ['./favoritos.component.scss'],
  standalone: true,
  imports: [CommonModule, RouterLink]
})
export class FavoritosComponent implements OnInit {
  favorites: Look[] = [];

  constructor(private looksService: LooksService) {}

  ngOnInit(): void {
    this.loadFavorites();
  }

  loadFavorites(): void {
    this.favorites = this.looksService.getFavorites();
  }
}
