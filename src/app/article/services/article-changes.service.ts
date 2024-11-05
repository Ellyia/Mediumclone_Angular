import {inject, Injectable} from '@angular/core';
import {map, Observable} from 'rxjs';
import {HttpClient} from '@angular/common/http';

import {environment} from '../../../environments/environment';
import {ArticleInterface} from '../../shared/types/article.interfase';
import {GetArticleResponseInterface} from '../../shared/types/getArticleResponse.interface';

@Injectable({
  providedIn: 'root',
})
export class ArticleChangesService {
  private readonly httpClient = inject(HttpClient);

  deleteArticle(slug: string): Observable<{}> {
    const fullUrl = `${environment.apiUrl}/articles/${slug}`;

    return this.httpClient.delete<{}>(fullUrl);
  }
}
