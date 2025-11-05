import { Component, output } from '@angular/core';
import { FormControl, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { Button } from '../../atoms/button/button';
import { Recipe } from '../../../models/recipe.model'; // Importar el modelo

@Component({
  selector: 'app-organism-recipe-form',
  standalone: true,
  imports: [ReactiveFormsModule, Button],
  templateUrl: './recipe-form.html',
  styleUrl: './recipe-form.scss'
})
export class RecipeForm {

  // OUTPUT: Emite los datos de la nueva receta al padre (la página)
  addRecipe = output<Omit<Recipe, 'id'>>();

  recipeForm = new FormGroup({
    title: new FormControl('', [Validators.required, Validators.minLength(3)]),
    description: new FormControl('', Validators.required),
    imageUrl: new FormControl('', Validators.required),
    ingredients: new FormControl('', Validators.required) 
  });

  // Getters para validación (igual que antes)
  get title() { return this.recipeForm.get('title'); }
  get description() { return this.recipeForm.get('description'); }
  get imageUrl() { return this.recipeForm.get('imageUrl'); }
  get ingredients() { return this.recipeForm.get('ingredients'); }

  onSubmit() {
    if (this.recipeForm.valid) {
      const formValue = this.recipeForm.value;
      
      const ingredientsArray = formValue.ingredients!
        .split(',')
        .map(ing => ing.trim())
        .filter(ing => ing.length > 0);

      // Emitir el evento en lugar de llamar al servicio
      this.addRecipe.emit({
        title: formValue.title!,
        description: formValue.description!,
        imageUrl: formValue.imageUrl!,
        ingredients: ingredientsArray
      });
      
      this.recipeForm.reset();
    } else {
      this.recipeForm.markAllAsTouched();
    }
  }
}