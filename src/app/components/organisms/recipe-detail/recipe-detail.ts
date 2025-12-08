import { Component, OnInit, inject, signal, computed } from '@angular/core';
import { ActivatedRoute, RouterLink } from '@angular/router';
import { DecimalPipe } from '@angular/common'; // Para el pipe number
import { RecipeService } from '../../../services/recipe.service';
import { Recipe } from '../../../models/recipe.model';

@Component({
  selector: 'app-recipe-detail',
  standalone: true,
  imports: [RouterLink, DecimalPipe],
  templateUrl: './recipe-detail.html',
  styleUrl: './recipe-detail.scss'
})
export class RecipeDetailComponent implements OnInit {
  private route = inject(ActivatedRoute);
  private recipeService = inject(RecipeService);

  // Signal para guardar la receta cargada
  recipe = signal<Recipe | null>(null);

  // Computada para la media (igual que en la card)
  averageRating = computed(() => {
    const r = this.recipe();
    if (!r || !r.ratings || r.ratings.length === 0) return 0;
    return r.ratings.reduce((a, b) => a + b, 0) / r.ratings.length;
  });

  ngOnInit(): void {
    // Leemos el ID de la URL
    const id = this.route.snapshot.paramMap.get('id');
    
    if (id) {
      this.recipeService.getRecipeById(Number(id)).subscribe(data => {
        // Importante: Convertir JSON a instancia de Recipe para asegurar consistencia
        const recipeInstance = new Recipe(data.title, data.description, data.ingredients, data.imageUrl, data.ratings);
        // Restauramos el ID real
        (recipeInstance as any).id = data.id; 
        
        this.recipe.set(recipeInstance);
      });
    }
  }
}