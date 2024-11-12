import {createSelector} from '@ngrx/store';

import {AppStateInterface} from '../../shared/types/appState.interface';
import {EditArticleStateInterface} from '../types/editArticleState.interface';

const selectEditArticle = (
  state: AppStateInterface
): EditArticleStateInterface => state.editArticle;

export const isSubmittingSelector = createSelector(
  selectEditArticle,
  (state: EditArticleStateInterface) => state.isSubmitting
);

export const isLoadingSelector = createSelector(
  selectEditArticle,
  (state: EditArticleStateInterface) => state.isSubmitting
);

export const validationErrorsSelector = createSelector(
  selectEditArticle,
  (state: EditArticleStateInterface) => state.validationErrors
);

export const articleSelector = createSelector(
  selectEditArticle,
  (state: EditArticleStateInterface) => state.article
);
