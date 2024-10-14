import {createReducer, on} from '@ngrx/store';

import {AuthStateInterface} from '../../types/authState.interface';
import {
  registerAction,
  registerFailureAction,
  registerSuccessAction,
} from '../actions/register.action';
import {initialAuthState} from '../state/auth.state';
import {
  loginAction,
  loginFailureAction,
  loginSuccessAction,
} from '../actions/login.action';

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
  ),
  on(
    loginAction,
    (state): AuthStateInterface => ({
      ...state,
      isSubmitting: true,
      validationErrors: null,
    })
  ),
  on(
    loginSuccessAction,
    (state, {currentUser}): AuthStateInterface => ({
      ...state,
      isSubmitting: false,
      isLoggedIn: true,
      validationErrors: null,
      currentUser: currentUser,
    })
  ),
  on(
    loginFailureAction,
    (state, {errors}): AuthStateInterface => ({
      ...state,
      isSubmitting: false,
      validationErrors: errors,
    })
  )
);
