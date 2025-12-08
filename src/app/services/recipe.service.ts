import { Injectable, inject } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Recipe } from '../models/recipe.model';
import { Observable, ReplaySubject } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class RecipeService {
  private http = inject(HttpClient);
  // Asegúrate de que tu mock-api esté corriendo en este puerto
  private apiUrl = 'http://localhost:3000/api/recipes'; 

  // Parte Reactiva (Subject)
  private updateSubject = new ReplaySubject<boolean>(1);
  public update$ = this.updateSubject.asObservable();

  constructor() {
    this.notifyUpdate();
  }

  // 1. GET ALL: Obtener todas las recetas
  getRecipes(): Observable<Recipe[]> {
    return this.http.get<Recipe[]>(this.apiUrl);
  }

  // 2. GET ONE: Obtener una receta por ID (ESTE ES EL QUE TE FALTABA)
  getRecipeById(id: number): Observable<Recipe> {
    return this.http.get<Recipe>(`${this.apiUrl}/${id}`);
  }

  // 3. POST: Crear receta
  addRecipe(recipe: Recipe): Observable<Recipe> {
    return this.http.post<Recipe>(this.apiUrl, recipe);
  }

  // 4. PUT: Valorar receta
  rateRecipe(recipeId: number, rating: number): Observable<Recipe> {
    const url = `${this.apiUrl}/${recipeId}/rate`;
    return this.http.put<Recipe>(url, { rating });
  }

  // Notificación de cambios
  notifyUpdate(): void {
    this.updateSubject.next(true);
  }
}