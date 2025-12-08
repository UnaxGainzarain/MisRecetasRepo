import { ApplicationConfig, provideBrowserGlobalErrorListeners, provideZoneChangeDetection } from '@angular/core';
import { provideRouter } from '@angular/router';
import {ReactiveFormsModule } from '@angular/forms'; 
import { provideHttpClient } from '@angular/common/http'; // IMPORTANTE: Importar esto
import { routes } from './app.routes';

export const appConfig: ApplicationConfig = {
  providers: [
    provideBrowserGlobalErrorListeners(),
    provideZoneChangeDetection({ eventCoalescing: true }),
    provideRouter(routes),
provideHttpClient() 
  ]
};