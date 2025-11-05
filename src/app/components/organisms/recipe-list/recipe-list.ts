import { Component, input, output } from '@angular/core';
import { RecipeCard } from '../recipe-card/recipe-card';
import { Recipe } from '../../../models/recipe.model';

@Component({
  selector: 'app-organism-recipe-list',
  standalone: true,
  imports: [RecipeCard],
  templateUrl: './recipe-list.html',
  styleUrl: './recipe-list.scss'
})
export class RecipeList {
  // INPUT: Recibe las recetas de la página padre
  recipes = input.required<Recipe[]>();
  
  // OUTPUT: Emite el ID de la receta a eliminar hacia la página padre
  deleteRecipe = output<number>();

  handleDelete(id: number) {
    // El componente 'recipe-card' emite el evento 'deleteRequest'.
    // Este método lo captura y lo re-emite hacia arriba (hacia la página).
    // La lógica de confirmación la moveremos a la página.
    this.deleteRecipe.emit(id);
  }
}