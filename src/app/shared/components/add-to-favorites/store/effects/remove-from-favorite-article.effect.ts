import {inject, Injectable} from '@angular/core';
import {Actions, createEffect, ofType} from '@ngrx/effects';
import {catchError, map, switchMap} from 'rxjs/operators';
import {of} from 'rxjs';
import {HttpErrorResponse} from '@angular/common/http';

import {AddToFavoriteService} from '../../services/add-to-favorite.service';
import {
  removeFromFavoriteArticleAction,
  removeFromFavoriteArticleFailureAction,
  removeFromFavoriteArticleSuccessAction,
} from '../actions/remove-from-favorite-article.action';

@Injectable()
export class RemoveFromFavoriteArticleEffects {
  private actions$ = inject(Actions);
  private addToFavoriteService = inject(AddToFavoriteService);

  removeFromFavoriteArticle$ = createEffect(() =>
    this.actions$.pipe(
      ofType(removeFromFavoriteArticleAction),
      switchMap(({slug}) => {
        return this.addToFavoriteService.deleteFromFavourite(slug).pipe(
          map((article) => {
            return removeFromFavoriteArticleSuccessAction({article});
          }),
          catchError((errorResponse: HttpErrorResponse) => {
            return of(
              removeFromFavoriteArticleFailureAction({
                error: errorResponse.error.errors,
              })
            );
          })
        );
      })
    )
  );
}
