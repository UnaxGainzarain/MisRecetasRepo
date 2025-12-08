import { Injectable, inject } from '@angular/core';
import { HttpClient } from '@angular/common/http'; // IMPORTANTE
import { Recipe } from '../models/recipe.model';
import { Observable, ReplaySubject, tap } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class RecipeService {
  private http = inject(HttpClient);
  private apiUrl = 'http://localhost:3000/api/recipes'; // URL de tu Mock API

  // Mantenemos el patrón reactivo de la presentación
  private updateSubject = new ReplaySubject<boolean>(1);
  public update$ = this.updateSubject.asObservable();

  constructor() {
    this.notifyUpdate();
  }

  // 1. GET: Obtener del servidor
  getRecipes(): Observable<Recipe[]> {
    return this.http.get<Recipe[]>(this.apiUrl);
  }

  // 2. POST: Crear en el servidor
  addRecipe(recipe: Recipe): Observable<Recipe> {
    return this.http.post<Recipe>(this.apiUrl, recipe);
  }

  // 3. PUT: Valorar receta (NUEVO REQUISITO)
  rateRecipe(recipeId: number, rating: number): Observable<Recipe> {
    const url = `${this.apiUrl}/${recipeId}/rate`;
    // Enviamos { rating: 5 } al endpoint que creamos antes
    return this.http.put<Recipe>(url, { rating });
  }

  notifyUpdate(): void {
    this.updateSubject.next(true);
  }
}