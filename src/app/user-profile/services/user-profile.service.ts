import {HttpClient} from '@angular/common/http';
import {inject, Injectable} from '@angular/core';
import {map, Observable} from 'rxjs';

import {environment} from '../../../environments/environment';
import {UserProfileResponseInterface} from '../types/profileResponse.interface';
import {ProfileInterface} from '../../shared/types/profile.interface';

@Injectable({
  providedIn: 'root',
})
export class UserProfileService {
  private readonly http = inject(HttpClient);

  getProfile(url: string): Observable<ProfileInterface> {
    const fullUrl = `${environment.apiUrl}/profiles/${url}`;

    return this.http
      .get<UserProfileResponseInterface>(fullUrl)
      .pipe(map((res) => res.profile));
  }
}
