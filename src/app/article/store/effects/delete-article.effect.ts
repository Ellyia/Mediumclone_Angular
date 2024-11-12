import {inject, Injectable} from '@angular/core';
import {Actions, createEffect, ofType} from '@ngrx/effects';
import {catchError, map, switchMap, tap} from 'rxjs/operators';
import {of} from 'rxjs';
import {HttpErrorResponse} from '@angular/common/http';

import {ArticleChangesService} from '../../services/article-changes.service';
import {
  deleteArticleAction,
  deleteArticleFailureAction,
  deleteArticleSuccessAction,
} from '../actions/delete-article.action';
import {Router} from '@angular/router';

@Injectable()
export class DeleteArticleEffects {
  private actions$ = inject(Actions);
  private articleChangesService = inject(ArticleChangesService);
  private router = inject(Router);

  deleteArticle$ = createEffect(() =>
    this.actions$.pipe(
      ofType(deleteArticleAction),
      switchMap(({slug}) => {
        return this.articleChangesService.deleteArticle(slug).pipe(
          map(() => {
            return deleteArticleSuccessAction();
          }),
          catchError((errorResponse: HttpErrorResponse) => {
            return of(
              deleteArticleFailureAction({error: errorResponse.error.errors})
            );
          })
        );
      })
    )
  );

  afterDeleteArticle$ = createEffect(
    () =>
      this.actions$.pipe(
        ofType(deleteArticleSuccessAction),
        tap(() => {
          this.router.navigate(['/']);
        }) // we don't return action in tap, that's why we need 'dispatch: false'
      ),
    {dispatch: false}
  );
}
