import {inject, Injectable} from '@angular/core';
import {Actions, createEffect, ofType} from '@ngrx/effects';
import {catchError, map, switchMap} from 'rxjs/operators';
import {of} from 'rxjs';
import {HttpErrorResponse} from '@angular/common/http';
import {
  getArticleAction,
  getArticleFailureAction,
  getArticleSuccessAction,
} from '../actions/get-article.action';
import {ArticleInterface} from '../../../shared/types/article.interfase';
import {ArticleService as SharedArticleService} from '../../../shared/services/article.service';

@Injectable()
export class GetArticleEffects {
  private actions$ = inject(Actions);
  private sharedArticleService = inject(SharedArticleService);

  getFeed$ = createEffect(() =>
    this.actions$.pipe(
      ofType(getArticleAction),
      switchMap(({slug}) => {
        return this.sharedArticleService.getArticle(slug).pipe(
          map((article: ArticleInterface) => {
            return getArticleSuccessAction({article});
          }),
          catchError((errorResponse: HttpErrorResponse) => {
            return of(
              getArticleFailureAction({error: errorResponse.error.errors})
            );
          })
        );
      })
    )
  );
}
