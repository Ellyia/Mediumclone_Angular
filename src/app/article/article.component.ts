import {Component, inject, OnInit} from '@angular/core';
import {CommonModule} from '@angular/common';
import {ActivatedRoute, Router, RouterModule} from '@angular/router';
import {Store} from '@ngrx/store';
import {combineLatest, map, Observable} from 'rxjs';

import {getArticleAction} from './store/actions/get-article.action';
import {LoadingComponent} from '../shared/components/loadind/loading.component';
import {ErrorMessageComponent} from '../shared/components/error-messages/error-message.component';
import {TagListComponent} from '../shared/components/tag-list/tag-list.component';
import {AppStateInterface} from '../shared/types/appState.interface';
import {
  articleDataSelector,
  errorArticleSelector,
  isLoadingArticleSelector,
} from './store/selectors';
import {ArticleInterface} from '../shared/types/article.interfase';
import {currentUserSelector} from '../auth/store/selectors';
import {CurrentUserInterface} from '../shared/types/currentUser.interface';
import {deleteArticleAction} from './store/actions/delete-article.action';

@Component({
  selector: 'article',
  standalone: true,
  imports: [
    CommonModule,
    RouterModule,
    LoadingComponent,
    ErrorMessageComponent,
    TagListComponent,
  ],
  templateUrl: './article.component.html',
  styleUrl: './article.component.scss',
})
export class ArticleComponent implements OnInit {
  private readonly store = inject(Store<AppStateInterface>);
  private readonly router = inject(Router);
  private readonly route = inject(ActivatedRoute);

  isLoading$!: Observable<boolean>;
  error$!: Observable<string | null>;
  article$!: Observable<ArticleInterface | null>;
  slug!: string;
  isAuthor$!: Observable<boolean>;

  ngOnInit(): void {
    this.initialiseValues();
    this.fetchArticle();
  }

  fetchArticle(): void {
    this.store.dispatch(getArticleAction({slug: this.slug}));
  }

  initialiseValues(): void {
    this.slug = this.route.snapshot.paramMap.get('slug') || '';
    this.isLoading$ = this.store.select(isLoadingArticleSelector);
    this.error$ = this.store.select(errorArticleSelector);
    this.article$ = this.store.select(articleDataSelector);

    this.isAuthor$ = combineLatest([
      this.store.select(articleDataSelector),
      this.store.select(currentUserSelector),
    ]).pipe(
      map(
        ([article, user]: [
          ArticleInterface | null,
          CurrentUserInterface | null
        ]) => {
          if (!article || !user) return false;
          return article.author.username === user.username;
        }
      )
    );
  }

  deleteArticle(): void {
    this.store.dispatch(deleteArticleAction({slug: this.slug}));
  }
}
