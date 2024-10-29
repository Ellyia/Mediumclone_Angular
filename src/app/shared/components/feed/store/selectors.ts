import {createSelector} from '@ngrx/store';

import {AppStateInterface} from '../../../types/appStateInterface';
import {FeedStateInterface} from '../types/feedState.interface';

const selectFeed = (state: AppStateInterface): FeedStateInterface => state.feed;

export const feedDataSelector = createSelector(
  selectFeed,
  (state: FeedStateInterface) => state.data
);

export const isLoadingFeedSelector = createSelector(
  selectFeed,
  (state: FeedStateInterface) => state.isLoading
);

export const errorFeedSelector = createSelector(
  selectFeed,
  (state: FeedStateInterface) => state.error
);
