import {createAction, props} from '@ngrx/store';

import {ActionTypes} from './actionTypes';
import {ArticleInputInterface} from '../../../shared/types/articleInput.interface';
import {ArticleInterface} from '../../../shared/types/article.interfase';
import {BackendErrorsInterface} from '../../../shared/types/backendErrors.interface';

export const updateArticleAction = createAction(
  ActionTypes.UPDATE_ARTICLE,
  props<{slug: string; articleInput: ArticleInputInterface}>()
);

export const updateArticleSuccessAction = createAction(
  ActionTypes.UPDATE_ARTICLE_SUCCESS,
  props<{article: ArticleInterface}>()
);

export const updateArticleFailureAction = createAction(
  ActionTypes.UPDATE_ARTICLE_FAILURE,
  props<{errors: BackendErrorsInterface}>()
);
