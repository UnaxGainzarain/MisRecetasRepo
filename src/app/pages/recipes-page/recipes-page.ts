// src/app/pages/recipes-page/recipes-page.ts

import { Component, OnInit } from '@angular/core';
import { Recipe } from '../../models/recipe.model'; 
import { RecipeList } from '../../components/organisms/recipe-list/recipe-list'; 
// El formulario se carga por el router, no es necesario importarlo directamente aquí
// import { RecipeForm } from '../../components/organisms/recipe-form/recipe-form'; 

@Component({
  selector: 'app-recipes-page',
  standalone: true, 
  imports: [RecipeList], // <-- Quita RecipeForm si lo tenías
  templateUrl: './recipes-page.html',
  styleUrl: './recipes-page.scss'
})
export class RecipesPage implements OnInit { 

  recipes: Recipe[] = []; 

  ngOnInit() {
    this.recipes = this.getDefaultRecipes(); 
  }

  onRecipeAdded(newRecipe: Recipe): void {
    // Añade la nueva receta al principio de la lista
    this.recipes = [newRecipe, ...this.recipes];
  }

  onRecipeUpdated(updatedRecipe: Recipe): void { 
    const index = this.recipes.findIndex(r => r.id === updatedRecipe.id);

    if (index !== -1) {
      // Crea una copia inmutable del array y reemplaza la receta antigua
      const newRecipes = [...this.recipes];
      newRecipes[index] = updatedRecipe;
      this.recipes = newRecipes;
    }
  }

  // Lógica para ELIMINAR (simulada)
  onRecipeDeleted(id: number): void { // <-- NUEVO MÉTODO
    this.recipes = this.recipes.filter(r => r.id !== id);
  }

  private getDefaultRecipes(): Recipe[] {
    return [
      new Recipe( 
        'Tortilla de Patatas',
        'La clásica tortilla de patatas española, jugosa por dentro.',
        ['Huevos', 'Patatas', 'Cebolla (opcional)', 'Aceite de Oliva', 'Sal'],
        'https://imag.bonviveur.com/recetas/tortilla-de-patatas-con-cebolla.jpg' 
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
        'https://imag.bonviveur.com/gazpacho-andaluz.jpg'
      )
    ];
  }
}