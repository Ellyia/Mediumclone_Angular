import {createAction, props} from '@ngrx/store';

import {ActionTypes} from './actionTypes';
import {ArticleInterface} from '../../../../types/article.interfase';

export const addToFavoriteArticleAction = createAction(
  ActionTypes.ADD_TO_FAVORITE_ARTICLE,
  props<{slug: string}>()
);

export const addToFavoriteArticleSuccessAction = createAction(
  ActionTypes.ADD_TO_FAVORITE_ARTICLE_SUCCESS,
  props<{article: ArticleInterface}>()
);

export const addToFavoriteArticleFailureAction = createAction(
  ActionTypes.ADD_TO_FAVORITE_ARTICLE_FAILURE,
  props<{error: string}>()
);
