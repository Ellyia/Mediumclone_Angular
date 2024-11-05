import {createSelector} from '@ngrx/store';

import {ArticleStateInterface} from '../types/articleState.interface';
import {AppStateInterface} from '../../shared/types/appState.interface';

const selectArticle = (state: AppStateInterface): ArticleStateInterface =>
  state.article;

export const articleDataSelector = createSelector(
  selectArticle,
  (state: ArticleStateInterface) => state.data
);

export const isLoadingArticleSelector = createSelector(
  selectArticle,
  (state: ArticleStateInterface) => state.isLoading
);

export const errorArticleSelector = createSelector(
  selectArticle,
  (state: ArticleStateInterface) => state.error
);
