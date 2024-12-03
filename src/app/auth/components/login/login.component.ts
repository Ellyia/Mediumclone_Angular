import {Component, inject, OnInit, Signal} from '@angular/core';
import {
  FormBuilder,
  FormControl,
  FormGroup,
  ReactiveFormsModule,
} from '@angular/forms';
import {toSignal} from '@angular/core/rxjs-interop';
import {select, Store} from '@ngrx/store';
// import {CommonModule} from '@angular/common';

import {BackendErrorsInterface} from '../../../shared/types/backendErrors.interface';
import {
  isSubmittingSelector,
  validationErrorsSelector,
} from '../../store/selectors';
import {AppStateInterface} from '../../../shared/types/appState.interface';
import {BackendErrorMsgsComponent} from '../../../shared/components/backend-error-msgs/backend-error-msgs.component';
import {LoginRequestInterface} from '../../types/loginRequest.interface';
import {loginAction} from '../../store/actions/login.action';

@Component({
  selector: 'app-login',
  standalone: true,
  imports: [ReactiveFormsModule, BackendErrorMsgsComponent],
  providers: [],
  templateUrl: './login.component.html',
  styleUrl: './login.component.scss',
})
export class LoginComponent implements OnInit {
  private readonly store = inject(Store<AppStateInterface>);
  private readonly fb = inject(FormBuilder);

  formLog!: FormGroup;

  // isSubmitting$!: Observable<boolean>;
  // backendErrors$!: Observable<BackendErrorsInterface | null>;

  isSubmitting: Signal<boolean> = toSignal(
    this.store.pipe(select(isSubmittingSelector)),
    {requireSync: true}
  );

  backendErrors: Signal<BackendErrorsInterface | null> = toSignal(
    this.store.select(validationErrorsSelector),
    {requireSync: true}
  );

  // constructor(
  //   @Inject(Store) private store: Store<AppStateInterface>,
  //   private fb: FormBuilder
  // ) {}

  ngOnInit(): void {
    this.initializeLogForm();
    // this.initializeValues();
  }

  // initializeValues(): void {
  //   this.isSubmitting$ = this.store.pipe(select(isSubmittingSelector));
  //   this.backendErrors$ = this.store.pipe(select(validationErrorsSelector));
  // }

  initializeLogForm(): void {
    this.formLog = this.fb.group({
      email: new FormControl<string | null>(''),
      password: new FormControl<string | null>(''),
    }); // this.formLog.valid
  }

  onSubmit(): void {
    const requestData: LoginRequestInterface = {
      user: {
        email: this.formLog.value.email.toLowerCase(),
        password: this.formLog.value.password,
      },
    };
    this.store.dispatch(loginAction({request: requestData}));
  }
}
