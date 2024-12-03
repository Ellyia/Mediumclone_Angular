import {
  Component,
  inject,
  Input,
  OnChanges,
  OnDestroy,
  OnInit,
  Signal,
  SimpleChanges,
} from '@angular/core';
import {CommonModule} from '@angular/common';
import {ActivatedRoute, Params, Router, RouterModule} from '@angular/router';
import {Store} from '@ngrx/store';
import {Observable, Subscription} from 'rxjs';
import queryString from 'query-string';
import {takeUntilDestroyed, toSignal} from '@angular/core/rxjs-interop';

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
export class FeedComponent implements OnInit, OnChanges {
  @Input('apiUrl') apiUrlProps!: string;
  private readonly store = inject(Store<AppStateInterface>);
  private readonly router = inject(Router);
  private readonly route = inject(ActivatedRoute);

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

  baseUrl!: string;
  limitOfArticles = environment.limitOfArticles;
  currentParamsPage!: number;

  ngOnInit(): void {
    this.initialiseValue();
    this.initializeListeners();
  }

  ngOnChanges(changes: SimpleChanges): void {
    console.log(changes['apiUrlProps'].currentValue);

    const isApiUrlChanged =
      !changes['apiUrlProps'].firstChange &&
      changes['apiUrlProps'].currentValue !==
        changes['apiUrlProps'].previousValue;

    if (isApiUrlChanged) this.fetchFeed(); // without this angular won't upload info for new tag
  }

  initializeListeners(): void {
    this.route.queryParams.subscribe((params: Params) => {
      this.currentParamsPage = Number(params['page'] || '1');
      this.fetchFeed();
    });
  }

  fetchFeed(): void {
    const offset =
      this.currentParamsPage * this.limitOfArticles - this.limitOfArticles;

    const parsedUrl = queryString.parseUrl(this.apiUrlProps);

    const stringifiedParams = queryString.stringify({
      limit: this.limitOfArticles,
      offset,
      ...parsedUrl.query,
    });
    const apiUrlWithParams = `${parsedUrl.url}?${stringifiedParams}`;

    console.log('feed:', apiUrlWithParams, 'urlProps:', this.apiUrlProps);

    this.store.dispatch(getFeedAction({url: apiUrlWithParams}));
  }

  initialiseValue(): void {
    // this.isLoading$ = this.store.select(isLoadingFeedSelector);
    // this.error$ = this.store.select(errorFeedSelector);
    // this.feed$ = this.store.select(feedDataSelector);
    this.baseUrl = this.router.url.split('?')[0];
  }
}
