import { Component } from '@angular/core';
import { RouterLink, RouterLinkActive } from '@angular/router'; // IMPORTANTE

@Component({
  selector: 'app-navbar',
  standalone: true,
  imports: [RouterLink, RouterLinkActive], // Importamos las directivas de routing
  templateUrl: './navbar.html',
  styleUrl: './navbar.scss'
})
export class NavbarComponent {
  // Si tu menú tenía lógica (ej. variables para abrir/cerrar en móvil), muévela aquí.
}