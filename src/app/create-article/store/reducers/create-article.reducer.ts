import {createReducer, on} from '@ngrx/store';

import {initialCreateArticleState} from '../state/create-article.state';
import {CreateArticleStateInterface} from '../../types/createArticleState.interface';
import {
  createArticleAction,
  createArticleFailureAction,
  createArticleSuccessAction,
} from '../actions/create-article.action';

export const createArticleReducer = createReducer(
  initialCreateArticleState,
  on(
    createArticleAction,
    (state): CreateArticleStateInterface => ({
      ...state,
      isSubmitting: true,
      validationErrors: null,
    })
  ),
  on(
    createArticleSuccessAction,
    (state): CreateArticleStateInterface => ({
      ...state,
      isSubmitting: false,
      validationErrors: null,
    })
  ),
  on(
    createArticleFailureAction,
    (state, {errors}): CreateArticleStateInterface => ({
      ...state,
      isSubmitting: false,
      validationErrors: errors,
    })
  )
);
