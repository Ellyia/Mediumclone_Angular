import {Component, inject, OnInit} from '@angular/core';
import {select, Store} from '@ngrx/store';
import {combineLatest, filter, map, Observable} from 'rxjs';
import {AsyncPipe, NgIf} from '@angular/common';
import {
  ActivatedRoute,
  Params,
  Router,
  RouterLink,
  RouterModule,
} from '@angular/router';

import {AppStateInterface} from '../shared/types/appState.interface';
import {BackendErrorsInterface} from '../shared/types/backendErrors.interface';
import {ProfileInterface} from '../shared/types/profile.interface';
import {
  errorsProfileSelector,
  isLoadingProfileselector,
  userProfileSelector,
} from './store/selectors';
import {LoadingComponent} from '../shared/components/loadind/loading.component';
import {BackendErrorMsgsComponent} from '../shared/components/backend-error-msgs/backend-error-msgs.component';
import {getProfileAction} from './store/actions/get-profile.action';
import {currentUserSelector} from '../auth/store/selectors';
import {CurrentUserInterface} from '../shared/types/currentUser.interface';
import {FeedComponent} from '../shared/components/feed/feed.component';

@Component({
  selector: 'user-profile',
  standalone: true,
  imports: [
    LoadingComponent,
    AsyncPipe,
    BackendErrorMsgsComponent,
    RouterLink,
    FeedComponent,
    NgIf,
    RouterModule,
  ],
  templateUrl: './user-profile.component.html',
  styleUrl: './user-profile.component.scss',
})
export class UserProfileComponent implements OnInit {
  private readonly store = inject(Store<AppStateInterface>);
  private readonly route = inject(ActivatedRoute);
  private readonly router = inject(Router);

  isLoading$!: Observable<boolean>;
  errors$!: Observable<BackendErrorsInterface | null>;
  userProfile$!: Observable<ProfileInterface | null>;

  isCurrentUserProfile$!: Observable<boolean>;

  apiUrl!: string;
  slug!: string;

  ngOnInit(): void {
    this.initialiseValues();
    // this.getUserProfile();
    this.initializeListeners();
  }

  initializeListeners(): void {
    this.route.params.subscribe((params: Params) => {
      this.slug = params['slug'];
      this.getUserProfile();
    });
  }

  initialiseValues(): void {
    this.isLoading$ = this.store.select(isLoadingProfileselector);
    this.userProfile$ = this.store.select(userProfileSelector);
    this.errors$ = this.store.select(errorsProfileSelector);

    this.slug = this.route.snapshot.paramMap.get('slug') || '';

    const isFavorites = this.router.url.includes('favorited');
    this.apiUrl = isFavorites
      ? `/articles?favorited=${this.slug}`
      : `/articles?author=${this.slug}`; // why it changes?

    this.isCurrentUserProfile$ = combineLatest([
      this.store.pipe(select(currentUserSelector), filter(Boolean)),
      this.store.pipe(select(userProfileSelector), filter(Boolean)),
    ]).pipe(
      map(
        ([currentUser, userProfile]: [
          CurrentUserInterface,
          ProfileInterface
        ]) => currentUser.username === userProfile.username
      )
    );
  }

  getUserProfile(): void {
    this.store.dispatch(getProfileAction({slug: this.slug}));
  }
}
