// src/app/pages/recipes-page/recipes-page.ts

import { Component, OnInit } from '@angular/core';
import { Recipe } from '../../models/recipe.model'; 
import { RecipeList } from '../../components/organisms/recipe-list/recipe-list'; 
// El formulario se carga por el router, no es necesario importarlo directamente aquí

@Component({
  selector: 'app-recipes-page',
  standalone: true, 
  imports: [RecipeList], 
  templateUrl: './recipes-page.html',
  styleUrl: './recipes-page.scss'
})
export class RecipesPage implements OnInit { 

  recipes: Recipe[] = []; 

  ngOnInit() {
    this.recipes = this.getDefaultRecipes(); 
    this.checkSessionForRecipeAction(); // <-- ¡NUEVO! Comprueba si hay una acción pendiente
  }

  // Métodos que manipulan el array de recetas (hechos públicos para ser llamados internamente)
  public onRecipeAdded(newRecipe: Recipe): void {
    this.recipes = [newRecipe, ...this.recipes];
  }

  public onRecipeUpdated(updatedRecipe: Recipe): void { 
    const index = this.recipes.findIndex(r => r.id === updatedRecipe.id);

    if (index !== -1) {
      const newRecipes = [...this.recipes];
      newRecipes[index] = updatedRecipe;
      this.recipes = newRecipes;
    }
  }

  public onRecipeDeleted(id: number): void { 
    this.recipes = this.recipes.filter(r => r.id !== id);
  }

  // Método HACK para recoger la receta del sessionStorage y realizar la acción
  private checkSessionForRecipeAction(): void { 
    const actionJson = sessionStorage.getItem('recipeAction');
    
    if (actionJson) {
      sessionStorage.removeItem('recipeAction'); // ¡LIMPIAR LA ACCIÓN INMEDIATAMENTE!
      
      try {
        const action = JSON.parse(actionJson);
        
        if (action.type === 'ADD' && action.recipe) {
          // Reconstruye la instancia de Recipe y añade el ID generado
          const newRecipe = new Recipe(action.recipe.title, action.recipe.description, action.recipe.ingredients, action.recipe.imageUrl);
          Object.assign(newRecipe, { id: action.recipe.id });
          this.onRecipeAdded(newRecipe);
          
        } else if (action.type === 'UPDATE' && action.recipe) {
          // Reconstruye la instancia de Recipe y realiza la actualización
          const updatedRecipe = new Recipe(action.recipe.title, action.recipe.description, action.recipe.ingredients, action.recipe.imageUrl);
          Object.assign(updatedRecipe, { id: action.recipe.id });
          this.onRecipeUpdated(updatedRecipe);
          
        } else if (action.type === 'DELETE' && action.id) {
          this.onRecipeDeleted(action.id);
        }

      } catch (e) {
        console.error('Error al procesar la acción de receta desde sessionStorage', e);
      }
    }
  }

  private getDefaultRecipes(): Recipe[] {
    return [
      new Recipe( 
        'Tortilla de Patatas',
        'La clásica tortilla de patatas española, jugosa por dentro.',
        ['Huevos', 'Patatas', 'Cebolla (opcional)', 'Aceite de Oliva', 'Sal'],
        'data:image/jpeg;base64,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' 
      ),
      new Recipe(
        'Croquetas de Jamón',
        'Croquetas cremosas de jamón serrano, perfectas como tapa.',
        ['Jamón Serrano', 'Harina', 'Leche', 'Mantequilla', 'Nuez Moscada', 'Pan Rallado', 'Huevo'],
        'https://imag.bonviveur.com/croquetas-de-jamon-caseras.jpg' 
      ),
      new Recipe(
        'Gazpacho Andaluz',
        'Sopa fría refrescante, ideal para el verano.',
        ['Tomates', 'Pimiento', 'Pepino', 'Ajo', 'Aceite de Oliva', 'Vinagre', 'Sal'],
        'https://www.cnature.es/wp-content/uploads/2020/08/gazpacho-gallego-.jpg'
      )
    ];
  }
}