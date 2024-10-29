import {ApplicationConfig, provideZoneChangeDetection} from '@angular/core';
import {provideRouter} from '@angular/router';
import {provideHttpClient} from '@angular/common/http';
import {provideStoreDevtools} from '@ngrx/store-devtools';
import {provideStore} from '@ngrx/store';
import {provideEffects} from '@ngrx/effects';

import {routes} from './app.routes';
import {environment} from '../environments/environment';
import {appReducers} from './auth/store/reducers/app.reducers';
import {RegisterEffects} from './auth/store/effects/register.effects';

export const appConfig: ApplicationConfig = {
  providers: [
    provideZoneChangeDetection({eventCoalescing: true}),
    provideRouter(routes),
    provideHttpClient(), // withInterceptors([]) - if I will need interceptors // instead of: importProvidersFrom(HttpClientModule) - deprecated,
    provideStore(appReducers), // {appState: authReducer} if 1 reducer and I don't have appReducer
    provideEffects([RegisterEffects]),
    provideStoreDevtools({
      maxAge: 25, // Retains last 25 states
      logOnly: environment.production, // !isDevMode(),
    }),
  ],
};
