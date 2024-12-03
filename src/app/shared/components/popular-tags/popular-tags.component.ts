import {Component, inject, OnInit, Signal} from '@angular/core';
import {RouterModule} from '@angular/router';
import {Store} from '@ngrx/store';
import {toSignal} from '@angular/core/rxjs-interop';

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
  imports: [RouterModule, ErrorMessageComponent, LoadingComponent],
  templateUrl: './popular-tags.component.html',
  styleUrl: './popular-tags.component.scss',
})
export class PopularTagsComponent implements OnInit {
  private readonly store = inject(Store<AppStateInterface>);

  // isLoading$!: Observable<boolean>;
  // error$!: Observable<string | null>;
  // popularTags$!: Observable<PopularTagType[] | null>;

  isLoading: Signal<boolean> = toSignal(
    this.store.select(isLoadingPopularTagsSelector),
    {requireSync: true}
  );

  popularTags: Signal<PopularTagType[] | null> = toSignal(
    this.store.select(popularTagsDataSelector),
    {requireSync: true}
  );

  error: Signal<string | null> = toSignal(
    this.store.select(errorPopularTagsSelector),
    {requireSync: true}
  );

  ngOnInit(): void {
    this.fetchData();
    // this.initialiseValue();
  }

  fetchData(): void {
    this.store.dispatch(getPopularTagsAction({url: '/tags'}));
  }

  initialiseValue(): void {
    // this.isLoading$ = this.store.select(isLoadingPopularTagsSelector);
    // this.error$ = this.store.select(errorPopularTagsSelector);
    // this.popularTags$ = this.store.select(popularTagsDataSelector);
  }
}
