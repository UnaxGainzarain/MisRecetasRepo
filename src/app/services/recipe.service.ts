import { Injectable } from '@angular/core';
import { Recipe } from '../models/recipe.model';
import { Observable, ReplaySubject, of } from 'rxjs'; // Importamos 'of'

@Injectable({
  providedIn: 'root'
})
export class RecipeService {
  private recipes: Recipe[] = [
    new Recipe('Tortilla', 'Española tradicional', ['Huevos', 'Patatas'], 'https://upload.wikimedia.org/wikipedia/commons/thumb/1/14/Tortilla_de_Patatas.jpg/800px-Tortilla_de_Patatas.jpg'),
    new Recipe('Pasta', 'Con tomate', ['Pasta', 'Tomate'], 'https://upload.wikimedia.org/wikipedia/commons/thumb/2/23/Pasta_con_pomodoro_fresco_e_basilico.jpg/800px-Pasta_con_pomodoro_fresco_e_basilico.jpg')
  ];

  private updateSubject = new ReplaySubject<boolean>(1);
  public update$ = this.updateSubject.asObservable();

  constructor() {
    this.notifyUpdate();
  }

  getRecipes(): Observable<Recipe[]> {
    return of(this.recipes);
  }

  // CAMBIO TEÓRICO: Devuelve Observable y NO notifica solo
  addRecipe(recipe: Recipe): Observable<void> {
    this.recipes.push(recipe);
    // Retornamos un Observable vacío para simular que la API respondió "OK"
    return of(undefined); 
  }

  notifyUpdate(): void {
    this.updateSubject.next(true);
  }
}