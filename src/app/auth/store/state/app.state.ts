import {initialFeedState} from '../../../shared/components/feed/store/state/feed.state';
import {AppStateInterface} from '../../../shared/types/appStateInterface';
import {initialAuthState} from './auth.state';

export const initialAppState: AppStateInterface = {
  auth: initialAuthState,
  feed: initialFeedState,
};

export function getInitState(): AppStateInterface {
  return initialAppState;
}
