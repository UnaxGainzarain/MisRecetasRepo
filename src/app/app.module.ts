import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { RouterModule } from '@angular/router'; 
import { CommonModule } from '@angular/common'; // <-- ¡MUY IMPORTANTE!

import { routes } from './app.routes'; 
import { AppComponent } from './app.component';

// Importamos las CLASES desde tus archivos .ts
import { RecipesPage } from './pages/recipes-page/recipes-page';
import { RecipeList } from './components/organisms/recipe-list/recipe-list';
import { RecipeCardComponent } from './components/organisms/recipe-card/recipe-card';


@NgModule({
  declarations: [
    AppComponent,
    RecipesPageComponent, // <-- Declaramos la CLASE
    RecipeListComponent,  // <-- Declaramos la CLASE
    RecipeCardComponent   // <-- Declaramos la CLASE
  ],
  imports: [
    BrowserModule,
    CommonModule, // <-- ¡Importado!
    RouterModule.forRoot(routes) 
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }