// src/app/components/organisms/recipe-card/recipe-card.ts

import { Component, Input } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterLink } from '@angular/router';

@Component({
  selector: 'app-recipe-card',
  standalone: true, // ¡Añadir standalone!
  imports: [CommonModule, RouterLink],
  templateUrl: './recipe-card.html',
  styleUrl: './recipe-card.scss'
})
export class RecipeCard {
  @Input() id!: number; // <-- ¡NUEVO!
  @Input() title: string = 'Título de la Receta';
  @Input() description: string = 'Una deliciosa receta que te encantará.';
  @Input() ingredients: string[] = []; 
  @Input() imageUrl: string = 'https://via.placeholder.com/300x200';
}