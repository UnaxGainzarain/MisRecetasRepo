// src/app/components/organisms/recipe-form/recipe-form.ts

import { Component, OnInit, Output, EventEmitter, Input } from '@angular/core'; 
import { ReactiveFormsModule, FormBuilder, Validators, FormGroup } from '@angular/forms';
import { Recipe as RecipeModel } from '../../../models/recipe.model';
import { Router, ActivatedRoute } from '@angular/router'; 
import { CommonModule } from '@angular/common';


@Component({
  selector: 'app-recipe-form',
  standalone: true,
  imports: [
    CommonModule, 
    ReactiveFormsModule
  ],
  templateUrl: './recipe-form.html',
  styleUrl: './recipe-form.scss'
})
export class RecipeForm implements OnInit { 

  @Output() recipeAdded = new EventEmitter<RecipeModel>(); 
  @Output() recipeUpdated = new EventEmitter<RecipeModel>(); 
  @Output() recipeDeleted = new EventEmitter<number>(); 
  
  recipeForm: FormGroup;
  isEditing = false;
  currentRecipeId?: number;
  
  @Input() recipeToEdit?: RecipeModel; 

  constructor(
    private fb: FormBuilder,
    public router: Router, 
    private route: ActivatedRoute
  ) {
    this.recipeForm = this.fb.group({
      title: ['', Validators.required],
      description: ['', Validators.required],
      ingredients: ['', Validators.required], 
      imageUrl: ['']
    });
  }

  ngOnInit(): void {
      // Dejamos la implementación de edición simple aquí (no funciona sin servicio)
  }
  
  // Modificación de onSubmit para usar sessionStorage
  onSubmit(): void {
    if (this.recipeForm.valid) {
      const formValue = this.recipeForm.value;

      const ingredientsArray = formValue.ingredients
        .split(',')
        .map((item: string) => item.trim())
        .filter((item: string) => item.length > 0);

      const resultRecipe = new RecipeModel(
        formValue.title,
        formValue.description,
        ingredientsArray,
        formValue.imageUrl || 'https://via.placeholder.com/300x200?text=Nueva+Receta'
      );
      
      // La emisión del evento Output se pierde, por lo que almacenamos los datos temporalmente.
      
      if (this.isEditing && this.currentRecipeId) {
        Object.assign(resultRecipe, { id: this.currentRecipeId });
        // HACK: Almacena la acción de UPDATE en sessionStorage
        sessionStorage.setItem('recipeAction', JSON.stringify({ type: 'UPDATE', recipe: resultRecipe }));
        alert('Receta Editada y guardada temporalmente.');
      } else {
        // HACK: Almacena la acción de ADD en sessionStorage
        sessionStorage.setItem('recipeAction', JSON.stringify({ type: 'ADD', recipe: resultRecipe }));
        alert('Receta Añadida.');
      }
      
      this.recipeForm.reset();
      this.router.navigate(['/lista-de-recetas']);
    } else {
      console.error('El formulario no es válido.');
      this.recipeForm.markAllAsTouched();
    }
  }

  // ... (resto del código del setter y onDelete)
  
  private loadRecipeData(): void {
    if (this.recipeToEdit) {
      this.isEditing = true;
      this.currentRecipeId = this.recipeToEdit.id;
      this.recipeForm.patchValue({
        title: this.recipeToEdit.title,
        description: this.recipeToEdit.description,
        ingredients: this.recipeToEdit.ingredients.join(', '), // Convierte a string
        imageUrl: this.recipeToEdit.imageUrl
      });
      console.log('Modo Edición activado para ID:', this.currentRecipeId);
    } else {
      this.isEditing = false;
    }
  }

  @Input() set recipe(value: RecipeModel | undefined) {
    this.recipeToEdit = value;
    this.loadRecipeData();
  }
  
  onDelete(): void {
    if (this.currentRecipeId && confirm('¿Estás seguro de que quieres eliminar esta receta?')) {
      sessionStorage.setItem('recipeAction', JSON.stringify({ type: 'DELETE', id: this.currentRecipeId }));
      this.router.navigate(['/lista-de-recetas']);
    }
  }
}