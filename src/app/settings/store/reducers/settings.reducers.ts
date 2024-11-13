import {createReducer, on} from '@ngrx/store';

import {initialSettingsState} from '../state/settings.state';
import {
  updateCurrentUserAction,
  updateCurrentUserFailureAction,
  updateCurrentUserSuccessAction,
} from '../../../auth/store/actions/update-current-user.action';
import {SettingsStateInterface} from '../../types/settingsState.interface';

export const settingsReducer = createReducer(
  // here reducer reacts on actions from another store (auth)
  initialSettingsState,
  on(
    updateCurrentUserAction,
    (state): SettingsStateInterface => ({
      ...state,
      isSubmitting: true,
      validationErrors: null,
    })
  ),
  on(
    updateCurrentUserSuccessAction,
    (state): SettingsStateInterface => ({
      ...state,
      isSubmitting: false,
      validationErrors: null,
    })
  ),
  on(
    updateCurrentUserFailureAction,
    (state, {errors}): SettingsStateInterface => ({
      ...state,
      isSubmitting: false,
      validationErrors: errors,
    })
  )
);
