import {HttpClient} from '@angular/common/http';
import {inject, Injectable} from '@angular/core';
import {map, Observable} from 'rxjs';

import {ArticleInterface} from '../../../types/article.interfase';
import {environment} from '../../../../../environments/environment';
import {GetArticleResponseInterface} from '../../../types/getArticleResponse.interface';

@Injectable({
  providedIn: 'root',
})
export class AddToFavoriteService {
  private readonly http = inject(HttpClient);

  addToFavourite(slug: string): Observable<ArticleInterface> {
    const fullUrl = `${environment.apiUrl}/articles/${slug}/favorite`;

    return this.http
      .post<GetArticleResponseInterface>(fullUrl, {})
      .pipe(map((resp) => resp.article));
  }

  deleteFromFavourite(slug: string): Observable<ArticleInterface> {
    const fullUrl = `${environment.apiUrl}/articles/${slug}/favorite`;

    return this.http
      .delete<GetArticleResponseInterface>(fullUrl)
      .pipe(map((resp) => resp.article));
  }
}
