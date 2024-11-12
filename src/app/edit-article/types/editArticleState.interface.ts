import {ArticleInterface} from '../../shared/types/article.interfase';
import {BackendErrorsInterface} from '../../shared/types/backendErrors.interface';

export interface EditArticleStateInterface {
  isLoading: boolean;
  article: ArticleInterface | null;
  validationErrors: BackendErrorsInterface | null;
  isSubmitting: boolean;
}
