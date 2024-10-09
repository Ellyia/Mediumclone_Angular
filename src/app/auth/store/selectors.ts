import {createSelector} from '@ngrx/store';
import {AuthStateInterface} from '../types/authState.interface';
import {AppStateInterface} from '../../shared/types/appStateInterface';

const selectAuth = (state: AppStateInterface): AuthStateInterface => state.auth;

export const isSubmittingSelector = createSelector(
  selectAuth,
  (state: AuthStateInterface) => state.isSubmitting
);
