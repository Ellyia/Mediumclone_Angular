import {Component, computed, inject, OnInit, Signal} from '@angular/core';
import {ActivatedRoute, RouterModule} from '@angular/router';
import {Store} from '@ngrx/store';
import {toSignal} from '@angular/core/rxjs-interop';

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
import {AddToFavoritesComponent} from '../shared/components/add-to-favorites/add-to-favorites.component';

@Component({
  selector: 'article',
  standalone: true,
  imports: [
    RouterModule,
    LoadingComponent,
    ErrorMessageComponent,
    TagListComponent,
    AddToFavoritesComponent,
  ],
  templateUrl: './article.component.html',
  styleUrl: './article.component.scss',
})
export class ArticleComponent implements OnInit {
  private readonly store = inject(Store<AppStateInterface>);
  private readonly route = inject(ActivatedRoute);

  slug!: string;

  readonly article: Signal<ArticleInterface | null> = toSignal(
    this.store.select(articleDataSelector),
    {requireSync: true}
  );

  readonly currentUser: Signal<CurrentUserInterface | null> = toSignal(
    this.store.select(currentUserSelector),
    {requireSync: true}
  );

  readonly isAuthor: Signal<boolean> = computed(() => {
    // if (!this.article() || !this.currentUser()) return false;
    return this.article()?.author.username === this.currentUser()?.username;
  });

  readonly isLoading: Signal<boolean> = toSignal(
    this.store.select(isLoadingArticleSelector),
    {requireSync: true}
  );

  readonly error: Signal<string | null> = toSignal(
    this.store.select(errorArticleSelector),
    {requireSync: true}
  );

  ngOnInit(): void {
    this.initialiseValues();
    this.fetchArticle();
  }

  fetchArticle(): void {
    this.store.dispatch(getArticleAction({slug: this.slug}));
  }

  initialiseValues(): void {
    this.slug = this.route.snapshot.paramMap.get('slug') ?? '';
  }

  deleteArticle(): void {
    this.store.dispatch(deleteArticleAction({slug: this.slug}));
  }
}
