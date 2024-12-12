import {inject, Injectable} from '@angular/core';
import {Actions, createEffect, ofType} from '@ngrx/effects';
import {catchError, map, switchMap} from 'rxjs/operators';
import {of} from 'rxjs';
import {HttpErrorResponse} from '@angular/common/http';

import {AddToFavoriteService} from '../../services/add-to-favorite.service';
import {
  addToFavoriteArticleAction,
  addToFavoriteArticleFailureAction,
  addToFavoriteArticleSuccessAction,
} from '../actions/add-to-favorite-article.action';

@Injectable()
export class AddToFavoriteArticleEffects {
  private actions$ = inject(Actions);
  private addToFavoriteService = inject(AddToFavoriteService);

  addToFavoriteArticle$ = createEffect(() =>
    this.actions$.pipe(
      ofType(addToFavoriteArticleAction),
      switchMap(({isFavorited, slug}) => {
        const article$ = isFavorited
          ? this.addToFavoriteService.addToFavourite(slug)
          : this.addToFavoriteService.deleteFromFavourite(slug);

        return article$.pipe(
          map((article) => {
            return addToFavoriteArticleSuccessAction({article});
          }),
          catchError((errorResponse: HttpErrorResponse) => {
            return of(
              addToFavoriteArticleFailureAction({
                error: errorResponse.error.errors,
              })
            );
          })
        );
      })
    )
  );
}
