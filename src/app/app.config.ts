import {ApplicationConfig, provideZoneChangeDetection} from '@angular/core';
import {provideRouter} from '@angular/router';
import {provideHttpClient, withInterceptors} from '@angular/common/http';
import {provideStoreDevtools} from '@ngrx/store-devtools';
import {provideStore} from '@ngrx/store';
import {provideEffects} from '@ngrx/effects';
import {provideRouterStore} from '@ngrx/router-store';

import {routes} from './app.routes';
import {environment} from '../environments/environment';
import {RegisterEffects} from './auth/store/effects/register.effects';
import {LoginEffects} from './auth/store/effects/login.effects';
import {GetCurrentUserEffects} from './auth/store/effects/get-current-user.effect';
import {authInterceptor} from './shared/interceptors/auth.interceptor';
import {GetFeedEffects} from './shared/components/feed/store/effects/get-feed.effect';
import {GetPopularTagsEffects} from './shared/components/popular-tags/store/effects/get-popular-tags.effect';
import {GetArticleEffects} from './article/store/effects/get-article.effect';
import {DeleteArticleEffects} from './article/store/effects/delete-article.effect';
import {CreateArticleEffects} from './create-article/store/effects/create-article.effect';
import {UpdateArticleEffects} from './edit-article/store/effects/get-article.effect';
import {EditArticleEffects} from './edit-article/store/effects/edit-article.effect';
import {appReducers} from './store/reducers/app.reducers';

export const appConfig: ApplicationConfig = {
  providers: [
    provideZoneChangeDetection({eventCoalescing: true}),
    provideRouter(routes),
    provideHttpClient(withInterceptors([authInterceptor])), // withInterceptors([]) - if I will need interceptors / if not - provideHttpClient() // instead of: importProvidersFrom(HttpClientModule) - deprecated,
    provideStore(appReducers), // {appState: authReducer} if 1 reducer and if I don't have appReducer
    provideEffects([
      RegisterEffects,
      LoginEffects,
      GetCurrentUserEffects,
      GetFeedEffects,
      GetPopularTagsEffects,
      GetArticleEffects,
      DeleteArticleEffects,
      CreateArticleEffects,
      UpdateArticleEffects,
      EditArticleEffects,
    ]),
    provideStoreDevtools({
      maxAge: 25, // Retains last 25 states
      logOnly: environment.production, // !isDevMode(),
    }),
    provideRouterStore(),
  ],
};
