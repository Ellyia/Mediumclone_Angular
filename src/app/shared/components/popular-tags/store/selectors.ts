import {createSelector} from '@ngrx/store';

import {AppStateInterface} from '../../../types/appState.interface';
import {PopularTagsStateInterface} from '../types/popularTagsState.interface';

const selectPopularTags = (
  state: AppStateInterface
): PopularTagsStateInterface => state.popularTags;

export const popularTagsDataSelector = createSelector(
  selectPopularTags,
  (state: PopularTagsStateInterface) => state.data
);

export const isLoadingPopularTagsSelector = createSelector(
  selectPopularTags,
  (state: PopularTagsStateInterface) => state.isLoading
);

export const errorPopularTagsSelector = createSelector(
  selectPopularTags,
  (state: PopularTagsStateInterface) => state.error
);
