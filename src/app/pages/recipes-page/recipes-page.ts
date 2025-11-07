// src/app/pages/recipes-page/recipes-page.ts

import { Component, OnInit } from '@angular/core';
import { Recipe } from '../../models/recipe.model'; // Importamos la CLASE Recipe
import { RecipeList } from '../../components/organisms/recipe-list/recipe-list'; // Importamos RecipeList

@Component({
  selector: 'app-recipes-page',
  standalone: true, // ¡Añadir standalone!
  imports: [RecipeList], // Importamos RecipeList para usarlo en el HTML
  templateUrl: './recipes-page.html',
  styleUrl: './recipes-page.scss'
})
// La lógica interna es correcta para usar la CLASE Recipe
export class RecipesPage implements OnInit { 

  recipes: Recipe[] = []; 

  ngOnInit() {
    this.recipes = this.getDefaultRecipes(); 
  }

  private getDefaultRecipes(): Recipe[] {
    return [
      new Recipe(
        'Tortilla de Patatas',
        'La clásica tortilla de patatas española, jugosa por dentro.',
        ['Huevos', 'Patatas', 'Cebolla (opcional)', 'Aceite de Oliva', 'Sal'],
        'https://i.blogs.es/e1d0c1/tortilla-de-patatas-con-cebolla/1366_2000.jpg'
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
        'https://www.recetasderechupete.com/wp-content/uploads/2012/06/gazpacho-andaluz.jpg'
      )
    ];
  }
}