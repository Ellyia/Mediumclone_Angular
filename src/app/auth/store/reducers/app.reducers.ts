import {ActionReducerMap} from '@ngrx/store';
import {AppStateInterface} from '../../../shared/types/appStateInterface';
import {authReducer} from './auth.reducers';
import {feedReducer} from '../../../shared/components/feed/store/reducers/feed.reducer';

export const appReducers: ActionReducerMap<AppStateInterface, any> = {
  auth: authReducer,
  feed: feedReducer,
};
