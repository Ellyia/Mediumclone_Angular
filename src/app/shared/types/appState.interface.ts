import {RouterReducerState} from '@ngrx/router-store';

import {AuthStateInterface} from '../../auth/types/authState.interface';
import {FeedStateInterface} from '../components/feed/types/feedState.interface';
import {PopularTagsStateInterface} from '../components/popular-tags/types/popularTagsState.interface';
import {ArticleStateInterface} from '../../article/types/articleState.interface';

export interface AppStateInterface {
  router?: RouterReducerState;
  auth: AuthStateInterface;
  feed: FeedStateInterface;
  popularTags: PopularTagsStateInterface;
  article: ArticleStateInterface;
}
