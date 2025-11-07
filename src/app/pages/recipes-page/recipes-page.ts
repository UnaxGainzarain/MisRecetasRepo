// Abre tu archivo: src/app/pages/recipes-page/recipes-page.ts

import { Component, OnInit } from '@angular/core'; // <-- 1. QUITA 'signal'
import { Recipe } from '../../models/recipe.model';

@Component({
  selector: 'app-recipes-page',
  templateUrl: './recipes-page.html', // Tu nombre de archivo
  styleUrl: './recipes-page.scss'  // Tu nombre de archivo
})
// 2. El nombre de la CLASE SÍ suele acabar en Component (compruébalo)
export class RecipesPage implements OnInit { 

  // 3. CAMBIO: 'recipes' es un array normal
  recipes: Recipe[] = []; 

  ngOnInit() {
    // 4. CAMBIO: Asignamos los datos con =
    this.recipes = this.getDefaultRecipes(); 
  }

  // Función privada que nos da los datos de inicio
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