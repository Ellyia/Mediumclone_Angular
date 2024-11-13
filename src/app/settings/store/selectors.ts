import {createSelector} from '@ngrx/store';

import {AppStateInterface} from '../../shared/types/appState.interface';
import {SettingsStateInterface} from '../types/settingsState.interface';

const selectSettings = (state: AppStateInterface): SettingsStateInterface =>
  state.settings;

export const isSubmittingSelector = createSelector(
  selectSettings,
  (state: SettingsStateInterface) => state.isSubmitting
);

export const validationErrorsSelector = createSelector(
  selectSettings,
  (state: SettingsStateInterface) => state.validationErrors
);
