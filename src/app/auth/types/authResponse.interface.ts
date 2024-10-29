import {CurrentUserInterface} from '../../shared/types/currentUser.interface';

export interface AuthResponseInterface {
  user: CurrentUserInterface;
}
// register/login/fetch current user - same response from this API on all this requests
