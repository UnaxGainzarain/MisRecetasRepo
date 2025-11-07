// src/app/components/organisms/recipe-list/recipe-list.ts
import { Component, Input } from '@angular/core'; 
import { CommonModule } from '@angular/common'; // Necesario para *ngFor
import { Recipe } from '../../../models/recipe.model'; // Usamos la clase Recipe
import { RecipeCard } from '../recipe-card/recipe-card'; // Importamos RecipeCard

@Component({
  selector: 'app-recipe-list',
  standalone: true, // ¡Añadir standalone!
  imports: [CommonModule, RecipeCard], 
  templateUrl: './recipe-list.html',
  styleUrl: './recipe-list.scss'
})
export class RecipeList { 
  
  // Recibirá un array de la CLASE Recipe
  @Input() recipes: Recipe[] = []; 
}