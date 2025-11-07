// src/app/components/organisms/recipe-form/recipe-form.ts

import { Component, OnInit, Output, EventEmitter } from '@angular/core'; // <-- Añadir OnInit
import { ReactiveFormsModule, FormBuilder, Validators, FormGroup } from '@angular/forms';
import { Recipe as RecipeModel } from '../../../models/recipe.model';
import { Router, ActivatedRoute } from '@angular/router'; // <-- Añadir ActivatedRoute
import { Input } from '@angular/core'; // <-- Añadir Input
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
export class RecipeForm implements OnInit { // <-- Implementar OnInit

  // Se reutiliza para añadir y se usa para emitir al router.navigate
  @Output() recipeAdded = new EventEmitter<RecipeModel>(); 
  // 1. Output para la edición
  @Output() recipeUpdated = new EventEmitter<RecipeModel>(); 
  // 2. Output para la eliminación
  @Output() recipeDeleted = new EventEmitter<number>(); 
  
  recipeForm: FormGroup;
  isEditing = false;
  currentRecipeId?: number;
  
  // 3. Simulación de carga de datos (debería venir del padre por @Input() si fuera anidado)
  // Pero como es por ruta, simularemos que el padre ya lo ha cargado en una propiedad.
  @Input() recipeToEdit?: RecipeModel; 

  constructor(
    private fb: FormBuilder,
    public router: Router,
    private route: ActivatedRoute // <-- Inyectar ActivatedRoute
  ) {
    this.recipeForm = this.fb.group({
      title: ['', Validators.required],
      description: ['', Validators.required],
      ingredients: ['', Validators.required], 
      imageUrl: ['']
    });
  }

  ngOnInit(): void {
      // Si recibimos una receta por @Input(), lo precargamos para simular la edición.
      // Ya que este componente es cargado por el Router, lo haremos en el componente que lo carga.
      // Por ahora, asumiremos que solo funciona el modo Añadir, ya que la comunicación Input/Output
      // no funciona a través del router-outlet sin un patrón más complejo.
      // Para simular la edición por Input/Output, el componente RecipeForm debería ser renderizado dentro de RecipePage.
  }
  
  // Como el router no soporta @Input/@Output, debemos simular su llamada desde el padre.
  // Pero para que el padre pueda escuchar los outputs, el formulario debe estar anidado.
  // Para cumplir con el requisito de @Input y @Output, vamos a hacer un cambio drástico:
  // ELIMINAREMOS la ruta 'formulario-receta' del app.routes.ts
  // y anidaremos RecipeForm dentro de RecipeList.
  // Vamos a ignorar la navegación por ruta para poder usar @Input/@Output.
  
  
  // 4. Modificar onSubmit para manejar Edición/Adición
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
      
      // Si estamos editando, usamos el ID de la receta actual
      if (this.isEditing && this.currentRecipeId) {
        // Clonamos la receta y le asignamos el ID original
        Object.assign(resultRecipe, { id: this.currentRecipeId });
        this.recipeUpdated.emit(resultRecipe); // Emitimos la actualización
        alert('Receta Editada y guardada temporalmente.');
      } else {
        this.recipeAdded.emit(resultRecipe); // Emitimos la adición
        alert('Receta Añadida.');
      }
      
      // Limpiar formulario y navegar (o simplemente limpiar)
      this.recipeForm.reset();
      this.router.navigate(['/lista-de-recetas']);
    } else {
      console.error('El formulario no es válido.');
      this.recipeForm.markAllAsTouched();
    }
  }

  // 5. Método para precargar datos de edición (llamado por el setter del @Input())
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

  // Setter para el @Input() que activa la carga de datos
  @Input() set recipe(value: RecipeModel | undefined) {
    this.recipeToEdit = value;
    this.loadRecipeData();
  }
  
  // 6. Método para manejar la eliminación
  onDelete(): void {
    if (this.currentRecipeId && confirm('¿Estás seguro de que quieres eliminar esta receta?')) {
      this.recipeDeleted.emit(this.currentRecipeId);
      this.router.navigate(['/lista-de-recetas']);
    }
  }
}