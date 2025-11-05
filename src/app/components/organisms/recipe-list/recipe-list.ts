import { Component, input } from '@angular/core';
import { RecipeModel } from '../../../models/recipe.model';
import { RecipeCard } from '../recipe-card/recipe-card'; // Importamos la tarjeta
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-recipe-list',
  standalone: true,
  imports: [CommonModule, RecipeCard], // Añadimos RecipeCard a los imports
  templateUrl: './recipe-list.html',
  styleUrl: './recipe-list.scss'
})
export class RecipeList {
  // Recibe el array de recetas desde el componente padre (la página)
  recipes = input<RecipeModel[]>([]);
}