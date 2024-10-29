import {AppStateInterface} from '../../../shared/types/appStateInterface';
import {initialAuthState} from './auth.state';

export const initialAppState: AppStateInterface = {
  auth: initialAuthState,
};

export function getInitState(): AppStateInterface {
  return initialAppState;
}
