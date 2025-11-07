import { Component, Input } from '@angular/core'; 
import { CommonModule } from '@angular/common'; 
import { Recipe } from '../../../models/recipe.model'; 
import { RecipeCard } from '../recipe-card/recipe-card'; 

@Component({
  selector: 'app-recipe-list',
  standalone: true, 
  imports: [CommonModule, RecipeCard], 
  templateUrl: './recipe-list.html',
  styleUrl: './recipe-list.scss'
})
export class RecipeList { 
  
  @Input() recipes: Recipe[] = []; 
}