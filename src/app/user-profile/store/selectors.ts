import {createSelector} from '@ngrx/store';
import {AppStateInterface} from '../../shared/types/appState.interface';
import {UserProfileStateInterface} from '../types/userProfileState.interface';

const selectProfile = (state: AppStateInterface): UserProfileStateInterface =>
  state.userProfile;

export const userProfileSelector = createSelector(
  selectProfile,
  (state: UserProfileStateInterface) => state.data
);

export const isLoadingProfileselector = createSelector(
  selectProfile,
  (state: UserProfileStateInterface) => state.isLoading
);

export const errorsProfileSelector = createSelector(
  selectProfile,
  (state: UserProfileStateInterface) => state.errors
);
