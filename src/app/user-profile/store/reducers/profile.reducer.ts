import {createReducer, on} from '@ngrx/store';

import {
  getProfileAction,
  getProfileFailureAction,
  getProfileSuccessAction,
} from '../actions/get-profile.action';
import {UserProfileStateInterface} from '../../types/userProfileState.interface';
import {initialProfileState} from '../state/profile.state';

export const profileReducer = createReducer(
  initialProfileState,
  on(
    getProfileAction,
    (state): UserProfileStateInterface => ({
      ...state,
      isLoading: true,
      errors: null,
      data: null,
    })
  ),
  on(
    getProfileSuccessAction,
    (state, {profile}): UserProfileStateInterface => ({
      ...state,
      isLoading: false,
      data: profile,
    })
  ),
  on(
    getProfileFailureAction,
    (state, {error}): UserProfileStateInterface => ({
      ...state,
      isLoading: false,
      errors: error,
    })
  )
);
