import {EditArticleStateInterface} from '../../types/editArticleState.interface';

export const initialEditArticleState: EditArticleStateInterface = {
  isLoading: false,
  article: null,
  validationErrors: null,
  isSubmitting: false,
};
