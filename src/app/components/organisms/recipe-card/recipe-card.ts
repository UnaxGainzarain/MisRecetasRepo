import { Component, Input } from '@angular/core'; 
import { RecipeModel } from '../../../models/recipe.model'; 

@Component({
  selector: 'app-recipe-card',
  templateUrl: './recipe-card.html',
  styleUrl: './recipe-card.scss'
})
export class RecipeCardComponent { 
  @Input() recipe!: RecipeModel; 
}