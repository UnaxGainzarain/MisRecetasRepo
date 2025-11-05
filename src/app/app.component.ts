import { Component, OnInit, signal } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RecipeModel } from '..';
import { RecipeList } from '../../components/organisms/recipe-list/recipe-list';

@Component({
  selector: 'app-recipes-page',
  standalone: true,
  // Importamos RecipeList para poder usar <app-recipe-list> en el HTML
  imports: [CommonModule, RecipeList], 
  templateUrl: './recipes-page.html',
  styleUrl: './recipes-page.scss'
})
export class RecipesPage implements OnInit {

  // ¡El estado (la lista de recetas) vive aquí!
  recipes = signal<RecipeModel[]>([]);

  // ngOnInit se ejecuta cuando el componente se inicia
  ngOnInit() {
    this.recipes.set(this.getDefaultRecipes());
  }

  // Función privada que nos da los datos de inicio
  private getDefaultRecipes(): RecipeModel[] {
    return [
      new RecipeModel(
        'Tortilla de Patatas',
        'La clásica tortilla de patatas española, jugosa por dentro.',
        ['Huevos', 'Patatas', 'Cebolla (opcional)', 'Aceite de Oliva', 'Sal'],
        'https://i.blogs.es/e1d0c1/tortilla-de-patatas-con-cebolla/1366_2000.jpg'
      ),
      new RecipeModel(
        'Croquetas de Jamón',
        'Croquetas cremosas de jamón serrano, perfectas como tapa.',
        ['Jamón Serrano', 'Harina', 'Leche', 'Mantequilla', 'Nuez Moscada', 'Pan Rallado', 'Huevo'],
        'https://imag.bonviveur.com/croquetas-de-jamon-caseras.jpg'
      ),
       new RecipeModel(
        'Gazpacho Andaluz',
        'Sopa fría refrescante, ideal para el verano.',
        ['Tomates', 'Pimiento', 'Pepino', 'Ajo', 'Aceite de Oliva', 'Vinagre', 'Sal'],
        'https://www.recetasderechupete.com/wp-content/uploads/2012/06/gazpacho-andaluz.jpg'
      )
    ];
  }
}