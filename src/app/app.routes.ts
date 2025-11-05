import { Routes } from '@angular/router';
import { RecipesPageComponent } from './pages/recipes-page/recipes-page.component';

export const routes: Routes = [
    // Cuando la ruta esté vacía (''), carga RecipesPageComponent
    { 
      path: '', 
      component: RecipesPageComponent 
    },
    // Cualquier otra ruta, redirige a la raíz
    { 
      path: '**', 
      redirectTo: '' 
    }
];