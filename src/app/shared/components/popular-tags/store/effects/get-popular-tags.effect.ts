import {inject, Injectable} from '@angular/core';
import {Actions, createEffect, ofType} from '@ngrx/effects';
import {catchError, map, switchMap, tap} from 'rxjs/operators';
import {of} from 'rxjs';
import {HttpErrorResponse} from '@angular/common/http';

import {PopularTagsService} from '../../services/popular-tags.service';
import {
  getPopularTagsAction,
  getPopularTagsFailureAction,
  getPopularTagsSuccessAction,
} from '../actions/get-popular-tags.action';
import {GetPopularTagsResponseInterface} from '../../types/get-popular-tags-response.interface';
import {PopularTagType} from '../../../../types/popularTag.type';

@Injectable()
export class GetPopularTagsEffects {
  private actions$ = inject(Actions);
  private tagsService = inject(PopularTagsService);

  getTags$ = createEffect(() =>
    this.actions$.pipe(
      ofType(getPopularTagsAction),
      switchMap(({url}) => {
        return this.tagsService.getPopularTags(url).pipe(
          map((popularTags: PopularTagType[]) => {
            console.log(popularTags);

            return getPopularTagsSuccessAction({popularTags});
          }),
          catchError((errorResponse: HttpErrorResponse) => {
            return of(
              getPopularTagsFailureAction({error: errorResponse.error.errors})
            );
          })
        );
      })
    )
  );
}
