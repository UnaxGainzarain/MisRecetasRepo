import { Component, input, output, computed } from '@angular/core';
import { RouterLink } from '@angular/router';
import { DecimalPipe } from '@angular/common'; // <--- 1. IMPORTAR ESTO
import { Recipe } from '../../../models/recipe.model';

@Component({
  selector: 'app-recipe-card',
  standalone: true,
  imports: [RouterLink, DecimalPipe], // <--- 2. AÑADIRLO AQUÍ
  templateUrl: './recipe-card.html',
  styleUrl: './recipe-card.scss'
})
export class RecipeCard {
  recipe = input.required<Recipe>();
  
  onVote = output<number>();

  averageRating = computed(() => {
    const ratings = this.recipe().ratings || [];
    if (ratings.length === 0) return 0;
    return ratings.reduce((a, b) => a + b, 0) / ratings.length;
  });

  vote(stars: number) {
    this.onVote.emit(stars);
  }
}