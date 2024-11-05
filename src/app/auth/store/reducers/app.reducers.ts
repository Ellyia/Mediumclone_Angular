import {ActionReducerMap} from '@ngrx/store';
import {routerReducer} from '@ngrx/router-store';

import {AppStateInterface} from '../../../shared/types/appState.interface';
import {authReducer} from './auth.reducers';
import {feedReducer} from '../../../shared/components/feed/store/reducers/feed.reducer';
import {popularTagsReducer} from '../../../shared/components/popular-tags/store/reducers/popular-tags.reducer';
import {articleReducer} from '../../../article/store/reducers/article.reducer';

export const appReducers: ActionReducerMap<AppStateInterface, any> = {
  auth: authReducer,
  feed: feedReducer,
  router: routerReducer,
  popularTags: popularTagsReducer,
  article: articleReducer,
};
