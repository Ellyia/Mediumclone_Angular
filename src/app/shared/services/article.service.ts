import {inject, Injectable} from '@angular/core';
import {map, Observable} from 'rxjs';
import {HttpClient} from '@angular/common/http';

import {environment} from '../../../environments/environment';
import {ArticleInterface} from '../../shared/types/article.interfase';
import {GetArticleResponseInterface} from '../types/getArticleResponse.interface';

@Injectable({
  providedIn: 'root',
})
export class ArticleService {
  private readonly httpClient = inject(HttpClient);

  getArticle(slug: string): Observable<ArticleInterface> {
    const fullUrl = `${environment.apiUrl}/articles/${slug}`;

    return this.httpClient
      .get<GetArticleResponseInterface>(fullUrl)
      .pipe(map(({article}) => article));
  }
}
