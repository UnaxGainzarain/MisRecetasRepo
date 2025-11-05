import { Component, EventEmitter, Output, inject } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormBuilder, ReactiveFormsModule, Validators } from '@angular/forms';
import { ButtonComponent } from '../../atoms/button/button.component';
import { Recipe } from '../';

@Component({
  selector: 'app-recipe-form',
  standalone: true,
  imports: [CommonModule, ReactiveFormsModule, ButtonComponent],
  templateUrl: './recipe-form.component.html',
  styleUrls: ['./recipe-form.component.scss']
})
export class RecipeFormComponent {
  @Output() onRecipeAdd = new EventEmitter<Omit<Recipe, 'id'>>();
  private fb = inject(FormBuilder);

  recipeForm = this.fb.group({
    title: ['', Validators.required],
    ingredients: ['', Validators.required],
    instructions: ['', Validators.required],
    imageUrl: ['', Validators.required]
  });

  onSubmit() {
    if (this.recipeForm.valid && this.recipeForm.value) {
      const { title, ingredients, instructions, imageUrl } = this.recipeForm.value;
      const cleanIngredients = ingredients!.split(',').map(i => i.trim()).filter(i => i);
      const cleanInstructions = instructions!.split('.').map(i => i.trim()).filter(i => i);

      this.onRecipeAdd.emit({ 
        title: title!, 
        ingredients: cleanIngredients, 
        instructions: cleanInstructions, 
        imageUrl: imageUrl! });
      this.recipeForm.reset();
    }
  }
}