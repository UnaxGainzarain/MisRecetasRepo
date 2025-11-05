import { Component, input } from '@angular/core';
import { RecipeModel } from '../../../models/recipe.model';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-recipe-card',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './recipe-card.html',
  styleUrl: './recipe-card.scss'
})
export class RecipeCard {
  // Este input recibirá la receta desde el componente padre (la lista)
  recipe = input.required<RecipeModel>();

  // Dejaremos el output de borrado preparado para el futuro
  // deleteRecipe = output<void>();
}