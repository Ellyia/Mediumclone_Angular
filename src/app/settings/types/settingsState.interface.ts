import {BackendErrorsInterface} from '../../shared/types/backendErrors.interface';

export interface SettingsStateInterface {
  isSubmitting: boolean;
  validationErrors: BackendErrorsInterface | null;
} // here separated view layer from business logic, wich is into the auth store (reducer)
