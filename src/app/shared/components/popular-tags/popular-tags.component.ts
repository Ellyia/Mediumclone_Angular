import {Component, inject, OnInit} from '@angular/core';
import {AsyncPipe} from '@angular/common';
import {ActivatedRoute, Router, RouterModule} from '@angular/router';
import {Store} from '@ngrx/store';
import {Observable} from 'rxjs';

import {AppStateInterface} from '../../types/appState.interface';
import {ErrorMessageComponent} from '../error-messages/error-message.component';
import {LoadingComponent} from '../loadind/loading.component';
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
  imports: [AsyncPipe, RouterModule, ErrorMessageComponent, LoadingComponent],
  templateUrl: './popular-tags.component.html',
  styleUrl: './popular-tags.component.scss',
})
export class PopularTagsComponent implements OnInit {
  private readonly store = inject(Store<AppStateInterface>);

  isLoading$!: Observable<boolean>;
  error$!: Observable<string | null>;
  popularTags$!: Observable<PopularTagType[] | null>;

  ngOnInit(): void {
    this.fetchData();
    this.initialiseValue();
  }

  fetchData(): void {
    this.store.dispatch(getPopularTagsAction({url: '/tags'}));
  }

  initialiseValue(): void {
    this.isLoading$ = this.store.select(isLoadingPopularTagsSelector);
    this.error$ = this.store.select(errorPopularTagsSelector);
    this.popularTags$ = this.store.select(popularTagsDataSelector);
  }
}
