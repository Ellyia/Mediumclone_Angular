import {inject, Injectable} from '@angular/core';
import {Actions, createEffect, ofType} from '@ngrx/effects';
import {catchError, map, switchMap} from 'rxjs/operators';
import {of} from 'rxjs';
import {HttpErrorResponse} from '@angular/common/http';

import {
  getFeedAction,
  getFeedFailureAction,
  getFeedSuccessAction,
} from '../actions/get-feed.action';
import {FeedService} from '../../services/feed.service';
import {GetFeedResponseInterface} from '../../types/getFeedResponse.interface';

@Injectable()
export class GetFeedEffects {
  private actions$ = inject(Actions);
  private feedService = inject(FeedService);

  getFeed$ = createEffect(() =>
    this.actions$.pipe(
      ofType(getFeedAction),
      switchMap(({url}) => {
        return this.feedService.getFeed(url).pipe(
          map((feed: GetFeedResponseInterface) => {
            return getFeedSuccessAction({feed});
          }),
          catchError((errorResponse: HttpErrorResponse) => {
            return of(
              getFeedFailureAction({error: errorResponse.error.errors})
            );
          })
        );
      })
    )
  );
}
