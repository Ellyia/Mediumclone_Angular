import {createAction, props} from '@ngrx/store';

import {ActionTypes} from './actionTypes';
import {ProfileInterface} from '../../../shared/types/profile.interface';
import {BackendErrorsInterface} from '../../../shared/types/backendErrors.interface';

export const getProfileAction = createAction(
  ActionTypes.GET_PROFILE,
  props<{slug: string}>()
);

export const getProfileSuccessAction = createAction(
  ActionTypes.GET_PROFILE_SUCCESS,
  props<{profile: ProfileInterface}>()
);

export const getProfileFailureAction = createAction(
  ActionTypes.GET_PROFILE_FAILURE,
  props<{error: BackendErrorsInterface}>()
);
