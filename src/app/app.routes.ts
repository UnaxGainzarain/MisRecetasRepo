// src/app/app.routes.ts

import { Routes } from '@angular/router';
import { RecipesPage } from './pages/recipes-page/recipes-page'; 
import { RecipeCard } from './components/organisms/recipe-card/recipe-card';
import { RecipeForm } from './components/organisms/recipe-form/recipe-form';
import { RecipeList } from './components/organisms/recipe-list/recipe-list';

export const routes: Routes = [
    { path: '', redirectTo: 'lista-de-recetas', pathMatch: 'full' }, 
    { path: 'lista-de-recetas', component: RecipesPage},
    { path: 'Card-Receta', component: RecipeCard },
    
    { path: 'formulario-receta', component: RecipeForm },

    { path: 'formulario-receta/:id', component: RecipeForm }, // <-- ¡NUEVO!
];