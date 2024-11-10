import {HttpClient} from '@angular/common/http';
import {inject, Injectable} from '@angular/core';
import {map, Observable} from 'rxjs';

import {ArticleInterface} from '../../shared/types/article.interfase';
import {ArticleInputInterface} from '../../shared/types/articleInput.interface';
import {environment} from '../../../environments/environment';
import {ArticleResponseInterface} from '../../shared/types/articleResponse.interface';

@Injectable({
  providedIn: 'root',
})
export class CreateArticleService {
  private readonly http = inject(HttpClient);

  createArticle(
    articleInput: ArticleInputInterface
  ): Observable<ArticleInterface> {
    const fullUrl = environment.apiUrl + '/articles';

    return this.http
      .post<ArticleResponseInterface>(fullUrl, {article: articleInput})
      .pipe(map((res: ArticleResponseInterface) => res.article));
  }
}
