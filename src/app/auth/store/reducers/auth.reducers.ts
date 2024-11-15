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
import {
  getCurrentUserAction,
  getCurrentUserFailureAction,
  getCurrentUserSuccessAction,
} from '../actions/get-current-user.actions';
import {updateCurrentUserSuccessAction} from '../actions/update-current-user.action';
import {logoutAction} from '../actions/syncronous.action';

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
  //
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
  ),
  //
  on(
    getCurrentUserAction,
    (state): AuthStateInterface => ({
      ...state,
      isLoading: true,
    })
  ),
  on(
    getCurrentUserSuccessAction,
    (state, {currentUser}): AuthStateInterface => ({
      ...state,
      isLoading: false,
      isLoggedIn: true,
      currentUser: currentUser,
    })
  ),
  on(
    getCurrentUserFailureAction,
    (state): AuthStateInterface => ({
      ...state,
      isLoading: false,
      isLoggedIn: false,
      currentUser: null,
    })
  ),
  //
  on(updateCurrentUserSuccessAction, (state, {currentUser}) => ({
    ...state,
    currentUser,
  })),
  on(logoutAction, () => ({
    ...initialAuthState,
    isLoggedIn: false,
  }))
);
