import { Component, Input } from '@angular/core';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-recipe-card',
  imports: [CommonModule],
  templateUrl: './recipe-card.html',
  styleUrl: './recipe-card.scss'
})
export class RecipeCard {
  @Input() title: string = 'Título de la Receta';
  @Input() description: string = 'Una deliciosa receta que te encantará.';
  @Input() imageUrl: string = 'https://via.placeholder.com/300x200';
}
