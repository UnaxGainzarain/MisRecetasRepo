import { Routes } from '@angular/router';
import { RecipesPage } from './pages/recipes-page/recipes-page';

export const routes: Routes = [
    // Cuando estemos en la raíz (''), carga RecipesPage
    { 
      path: '', 
      component: RecipesPage 
    },
    // Cualquier otra ruta, redirige a la raíz
    { 
      path: '**', 
      redirectTo: '' 
    }
];