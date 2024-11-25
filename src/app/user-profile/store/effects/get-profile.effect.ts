import {inject, Injectable} from '@angular/core';
import {Actions, createEffect, ofType} from '@ngrx/effects';

import {UserProfileService} from '../../services/user-profile.service';
import {
  getProfileAction,
  getProfileFailureAction,
  getProfileSuccessAction,
} from '../actions/get-profile.action';
import {ProfileInterface} from '../../../shared/types/profile.interface';
import {catchError, map, of, switchMap} from 'rxjs';
import {BackendErrorsInterface} from '../../../shared/types/backendErrors.interface';

@Injectable()
export class GetProfileEffect {
  private actions$ = inject(Actions);
  private readonly getProfileService = inject(UserProfileService);

  getProfile$ = createEffect(() =>
    this.actions$.pipe(
      ofType(getProfileAction),
      switchMap(({slug}) => {
        return this.getProfileService.getProfile(slug).pipe(
          map((profile: ProfileInterface) => {
            return getProfileSuccessAction({profile});
          }),
          catchError((error: BackendErrorsInterface) =>
            of(getProfileFailureAction({error}))
          )
        );
      })
    )
  );
}
