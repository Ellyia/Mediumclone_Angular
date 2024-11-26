import {Component, inject, OnDestroy, OnInit} from '@angular/core';
import {AsyncPipe} from '@angular/common';
import {ActivatedRoute, Params, Router, RouterModule} from '@angular/router';
import {Store} from '@ngrx/store';
import {Observable, Subscription} from 'rxjs';

import {AppStateInterface} from '../../types/appState.interface';
import {ErrorMessageComponent} from '../error-messages/error-message.component';
import {LoadingComponent} from '../loadind/loading.component';
import {environment} from '../../../../environments/environment';
import {PaginationComponent} from '../pagination/pagination.component';
import {TagListComponent} from '../tag-list/tag-list.component';
import {getPopularTagsAction} from './store/actions/get-popular-tags.action';
import {
  errorPopularTagsSelector,
  isLoadingPopularTagsSelector,
  popularTagsDataSelector,
} from './store/selectors';
import {PopularTagType} from '../../types/popularTag.type';

@Component({
  selector: 'popular-tags',
  standalone: true,
  imports: [
    AsyncPipe,
    RouterModule,
    ErrorMessageComponent,
    LoadingComponent,
    PaginationComponent,
    TagListComponent,
  ],
  templateUrl: './popular-tags.component.html',
  styleUrl: './popular-tags.component.scss',
})
export class PopularTagsComponent implements OnInit, OnDestroy {
  private readonly store = inject(Store<AppStateInterface>);
  private readonly router = inject(Router);
  private readonly route = inject(ActivatedRoute);
  isLoading$!: Observable<boolean>;
  error$!: Observable<string | null>;
  popularTags$!: Observable<PopularTagType[] | null>;
  baseUrl!: string;
  limitOfArticles = environment.limitOfArticles;
  currentParamsPage!: number;
  queryParamsSubscription!: Subscription;

  ngOnInit(): void {
    this.store.dispatch(getPopularTagsAction({url: '/tags'}));
    this.initialiseValue();
    this.initializeListeners();
  }

  initialiseValue(): void {
    this.isLoading$ = this.store.select(isLoadingPopularTagsSelector);
    this.error$ = this.store.select(errorPopularTagsSelector);
    this.popularTags$ = this.store.select(popularTagsDataSelector);
    this.baseUrl = this.router.url.split('?')[0];
  }

  initializeListeners(): void {
    this.queryParamsSubscription = this.route.queryParams.subscribe(
      (params: Params) => {
        this.currentParamsPage = Number(params['page'] || '1');
      }
    );
  }

  ngOnDestroy(): void {
    this.queryParamsSubscription?.unsubscribe();
  }
}
