import { Component, OnInit, OnDestroy, signal, inject, computed } from '@angular/core';
import { Subscription } from 'rxjs';
import { Recipe } from '../../models/recipe.model';
import { RecipeList } from '../../components/organisms/recipe-list/recipe-list';
import { RecipeService } from '../../services/recipe.service';
import { FormsModule } from '@angular/forms'; // Necesario para ngModel

@Component({
  selector: 'app-recipes-page',
  standalone: true,
  imports: [RecipeList, FormsModule], // Importar FormsModule
  templateUrl: './recipes-page.html',
  styleUrl: './recipes-page.scss'
})
export class RecipesPage implements OnInit, OnDestroy {
  private recipeService = inject(RecipeService);
  private sub?: Subscription;

  // ESTADO
  recipes = signal<Recipe[]>([]);      // Todas las recetas (Raw Data)
  minRatingFilter = signal<number>(0); // Estado del filtro (0 a 5)

  // SIGNAL COMPUTADA: Filtra automáticamente cuando 'recipes' O 'minRatingFilter' cambian
  filteredRecipes = computed(() => {
    const min = this.minRatingFilter();
    return this.recipes().filter(r => r.averageRating >= min);
  });

  ngOnInit(): void {
    // Escuchar cambios (como pide la teoría)
    this.sub = this.recipeService.update$.subscribe(() => {
      this.loadRecipes();
    });
    // Carga inicial
    this.loadRecipes();
  }

  loadRecipes() {
    this.recipeService.getRecipes().subscribe(data => {
      // Mapeamos los datos para asegurar que tengan los métodos del modelo
      // (Porque HTTP devuelve JSON puro, no instancias de clase con métodos getter)
      const instanceData = data.map(d => new Recipe(d.title, d.description, d.ingredients, d.imageUrl, d.ratings));
      // Restauramos el ID original que viene del JSON
      instanceData.forEach((r, i) => (r as any).id = data[i].id); 
      
      this.recipes.set(instanceData);
    });
  }

  // Manejar el voto
  handleRate(event: {id: number, rating: number}) {
    this.recipeService.rateRecipe(event.id, event.rating).subscribe(() => {
      this.recipeService.notifyUpdate(); // Avisamos para recargar la lista con la nueva media
    });
  }

  ngOnDestroy(): void {
    this.sub?.unsubscribe();
  }
}