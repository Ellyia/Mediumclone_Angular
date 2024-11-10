import {BackendErrorsInterface} from '../../shared/types/backendErrors.interface';

export interface CreateArticleStateInterface {
  validationErrors: BackendErrorsInterface | null;
  isSubmitting: boolean;
}
