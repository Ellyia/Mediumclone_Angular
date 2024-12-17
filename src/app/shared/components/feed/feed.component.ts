import {
  ChangeDetectionStrategy,
  Component,
  computed,
  DestroyRef,
  effect,
  inject,
  input,
  signal,
  Signal,
} from '@angular/core';
import {CommonModule} from '@angular/common';
import {ActivatedRoute, Router, RouterModule} from '@angular/router';
import {Store} from '@ngrx/store';
import queryString from 'query-string';
import {toSignal} from '@angular/core/rxjs-interop';

import {AppStateInterface} from '../../types/appState.interface';
import {getFeedAction} from './store/actions/get-feed.action';
import {
  errorFeedSelector,
  feedDataSelector,
  isLoadingFeedSelector,
} from './store/selectors';
import {GetFeedResponseInterface} from './types/getFeedResponse.interface';
import {ErrorMessageComponent} from '../error-messages/error-message.component';
import {LoadingComponent} from '../loadind/loading.component';
import {environment} from '../../../../environments/environment';
import {PaginationComponent} from '../pagination/pagination.component';
import {TagListComponent} from '../tag-list/tag-list.component';
import {AddToFavoritesComponent} from '../add-to-favorites/add-to-favorites.component';

@Component({
  selector: 'feed',
  standalone: true,
  changeDetection: ChangeDetectionStrategy.OnPush,
  imports: [
    CommonModule,
    RouterModule,
    ErrorMessageComponent,
    LoadingComponent,
    PaginationComponent,
    TagListComponent,
    AddToFavoritesComponent,
  ],
  templateUrl: './feed.component.html',
  styleUrl: './feed.component.scss',
})
export class FeedComponent {
  apiUrl = input.required<string>();
  private readonly store = inject(Store<AppStateInterface>);
  private readonly router = inject(Router);
  private readonly route = inject(ActivatedRoute);

  destroyRef = inject(DestroyRef);

  baseUrl = signal(this.router.url.split('?')[0]);

  isLoading: Signal<boolean> = toSignal(
    this.store.select(isLoadingFeedSelector),
    {requireSync: true}
  );
  error: Signal<string | null> = toSignal(
    this.store.select(errorFeedSelector),
    {requireSync: true}
  );
  feed: Signal<GetFeedResponseInterface | null> = toSignal(
    this.store.select(feedDataSelector),
    {requireSync: true}
  );

  limitOfArticles = environment.limitOfArticles;

  queryParams = toSignal(this.route.queryParams);

  currentParamsPage = computed(() => {
    return Number(this.queryParams()?.['page'] || '1');
  });

  offset = computed(() => {
    return (
      this.currentParamsPage() * this.limitOfArticles - this.limitOfArticles
    );
  });

  apiUrlWithParams = computed(() => {
    const parsedUrl = queryString.parseUrl(this.apiUrl());

    const stringifiedParams = queryString.stringify({
      limit: this.limitOfArticles,
      offset: this.offset(),
      ...parsedUrl.query,
    });

    return `${parsedUrl.url}?${stringifiedParams}`;
  });

  constructor() {
    effect(
      () => {
        this.store.dispatch(getFeedAction({url: this.apiUrlWithParams()}));
      },
      {
        allowSignalWrites: true,
      }
    );
  }
}
