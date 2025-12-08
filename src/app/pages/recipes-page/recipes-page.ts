import { Component, signal } from '@angular/core';
import { Recipe } from '../../models/recipe.model';
// 1. IMPORTANTE: Importar el componente hijo
import { RecipeList } from '../../components/organisms/recipe-list/recipe-list';

@Component({
  selector: 'app-recipes-page',
  standalone: true,
  imports: [RecipeList], // 2. Añadirlo a los imports
  templateUrl: './recipes-page.html',
  styleUrl: './recipes-page.scss' // O styles: [] si no tienes scss
})
export class RecipesPage {
  // 3. Los datos Dummy viven ahora aquí (el "Cerebro")
  recipes = signal<Recipe[]>([
    new Recipe('Tortilla', 'Española tradicional', ['Huevos', 'Patatas'], 'https://upload.wikimedia.org/wikipedia/commons/thumb/1/14/Tortilla_de_Patatas.jpg/800px-Tortilla_de_Patatas.jpg'),
    new Recipe('Pasta', 'Con tomate', ['Pasta', 'Tomate'], 'https://upload.wikimedia.org/wikipedia/commons/thumb/2/23/Pasta_con_pomodoro_fresco_e_basilico.jpg/800px-Pasta_con_pomodoro_fresco_e_basilico.jpg')
  ]);
}