import {
  Component,
  inject,
  Input,
  OnChanges,
  OnDestroy,
  OnInit,
  SimpleChanges,
} from '@angular/core';
import {CommonModule} from '@angular/common';
import {ActivatedRoute, Params, Router, RouterModule} from '@angular/router';
import {Store} from '@ngrx/store';
import {Observable, Subscription} from 'rxjs';
import queryString from 'query-string';

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
export class FeedComponent implements OnInit, OnDestroy, OnChanges {
  @Input('apiUrl') apiUrlProps!: string;
  private readonly store = inject(Store<AppStateInterface>);
  private readonly router = inject(Router);
  private readonly route = inject(ActivatedRoute);

  isLoading$!: Observable<boolean>;
  error$!: Observable<string | null>;
  feed$!: Observable<GetFeedResponseInterface | null>;

  baseUrl!: string;
  limitOfArticles = environment.limitOfArticles;
  currentParamsPage!: number;
  queryParamsSubscription!: Subscription;

  ngOnInit(): void {
    this.initialiseValue();
    this.initializeListeners();
  }

  ngOnChanges(changes: SimpleChanges): void {
    const isApiUrlChanged =
      !changes['apiUrlProps'].firstChange &&
      changes['apiUrlProps'].currentValue !==
        changes['apiUrlProps'].previousValue;

    if (isApiUrlChanged) this.fetchFeed(); // without this angular won't upload info for new tag
  }

  initializeListeners(): void {
    this.queryParamsSubscription = this.route.queryParams.subscribe(
      (params: Params) => {
        this.currentParamsPage = Number(params['page'] || '1');
        this.fetchFeed();
      }
    );
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

    this.store.dispatch(getFeedAction({url: apiUrlWithParams}));
  }

  initialiseValue(): void {
    this.isLoading$ = this.store.select(isLoadingFeedSelector);
    this.error$ = this.store.select(errorFeedSelector);
    this.feed$ = this.store.select(feedDataSelector);
    this.baseUrl = this.router.url.split('?')[0];
  }

  ngOnDestroy(): void {
    this.queryParamsSubscription?.unsubscribe();
  }
}
