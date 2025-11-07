// src/app/models/recipe.model.ts

export class Recipe {
  public readonly id: number; 

  constructor(
    public title: string,
    public description: string,
    public ingredients: string[], 
    public imageUrl: string
  ) {
    this.id = Date.now() + Math.floor(Math.random() * 1000); 
  }
}