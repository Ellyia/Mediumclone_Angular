import {inject, Injectable} from '@angular/core';
import {Actions, createEffect, ofType} from '@ngrx/effects';
import {catchError, map, switchMap, tap} from 'rxjs/operators';
import {of} from 'rxjs';
import {HttpErrorResponse} from '@angular/common/http';
import {Router} from '@angular/router';

import {CreateArticleService} from '../../services/create-article.service';
import {
  createArticleAction,
  createArticleFailureAction,
  createArticleSuccessAction,
} from '../actions/create-article.action';
import {ArticleInterface} from '../../../shared/types/article.interfase';

@Injectable()
export class CreateArticleEffects {
  private actions$ = inject(Actions);
  private createArticleService = inject(CreateArticleService);
  private router = inject(Router);

  createArticle$ = createEffect(() =>
    this.actions$.pipe(
      ofType(createArticleAction),
      switchMap(({articleInput}) => {
        return this.createArticleService.createArticle(articleInput).pipe(
          map((article: ArticleInterface) => {
            return createArticleSuccessAction({article});
          }),
          catchError((errorResponse: HttpErrorResponse) => {
            return of(
              createArticleFailureAction({errors: errorResponse.error.errors})
            );
          })
        );
      })
    )
  );

  afterCreateArticle$ = createEffect(
    () =>
      this.actions$.pipe(
        ofType(createArticleSuccessAction),
        tap(({article}) => {
          this.router.navigate(['/articles', article.slug]);
        }) // we don't return action in tap, that's why we need 'dispatch: false'
      ),
    {dispatch: false}
  );
}
