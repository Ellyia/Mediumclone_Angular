import {ActionReducerMap} from '@ngrx/store';
import {routerReducer} from '@ngrx/router-store';
import {AppStateInterface} from '../../shared/types/appState.interface';
import {authReducer} from '../../auth/store/reducers/auth.reducers';
import {feedReducer} from '../../shared/components/feed/store/reducers/feed.reducer';
import {popularTagsReducer} from '../../shared/components/popular-tags/store/reducers/popular-tags.reducer';
import {articleReducer} from '../../article/store/reducers/article.reducer';
import {createArticleReducer} from '../../create-article/store/reducers/create-article.reducer';
import {editArticleReducer} from '../../edit-article/store/reducers/edit-article.reducer';
import {settingsReducer} from '../../settings/store/reducers/settings.reducers';
import {profileReducer} from '../../user-profile/store/reducers/profile.reducer';

export const appReducers: ActionReducerMap<AppStateInterface, any> = {
  auth: authReducer,
  feed: feedReducer,
  router: routerReducer,
  popularTags: popularTagsReducer,
  article: articleReducer,
  createArticle: createArticleReducer,
  editArticle: editArticleReducer,
  settings: settingsReducer,
  userProfile: profileReducer,
};
