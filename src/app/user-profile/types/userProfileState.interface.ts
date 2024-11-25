import {BackendErrorsInterface} from '../../shared/types/backendErrors.interface';
import {ProfileInterface} from '../../shared/types/profile.interface';

export interface UserProfileStateInterface {
  data: ProfileInterface | null;
  isLoading: boolean;
  errors: BackendErrorsInterface | null;
}
