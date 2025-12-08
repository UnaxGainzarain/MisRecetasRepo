import { Component, OnInit, OnDestroy, signal, inject } from '@angular/core';
import { Subscription } from 'rxjs'; // Necesario para gestionar la memoria
import { Recipe } from '../../models/recipe.model';
import { RecipeList } from '../../components/organisms/recipe-list/recipe-list';
import { RecipeService } from '../../services/recipe.service';

@Component({
  selector: 'app-recipes-page',
  standalone: true,
  imports: [RecipeList],
  templateUrl: './recipes-page.html',
  styleUrl: './recipes-page.scss'
})
export class RecipesPage implements OnInit, OnDestroy {
  // Inyección de dependencias moderna (Angular 14+)
  private recipeService = inject(RecipeService);
  
  // Variable para guardar la suscripción y poder cancelarla
  private sub?: Subscription;

  // Signal que alimentará a la vista
  recipes = signal<Recipe[]>([]);

  ngOnInit(): void {
    // PATRÓN OBSERVER: Nos suscribimos a las actualizaciones
    this.sub = this.recipeService.update$.subscribe(() => {
      // Cuando alguien grite "¡Cambio!", recargamos la lista
      this.loadRecipes();
    });
  }

  loadRecipes() {
    this.recipeService.getRecipes().subscribe(data => {
      this.recipes.set(data); // Actualizamos el Signal
    });
  }

  ngOnDestroy(): void {
    this.sub?.unsubscribe();
  }
}