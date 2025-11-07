import { Component } from '@angular/core';

@Component({
  selector: 'app-root', // La etiqueta en index.html es <app-root>
  templateUrl: './app.component.html', // Usa su propio HTML
  styleUrl: './app.component.scss' // Usa su propio SCSS
})
export class AppComponent {
  title = 'MisRecetas';
}