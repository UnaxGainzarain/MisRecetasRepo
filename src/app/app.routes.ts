import { Routes } from '@angular/router';
import { RecipeCard } from '../../src/app/components/organisms/recipe-card/recipe-card';
import { RecipeForm } from '../../src/app/components/organisms/recipe-form/recipe-form';
import { RecipeList } from '../../src/app/components/organisms/recipe-list/recipe-list';

export const routes: Routes = [
    { path: 'Card-Receta', component: RecipeCard },
    { path: 'formulario-receta', component: RecipeForm },
    { path: 'lista-de-recetas', component: RecipeList}

];
