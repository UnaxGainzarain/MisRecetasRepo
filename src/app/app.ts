// import { Component } from '@angular/core';
// import { RouterOutlet } from '@angular/router';

// @Component({
//   selector: 'app-app',
//   imports: [RouterOutlet],
//   templateUrl: './app.html',
//   styleUrl: './app.scss'
// })
// export class App {

// }
import { Component, signal } from '@angular/core';

import { RouterLink, RouterOutlet, RouterLinkActive } from "@angular/router";

@Component({
  selector: 'app-root',
  imports: [ RouterOutlet, RouterLink, RouterLinkActive],
  templateUrl: './app.html',
  styleUrl: './app.scss'
})
export class App {
}
