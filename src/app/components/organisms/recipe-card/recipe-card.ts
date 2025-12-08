import { Component, input } from '@angular/core'; // Usamos 'input' signal
import { RouterLink } from '@angular/router';
import { Recipe } from '../../../models/recipe.model';

@Component({
  selector: 'app-recipe-card',
  standalone: true,
  imports: [RouterLink], // CommonModule ya no es vital si usas la nueva sintaxis @
  templateUrl: './recipe-card.html',
  styleUrl: './recipe-card.scss' // Asegúrate de que este archivo exista, o usa styles: []
})
export class RecipeCard {
  // REGLA DE ORO: Recibir el modelo completo como Signal
  recipe = input.required<Recipe>(); 
}