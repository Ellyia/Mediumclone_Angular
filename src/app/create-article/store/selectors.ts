import {createSelector} from '@ngrx/store';

import {AppStateInterface} from '../../shared/types/appState.interface';
import {CreateArticleStateInterface} from '../types/createArticleState.interface';

const selectCreateArticle = (
  state: AppStateInterface
): CreateArticleStateInterface => state.createArticle;

export const isSubmittingSelector = createSelector(
  selectCreateArticle,
  (state: CreateArticleStateInterface) => state.isSubmitting
);

export const validationErrorsSelector = createSelector(
  selectCreateArticle,
  (state: CreateArticleStateInterface) => state.validationErrors
);
