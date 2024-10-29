import {ActionReducerMap} from '@ngrx/store';
import {AppStateInterface} from '../../../shared/types/appStateInterface';
import {authReducer} from './auth.reducers';

export const appReducers: ActionReducerMap<AppStateInterface, any> = {
  auth: authReducer,
};
