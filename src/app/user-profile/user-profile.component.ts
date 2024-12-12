import {
  Component,
  computed,
  DestroyRef,
  effect,
  inject,
  // OnInit,
  Signal,
} from '@angular/core';
import {Store} from '@ngrx/store';
import {
  ActivatedRoute,
  // Params,
  Router,
  RouterLink,
  RouterModule,
} from '@angular/router';
import {toSignal} from '@angular/core/rxjs-interop';
// import {takeUntilDestroyed} from '@angular/core/rxjs-interop';

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
    BackendErrorMsgsComponent,
    RouterLink,
    FeedComponent,
    RouterModule,
  ],
  templateUrl: './user-profile.component.html',
  styleUrl: './user-profile.component.scss',
})
export class UserProfileComponent {
  private readonly store = inject(Store<AppStateInterface>);
  private readonly route = inject(ActivatedRoute);
  private readonly router = inject(Router);

  destroyRef = inject(DestroyRef);

  isLoading: Signal<boolean> = toSignal(
    this.store.select(isLoadingProfileselector),
    {requireSync: true}
  );
  errors: Signal<BackendErrorsInterface | null> = toSignal(
    this.store.select(errorsProfileSelector),
    {requireSync: true}
  );
  userProfile: Signal<ProfileInterface | null> = toSignal(
    this.store.select(userProfileSelector),
    {requireSync: true}
  );
  currentUser: Signal<CurrentUserInterface | null> = toSignal(
    this.store.select(currentUserSelector),
    {requireSync: true}
  );

  isCurrentUserProfile: Signal<boolean> = computed(
    () => this.currentUser()?.username === this.userProfile()?.username
  );

  apiUrl!: string;
  slug!: string;

  // ngOnInit(): void {
  // this.initialiseValues();
  // this.initializeListeners();
  // }

  thisParams = toSignal(this.route.params);

  thisSlug = computed(() => {
    return this.thisParams()?.['slug'];
  });

  constructor() {
    effect(
      () => {
        const isFavorites = this.router.url.includes('favorited');

        this.apiUrl = isFavorites
          ? `/articles?favorited=${this.thisSlug()}`
          : `/articles?author=${this.thisSlug()}`;

        this.getUserProfile();
      },
      {allowSignalWrites: true}
    );
  }

  // initializeListeners(): void {
  //   this.route.params
  //     .pipe(takeUntilDestroyed(this.destroyRef))
  //     .subscribe((params: Params) => {
  //       this.slug = params['slug'];

  //       this.getApiUrl();

  //       this.getUserProfile();
  //     });
  // }

  // initialiseValues(): void {
  //   this.slug = this.route.snapshot.paramMap.get('slug') || '';
  // }

  // getApiUrl(): void {
  //   const isFavorites = this.router.url.includes('favorited');

  //   this.apiUrl = isFavorites
  //     ? `/articles?favorited=${this.slug}`
  //     : `/articles?author=${this.slug}`; // now it changes?
  // }

  getUserProfile(): void {
    this.store.dispatch(getProfileAction({slug: this.thisSlug()}));
  }
}
