import {ArticleInterface} from '../../../types/article.interfase';

export interface GetFeedResponseInterface {
  articles: ArticleInterface[];
  articlesCount: number;
}
