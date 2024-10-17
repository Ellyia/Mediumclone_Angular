import {Component, inject, Input, OnInit} from '@angular/core';
import {CommonModule} from '@angular/common';
import {Router, RouterModule} from '@angular/router';
import {Store} from '@ngrx/store';
import {Observable} from 'rxjs';

import {AppStateInterface} from '../../types/appStateInterface';
import {getFeedAction} from './store/actions/get-feed.action';
import {
  errorFeedSelector,
  feedDataSelector,
  isLoadingFeedSelector,
} from './store/selectors';
import {GetFeedResponseInterface} from './types/get-feed-response.interface';
import {ErrorMessageComponent} from '../error-messages/error-message.component';
import {LoadingComponent} from '../loadind/loading.component';
import {environment} from '../../../../environments/environment';
import {PaginationComponent} from '../pagination/pagination.component';

@Component({
  selector: 'feed',
  standalone: true,
  imports: [
    CommonModule,
    RouterModule,
    ErrorMessageComponent,
    LoadingComponent,
    PaginationComponent,
  ],
  templateUrl: './feed.component.html',
  styleUrl: './feed.component.scss',
})
export class FeedComponent implements OnInit {
  @Input('apiUrl') apiUrlProps!: string;
  private readonly store = inject(Store<AppStateInterface>);
  private readonly router = inject(Router);

  isLoading$!: Observable<boolean>;
  error$!: Observable<string | null>;
  feed$!: Observable<GetFeedResponseInterface | null>;

  limitOfArticles = environment.limitOfArticles;
  baseUrl = this.router.url;
  currentPage = 1;

  ngOnInit(): void {
    this.fetchData();
    this.initialiseValue();
    console.log('baseUrl', this.router.url);
  }

  fetchData(): void {
    this.store.dispatch(getFeedAction({url: this.apiUrlProps}));
  }

  initialiseValue(): void {
    this.isLoading$ = this.store.select(isLoadingFeedSelector);
    this.error$ = this.store.select(errorFeedSelector);
    this.feed$ = this.store.select(feedDataSelector);
  }
}
