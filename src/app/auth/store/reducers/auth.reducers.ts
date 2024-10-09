import {createReducer, on} from '@ngrx/store';

import {AuthStateInterface} from '../../types/authState.interface';
import {registerAction} from '../actions/register.action';
import {initialAuthState} from '../state/auth.state';

export const authReducer = createReducer(
  initialAuthState,
  on(
    registerAction,
    (state): AuthStateInterface => ({
      ...state,
      isSubmitting: true,
    })
  )
);

// export function reducer(state: AuthStateInterface, action: Action) {
//   return authReducer(state, action);
// }
