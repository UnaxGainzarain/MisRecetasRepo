export class RecipeModel {
  title: string;
  description: string;
  ingredients: string[];
  imageUrl: string;

  constructor(title: string, description: string, ingredients: string[], imageUrl: string) {
    this.title = title;
    this.description = description;
    this.ingredients = ingredients;
    this.imageUrl = imageUrl;
  }
}