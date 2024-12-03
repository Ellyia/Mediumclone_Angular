import {Component, inject, OnDestroy, OnInit, Signal} from '@angular/core';
import {
  FormBuilder,
  FormControl,
  FormGroup,
  ReactiveFormsModule,
  Validators,
} from '@angular/forms';
import {select, Store} from '@ngrx/store';
import {AsyncPipe} from '@angular/common';
import {filter, Observable, Subject, takeUntil} from 'rxjs';

import {AppStateInterface} from '../../../shared/types/appState.interface';
import {CurrentUserInterface} from '../../../shared/types/currentUser.interface';
import {currentUserSelector} from '../../../auth/store/selectors';
import {BackendErrorsInterface} from '../../../shared/types/backendErrors.interface';
import {
  isSubmittingSelector,
  validationErrorsSelector,
} from '../../store/selectors';
import {BackendErrorMsgsComponent} from '../../../shared/components/backend-error-msgs/backend-error-msgs.component';
import {updateCurrentUserAction} from '../../../auth/store/actions/update-current-user.action';
import {CurrentUserInputInterface} from '../../../shared/types/currentUserInput.interface';
import {logoutAction} from '../../../auth/store/actions/syncronous.action';
import {toSignal} from '@angular/core/rxjs-interop';

@Component({
  selector: 'settings',
  standalone: true,
  imports: [ReactiveFormsModule, BackendErrorMsgsComponent],
  templateUrl: './settings.component.html',
  styleUrl: './settings.component.scss',
})
export class SettingsComponent implements OnInit, OnDestroy {
  private readonly store = inject(Store<AppStateInterface>);
  private readonly fb = inject(FormBuilder);

  unsubscribe$: Subject<void> = new Subject();

  readonly isSubmitting: Signal<boolean> = toSignal(
    this.store.select(isSubmittingSelector),
    {requireSync: true}
  );

  readonly backendErrors: Signal<BackendErrorsInterface | null> = toSignal(
    this.store.select(validationErrorsSelector),
    {requireSync: true}
  );

  currentUser!: CurrentUserInterface;
  form!: FormGroup;

  ngOnInit(): void {
    // this.initializeValues();
    this.initializeListeners();
  }

  initializeListeners(): void {
    this.store
      .pipe(
        takeUntil(this.unsubscribe$),
        select(currentUserSelector),
        filter(Boolean)
      )
      .subscribe((currentUser: CurrentUserInterface) => {
        this.currentUser = currentUser;

        this.initializeForm();
      });
  }

  // initializeValues(): void {
  // this.isSubmitting$ = this.store.select(isSubmittingSelector);
  // this.backendErrors$ = this.store.select(validationErrorsSelector);
  // }

  initializeForm(): void {
    this.form = this.fb.group({
      image: new FormControl(this.currentUser.image),
      username: new FormControl(this.currentUser.username, Validators.required),
      bio: new FormGroup(this.currentUser.bio),
      email: new FormControl(this.currentUser.email, Validators.required),
      password: new FormControl('', Validators.required),
    });
  }

  onFormSubmit(): void {
    const currentUserInput: CurrentUserInputInterface = {
      ...this.currentUser,
      ...this.form.value,
    };

    this.store.dispatch(updateCurrentUserAction({currentUserInput}));
  }

  logout(): void {
    this.store.dispatch(logoutAction());
  }

  ngOnDestroy(): void {
    this.unsubscribe$.next();
    this.unsubscribe$.complete();
  }
}
