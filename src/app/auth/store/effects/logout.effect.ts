import {inject, Injectable} from '@angular/core';
import {Actions, createEffect, ofType} from '@ngrx/effects';
import {catchError, map, switchMap, tap} from 'rxjs/operators';
import {of} from 'rxjs';
import {Router} from '@angular/router';
import {HttpErrorResponse} from '@angular/common/http';

import {AuthService} from '../../services/auth.service';
import {CurrentUserInterface} from '../../../shared/types/currentUser.interface';
import {PersistanceServise} from '../../../shared/services/persistance.service';
import {
  loginAction,
  loginFailureAction,
  loginSuccessAction,
} from '../actions/login.action';
import {logoutAction} from '../actions/syncronous.action';

@Injectable()
export class LogoutEffects {
  private actions$ = inject(Actions);
  private presistanceServise = inject(PersistanceServise);
  private readonly router = inject(Router);

  logout$ = createEffect(
    () =>
      this.actions$.pipe(
        ofType(logoutAction),
        tap(() => {
          this.presistanceServise.set('accessToken', '');
          this.router.navigateByUrl('/');
        })
      ),
    {dispatch: false}
  );
}
