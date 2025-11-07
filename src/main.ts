// src/main.ts
import { bootstrapApplication } from '@angular/platform-browser';
import { App } from './app/app'; // Importa el componente raíz (App)
import { appConfig } from './app/app.config'; // Importa la configuración (appConfig)

bootstrapApplication(App, appConfig) // Arranca la aplicación con el componente App y la configuración
  .catch(err => console.error(err));