import {inject, Injectable} from '@angular/core';
import {Observable} from 'rxjs';
import {HttpClient} from '@angular/common/http';

import {GetFeedResponseInterface} from '../types/getFeedResponse.interface';
import {environment} from '../../../../../environments/environment';

@Injectable({
  providedIn: 'root',
})
export class FeedService {
  private readonly httpClient = inject(HttpClient);

  getFeed(url: string): Observable<GetFeedResponseInterface> {
    const fullUrl = environment.apiUrl + url;

    return this.httpClient.get<GetFeedResponseInterface>(fullUrl);
  }
}
