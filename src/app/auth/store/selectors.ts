import {createSelector} from '@ngrx/store';
import {AuthStateInterface} from '../types/authState.interface';
import {AppStateInterface} from '../../shared/types/appState.interface';

const selectAuth = (state: AppStateInterface): AuthStateInterface => state.auth;

export const isSubmittingSelector = createSelector(
  selectAuth,
  (state: AuthStateInterface) => state.isSubmitting
);

export const validationErrorsSelector = createSelector(
  selectAuth,
  (state: AuthStateInterface) => state.validationErrors
);

export const isLoggedInSelector = createSelector(
  selectAuth,
  (state: AuthStateInterface) => state.isLoggedIn
);

export const isAnonymousSelector = createSelector(
  selectAuth,
  (state: AuthStateInterface) => state.isLoggedIn === false
);

export const currentUserSelector = createSelector(
  selectAuth,
  (state: AuthStateInterface) => state.currentUser
);
