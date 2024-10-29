import {initialFeedState} from '../../../shared/components/feed/store/state/feed.state';
import {initialPopularTagsState} from '../../../shared/components/popular-tags/store/state/popular-tags.state';
import {AppStateInterface} from '../../../shared/types/appStateInterface';
import {initialAuthState} from './auth.state';

export const initialAppState: AppStateInterface = {
  auth: initialAuthState,
  feed: initialFeedState,
  popularTags: initialPopularTagsState,
};

export function getInitState(): AppStateInterface {
  return initialAppState;
}
