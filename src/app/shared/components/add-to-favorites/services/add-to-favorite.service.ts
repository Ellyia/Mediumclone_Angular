import {HttpClient} from '@angular/common/http';
import {inject, Injectable} from '@angular/core';
import {Observable} from 'rxjs';

import {ArticleInterface} from '../../../types/article.interfase';
import {environment} from '../../../../../environments/environment';

@Injectable({
  providedIn: 'root',
})
export class AddToFavoriteService {
  private readonly http = inject(HttpClient);

  addToFavourite(slug: string): Observable<ArticleInterface> {
    const fullUrl = `${environment.apiUrl}/articles/${slug}/favorite`;
    console.log('here');
    return this.http.post<ArticleInterface>(fullUrl, {});
  }

  deleteFromFavourite(slug: string): Observable<ArticleInterface> {
    const fullUrl = `${environment.apiUrl}/articles/${slug}/favorite`;

    return this.http.delete<ArticleInterface>(fullUrl);
  }
}
