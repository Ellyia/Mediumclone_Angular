import {inject, Injectable} from '@angular/core';
import {map, Observable} from 'rxjs';
import {HttpClient} from '@angular/common/http';

import {environment} from '../../../../../environments/environment';
import {GetPopularTagsResponseInterface} from '../types/get-popular-tags-response.interface';
import {PopularTagType} from '../../../types/popularTag.type';

@Injectable({
  providedIn: 'root',
})
export class PopularTagsService {
  private readonly httpClient = inject(HttpClient);

  getPopularTags(url: string): Observable<PopularTagType[]> {
    const fullUrl = environment.apiUrl + url;

    return this.httpClient
      .get<GetPopularTagsResponseInterface>(fullUrl)
      .pipe(map((response: GetPopularTagsResponseInterface) => response.tags));
  }
}
