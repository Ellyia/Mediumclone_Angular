import {RouterReducerState} from '@ngrx/router-store';

import {AuthStateInterface} from '../../auth/types/authState.interface';
import {FeedStateInterface} from '../components/feed/types/feedState.interface';
import {PopularTagsStateInterface} from '../components/popular-tags/types/popularTagsState.interface';
import {ArticleStateInterface} from '../../article/types/articleState.interface';
import {CreateArticleStateInterface} from '../../create-article/types/createArticleState.interface';
import {EditArticleStateInterface} from '../../edit-article/types/editArticleState.interface';
import {SettingsStateInterface} from '../../settings/types/settingsState.interface';
import {UserProfileStateInterface} from '../../user-profile/types/userProfileState.interface';

export interface AppStateInterface {
  router?: RouterReducerState;
  auth: AuthStateInterface;
  feed: FeedStateInterface;
  popularTags: PopularTagsStateInterface;
  article: ArticleStateInterface;
  createArticle: CreateArticleStateInterface;
  editArticle: EditArticleStateInterface;
  settings: SettingsStateInterface;
  userProfile: UserProfileStateInterface;
}
