import {createReducer, on} from '@ngrx/store';
import {initialFeedState} from '../state/feed.state';
import {
  getFeedAction,
  getFeedFailureAction,
  getFeedSuccessAction,
} from '../actions/get-feed.action';
import {FeedStateInterface} from '../../types/feedState.interface';

export const feedReducer = createReducer(
  initialFeedState,
  on(
    getFeedAction,
    (state): FeedStateInterface => ({
      ...state,
      isLoading: true,
      error: null,
    })
  ),
  on(
    getFeedSuccessAction,
    (state, {feed}): FeedStateInterface => ({
      ...state,
      isLoading: false,
      error: null,
      data: feed,
    })
  ),
  on(
    getFeedFailureAction,
    (state, {error}): FeedStateInterface => ({
      ...state,
      isLoading: false,
      error: error,
      data: null,
    })
  )
);
