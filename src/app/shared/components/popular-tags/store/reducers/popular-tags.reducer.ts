import {createReducer, on} from '@ngrx/store';

import {initialPopularTagsState} from '../state/popular-tags.state';
import {
  getPopularTagsAction,
  getPopularTagsFailureAction,
  getPopularTagsSuccessAction,
} from '../actions/get-popular-tags.action';
import {PopularTagsStateInterface} from '../../types/popularTagsState.interface';

export const popularTagsReducer = createReducer(
  initialPopularTagsState,
  on(
    getPopularTagsAction,
    (state): PopularTagsStateInterface => ({
      ...state,
      isLoading: true,
      error: null,
    })
  ),
  on(
    getPopularTagsSuccessAction,
    (state, {popularTags}): PopularTagsStateInterface => ({
      ...state,
      isLoading: false,
      error: null,
      data: popularTags,
    })
  ),
  on(
    getPopularTagsFailureAction,
    (state, {error}): PopularTagsStateInterface => ({
      ...state,
      isLoading: false,
      error: error,
      data: null,
    })
  )
);
