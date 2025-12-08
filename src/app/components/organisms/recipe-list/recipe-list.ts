import { Component, input } from '@angular/core';
import { Recipe } from '../../../models/recipe.model';
import { RecipeCard } from '../recipe-card/recipe-card';

@Component({
  selector: 'app-recipe-list',
  standalone: true,
  imports: [RecipeCard],
  templateUrl: './recipe-list.html',
  styleUrl: './recipe-list.scss'
})
export class RecipeList {
  recipes = input.required<Recipe[]>();
}