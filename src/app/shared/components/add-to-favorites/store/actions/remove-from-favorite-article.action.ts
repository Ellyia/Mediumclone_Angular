import {createAction, props} from '@ngrx/store';

import {ActionTypes} from './actionTypes';
import {ArticleInterface} from '../../../../types/article.interfase';

export const removeFromFavoriteArticleAction = createAction(
  ActionTypes.DELETE_FROM_FAVORITE_ARTICLE,
  props<{slug: string}>()
);

export const removeFromFavoriteArticleSuccessAction = createAction(
  ActionTypes.DELETE_FROM_FAVORITE_ARTICLE_SUCCESS,
  props<{article: ArticleInterface}>()
);

export const removeFromFavoriteArticleFailureAction = createAction(
  ActionTypes.DELETE_FROM_FAVORITE_ARTICLE_FAILURE,
  props<{error: string}>()
);
