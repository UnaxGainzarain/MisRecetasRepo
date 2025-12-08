export class Recipe {
  public readonly id: number; 

  constructor(
    public title: string,
    public description: string,
    public ingredients: string[], 
    public imageUrl: string,
    public ratings: number[] = [] // NUEVO: Array de notas (ej: [5, 4, 5])
  ) {
    this.id = Date.now() + Math.floor(Math.random() * 1000); 
  }

  // Método helper para calcular la media (Opcional pero útil en la vista)
  get averageRating(): number {
    if (!this.ratings || this.ratings.length === 0) return 0;
    const sum = this.ratings.reduce((a, b) => a + b, 0);
    return sum / this.ratings.length;
  }
}