import {initialArticleState} from '../../article/store/state/article.state';
import {initialAuthState} from '../../auth/store/state/auth.state';
import {initialCreateArticleState} from '../../create-article/store/state/create-article.state';
import {initialEditArticleState} from '../../edit-article/store/state/edit-article.state';
import {initialFeedState} from '../../shared/components/feed/store/state/feed.state';
import {initialPopularTagsState} from '../../shared/components/popular-tags/store/state/popular-tags.state';
import {AppStateInterface} from '../../shared/types/appState.interface';

export const initialAppState: AppStateInterface = {
  auth: initialAuthState,
  feed: initialFeedState,
  popularTags: initialPopularTagsState,
  article: initialArticleState,
  createArticle: initialCreateArticleState,
  editArticle: initialEditArticleState,
};

export function getInitState(): AppStateInterface {
  return initialAppState;
}
