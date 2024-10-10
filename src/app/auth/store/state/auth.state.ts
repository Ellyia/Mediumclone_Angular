import {AuthStateInterface} from '../../types/authState.interface';

export const initialAuthState: AuthStateInterface = {
  isSubmitting: false,
  currentUser: null,
  isLoggedIn: null,
  validationErrors: null,
};
