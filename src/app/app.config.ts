import {
  ApplicationConfig,
  importProvidersFrom,
  isDevMode,
  provideZoneChangeDetection,
} from '@angular/core';
import {provideRouter} from '@angular/router';
import {provideStoreDevtools} from '@ngrx/store-devtools';
import {provideStore} from '@ngrx/store';

import {routes} from './app.routes';
import {environment} from '../environments/environment';
import {appReducers} from './auth/store/reducers/app.reducers';
import {provideHttpClient, withInterceptors} from '@angular/common/http';

export const appConfig: ApplicationConfig = {
  providers: [
    provideZoneChangeDetection({eventCoalescing: true}),
    provideRouter(routes),
    provideHttpClient(), // withInterceptors([]) - if I will need interceptors // instead of: importProvidersFrom(HttpClientModule) - deprecated,
    provideStore(appReducers), // {appState: authReducer} if 1 reducer and I don't have appReducer
    provideStoreDevtools({
      maxAge: 25, // Retains last 25 states
      logOnly: environment.production, // !isDevMode(),
    }),
  ],
};
