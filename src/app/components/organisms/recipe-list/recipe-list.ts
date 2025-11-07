// Abre tu archivo: src/app/components/organisms/recipe-list/recipe-list.ts
import { Component, Input } from '@angular/core'; 
import { RecipeModel } from '../../../models/recipe.model'; 

@Component({
  selector: 'app-recipe-list', // La etiqueta HTML es <app-recipe-list>
  templateUrl: './recipe-list.html',
  styleUrl: './recipe-list.scss'
})
export class RecipeList { // El nombre de la CLASE es RecipeList
  
  // Así le dices que puede recibir [recipes] desde fuera
  @Input() recipes: RecipeModel[] = []; 
}