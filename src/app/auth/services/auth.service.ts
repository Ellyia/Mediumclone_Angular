import {inject, Injectable} from '@angular/core';
import {RegisterRequestInterface} from '../types/registerRequest.interface';
import {AuthResponseInterface} from '../types/authResponse.interface';
import {CurrentUserInterface} from '../../shared/types/currentUser.interface';
import {map, Observable} from 'rxjs';
import {HttpClient} from '@angular/common/http';
import {environment} from '../../../environments/environment';

@Injectable({
  providedIn: 'root',
})
export class AuthService {
  private readonly httpClient = inject(HttpClient);

  register(data: RegisterRequestInterface): Observable<CurrentUserInterface> {
    const url = environment.apiUrl + '/users';

    return this.httpClient
      .post<AuthResponseInterface>(url, data)
      .pipe(map(({user}: AuthResponseInterface) => user)); // (response: AuthResponseInterface) => response.user)
  }
}
