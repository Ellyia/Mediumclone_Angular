import {createReducer, on} from '@ngrx/store';

import {AuthStateInterface} from '../../types/authState.interface';
import {
  registerAction,
  registerFailureAction,
  registerSuccessAction,
} from '../actions/register.action';
import {initialAuthState} from '../state/auth.state';

export const authReducer = createReducer(
  initialAuthState,
  on(
    registerAction,
    (state): AuthStateInterface => ({
      ...state,
      isSubmitting: true,
      validationErrors: null,
    })
  ),
  on(
    registerSuccessAction,
    (state, {currentUser}): AuthStateInterface => ({
      ...state,
      isSubmitting: false,
      isLoggedIn: true,
      validationErrors: null,
      currentUser: currentUser,
    })
  ),
  on(
    registerFailureAction,
    (state, {errors}): AuthStateInterface => ({
      ...state,
      isSubmitting: false,
      validationErrors: errors,
    })
  )
);
