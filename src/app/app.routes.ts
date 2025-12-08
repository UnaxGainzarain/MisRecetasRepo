import { Routes } from '@angular/router';
import { RecipesPage } from './pages/recipes-page/recipes-page'; 
import { RecipeForm } from './components/organisms/recipe-form/recipe-form';
import { RecipeDetailComponent } from './components/organisms/recipe-detail/recipe-detail'; // IMPORTAR

export const routes: Routes = [
    { path: '', redirectTo: 'lista-de-recetas', pathMatch: 'full' }, 
    { path: 'lista-de-recetas', component: RecipesPage},
    
    // Crear receta
    { path: 'formulario-receta', component: RecipeForm },
    
    // Editar receta (reutilizamos form)
    { path: 'formulario-receta/:id', component: RecipeForm }, 
    
    // NUEVA RUTA: Detalle (solo lectura)
    { path: 'recetas/:id', component: RecipeDetailComponent },
];