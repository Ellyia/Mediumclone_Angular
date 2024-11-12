import {inject, Injectable} from '@angular/core';
import {map, Observable} from 'rxjs';
import {HttpClient} from '@angular/common/http';

import {RegisterRequestInterface} from '../types/registerRequest.interface';
import {AuthResponseInterface} from '../types/authResponse.interface';
import {CurrentUserInterface} from '../../shared/types/currentUser.interface';
import {environment} from '../../../environments/environment';
import {LoginRequestInterface} from '../types/loginRequest.interface';

@Injectable({
  providedIn: 'root',
})
export class AuthService {
  private readonly httpClient = inject(HttpClient);

  getUser(response: AuthResponseInterface): CurrentUserInterface {
    return response.user;
  }

  register(data: RegisterRequestInterface): Observable<CurrentUserInterface> {
    const url = environment.apiUrl + '/users';

    return this.httpClient
      .post<AuthResponseInterface>(url, data)
      .pipe(map(this.getUser)); // or
    // .pipe(map(({user}: AuthResponseInterface) => user)); // (response: AuthResponseInterface) => response.user)
  }

  login(data: LoginRequestInterface): Observable<CurrentUserInterface> {
    const url = environment.apiUrl + '/users/login';

    return this.httpClient
      .post<AuthResponseInterface>(url, data)
      .pipe(map(this.getUser));
  }

  getCurrentUser(): Observable<CurrentUserInterface> {
    const url = environment.apiUrl + '/user';

    return this.httpClient
      .get<AuthResponseInterface>(url)
      .pipe(map(this.getUser));
  }
}
