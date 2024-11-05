import {createReducer, on} from '@ngrx/store';
import {routerNavigatedAction} from '@ngrx/router-store';

import {initialArticleState} from '../state/article.state';
import {
  getArticleAction,
  getArticleFailureAction,
  getArticleSuccessAction,
} from '../actions/get-article.action';
import {ArticleStateInterface} from '../../types/articleState.interface';

export const articleReducer = createReducer(
  initialArticleState,
  on(
    getArticleAction,
    (state): ArticleStateInterface => ({
      ...state,
      isLoading: true,
      error: null,
    })
  ),
  on(
    getArticleSuccessAction,
    (state, {article}): ArticleStateInterface => ({
      ...state,
      isLoading: false,
      error: null,
      data: article,
    })
  ),
  on(
    getArticleFailureAction,
    (state, {error}): ArticleStateInterface => ({
      ...state,
      isLoading: false,
      error: error,
      data: null,
    })
  ),
  on(routerNavigatedAction, (): ArticleStateInterface => initialArticleState)
);
