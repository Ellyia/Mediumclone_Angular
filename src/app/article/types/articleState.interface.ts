import {ArticleInterface} from '../../shared/types/article.interfase';

export interface ArticleStateInterface {
  data: ArticleInterface | null;
  error: string | null;
  isLoading: boolean;
}
