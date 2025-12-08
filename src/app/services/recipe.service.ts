import { Injectable } from '@angular/core';
import { Recipe } from '../models/recipe.model';
import { Observable, ReplaySubject, of } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class RecipeService {
  // 1. "Base de datos" en memoria (Privada)
  private recipes: Recipe[] = [
    new Recipe('Tortilla', 'Española tradicional', ['Huevos', 'Patatas'], 'https://upload.wikimedia.org/wikipedia/commons/thumb/1/14/Tortilla_de_Patatas.jpg/800px-Tortilla_de_Patatas.jpg'),
    new Recipe('Pasta', 'Con tomate', ['Pasta', 'Tomate'], 'https://upload.wikimedia.org/wikipedia/commons/thumb/2/23/Pasta_con_pomodoro_fresco_e_basilico.jpg/800px-Pasta_con_pomodoro_fresco_e_basilico.jpg')
  ];

  // 2. PATRÓN REACTIVO: ReplaySubject para notificar cambios
  // Buffer 1: Guarda el último mensaje emitido para quien llegue tarde
  private updateSubject = new ReplaySubject<boolean>(1);
  
  // 3. Exponemos el observable públicamente
  public update$ = this.updateSubject.asObservable();

  constructor() {
    // Inicializamos el stream (notificamos que "ya hay datos" al arrancar)
    this.notifyUpdate();
  }

  // Método para pedir los datos (simula una llamada HTTP)
  getRecipes(): Observable<Recipe[]> {
    return of(this.recipes); // 'of' convierte el array en Observable
  }

  // Método para crear (simula un POST)
  addRecipe(recipe: Recipe): void {
    this.recipes.push(recipe);
    // ¡MAGIA REACTIVA! Avisamos a todos los suscriptores
    this.notifyUpdate();
  }

  // Método auxiliar para emitir el evento
  notifyUpdate(): void {
    this.updateSubject.next(true);
  }
}