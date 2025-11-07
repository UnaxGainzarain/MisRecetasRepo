// src/app/app.routes.ts

import { Routes } from '@angular/router';
import { RecipesPage } from './pages/recipes-page/recipes-page'; // Importamos la página
import { RecipeCard } from './components/organisms/recipe-card/recipe-card';
import { RecipeForm } from './components/organisms/recipe-form/recipe-form';
import { RecipeList } from './components/organisms/recipe-list/recipe-list';

export const routes: Routes = [
    // 1. Redirecciona la ruta raíz a la lista de recetas
    { path: '', redirectTo: 'lista-de-recetas', pathMatch: 'full' }, 
    // 2. Muestra RecipesPage al navegar a esta ruta
    { path: 'lista-de-recetas', component: RecipesPage},
    // Rutas existentes
    { path: 'Card-Receta', component: RecipeCard },
    { path: 'formulario-receta', component: RecipeForm },
];