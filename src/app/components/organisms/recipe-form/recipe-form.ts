import { Component, inject } from '@angular/core';
import { FormBuilder, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { RecipeService } from '../../../services/recipe.service';
import { Recipe } from '../../../models/recipe.model';

@Component({
  selector: 'app-recipe-form',
  standalone: true,
  imports: [ReactiveFormsModule],
  templateUrl: './recipe-form.html',
  styleUrl: './recipe-form.scss'
})
export class RecipeForm {
  private fb = inject(FormBuilder);
  private recipeService = inject(RecipeService);
  private router = inject(Router);

  recipeForm: FormGroup = this.fb.group({
    title: ['', Validators.required],
    description: ['', Validators.required],
    imageUrl: ['https://via.placeholder.com/300', Validators.required],
    ingredients: ['', Validators.required]
  });

  onSubmit() {
    if (this.recipeForm.valid) {
      const formValue = this.recipeForm.value;
      const ingredientsArray = formValue.ingredients.split(',').map((i: string) => i.trim());

      const newRecipe = new Recipe(
        formValue.title,
        formValue.description,
        ingredientsArray,
        formValue.imageUrl
      );

      // CORRECCIÓN TEÓRICA (Diapositiva 64):
      // 1. Llamamos al servicio (Observable)
      this.recipeService.addRecipe(newRecipe).subscribe(() => {
        // 2. ¡AQUÍ notificamos explícitamente tras el éxito!
        this.recipeService.notifyUpdate();
        
        console.log('Receta creada y notificación enviada'); // Debug opcional
        
        // 3. Navegamos
        this.router.navigate(['/lista-de-recetas']);
      });
    }
  }
}