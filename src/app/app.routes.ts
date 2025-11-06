// En: src/app/app.routes.ts
import { Routes } from '@angular/router';
// 1. Arregla la importación (sin 'Component')
import { RecipesPage } from './pages/recipes-page/recipes-page'; 

export const routes: Routes = [
    { 
      path: '', 
      // 2. Arregla el nombre aquí (sin 'Component')
      component: RecipesPage 
    },
    { 
      path: '**', 
      redirectTo: '' 
    }
];