import { Component, signal } from '@angular/core';

import { RouterLink, RouterOutlet, RouterLinkActive } from "@angular/router";
import { NavbarComponent } from './components/organisms/navbar/navbar'; // Importar
@Component({
  selector: 'app-root',
  imports: [ RouterOutlet, RouterLink, RouterLinkActive, NavbarComponent],
  templateUrl: './app.html',
  styleUrl: './app.scss'
})
export class App {
}
