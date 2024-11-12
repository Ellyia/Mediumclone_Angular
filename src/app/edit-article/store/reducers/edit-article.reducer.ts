import {createReducer, on} from '@ngrx/store';

import {initialEditArticleState} from '../state/edit-article.state';
import {
  updateArticleAction,
  updateArticleFailureAction,
  updateArticleSuccessAction,
} from '../actions/edit-article.action';
import {EditArticleStateInterface} from '../../types/editArticleState.interface';
import {
  getArticleAction,
  getArticleFailureAction,
  getArticleSuccessAction,
} from '../actions/get-article.action';

export const editArticleReducer = createReducer(
  initialEditArticleState,
  on(
    updateArticleAction,
    (state): EditArticleStateInterface => ({
      ...state,
      isSubmitting: true,
      validationErrors: null,
    })
  ),
  on(
    updateArticleSuccessAction,
    (state): EditArticleStateInterface => ({
      ...state,
      isSubmitting: false,
      article: null,
    })
  ),
  on(
    updateArticleFailureAction,
    (state, {errors}): EditArticleStateInterface => ({
      ...state,
      isSubmitting: false,
      validationErrors: errors,
      article: null,
    })
  ),
  //
  on(
    getArticleAction,
    (state): EditArticleStateInterface => ({
      ...state,
      isLoading: true,
      validationErrors: null,
    })
  ),
  on(
    getArticleSuccessAction,
    (state, {article}): EditArticleStateInterface => ({
      ...state,
      isLoading: false,
      article,
    })
  ),
  on(
    getArticleFailureAction,
    (state): EditArticleStateInterface => ({
      ...state,
      isLoading: false,
    })
  )
);
