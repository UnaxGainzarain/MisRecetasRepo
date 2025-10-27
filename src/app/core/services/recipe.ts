import { Injectable } from '@angular/core';
import { Observable, ReplaySubject } from 'rxjs';
import {Recipe} from '../models/recipe.model';


@Injectable({
  providedIn: 'root'
})
export class RecipeService {
  updateSubject: ReplaySubject<any> = new ReplaySubject();
  changesOnRecipes: Observable<any> = this.updateSubject.asObservable();
  private recipes: Recipe[] = [];//recetas por defecto
  addRecipe(recipe: Recipe) { this.recipes.push(recipe); }
  deleteRecipe(id: number) { this.recipes = this.recipes.filter(r => r.id !== id); }
  notifyUpdate() {
    this.updateSubject.next(null);
  }
}
