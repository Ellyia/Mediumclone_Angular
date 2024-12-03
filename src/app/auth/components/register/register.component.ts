import {Component, inject, OnInit, Signal} from '@angular/core';
import {
  FormBuilder,
  FormControl,
  FormGroup,
  Validators,
  ReactiveFormsModule,
} from '@angular/forms';
import {select, Store} from '@ngrx/store';

import {registerAction} from '../../store/actions/register.action';
import {
  isSubmittingSelector,
  validationErrorsSelector,
} from '../../store/selectors';
import {AppStateInterface} from '../../../shared/types/appState.interface';
import {RegisterRequestInterface} from '../../types/registerRequest.interface';
import {BackendErrorsInterface} from '../../../shared/types/backendErrors.interface';
import {BackendErrorMsgsComponent} from '../../../shared/components/backend-error-msgs/backend-error-msgs.component';
import {toSignal} from '@angular/core/rxjs-interop';

@Component({
  selector: 'app-register',
  standalone: true,
  imports: [ReactiveFormsModule, BackendErrorMsgsComponent],
  providers: [],
  templateUrl: './register.component.html',
  styleUrl: './register.component.scss',
})
export class RegisterComponent implements OnInit {
  private readonly store = inject(Store<AppStateInterface>);
  private readonly fb = inject(FormBuilder);

  formReg!: FormGroup;

  // isSubmitting$!: Observable<boolean>;
  // backendErrors$!: Observable<BackendErrorsInterface | null>;

  readonly isSubmitting: Signal<boolean> = toSignal(
    this.store.pipe(select(isSubmittingSelector)),
    {requireSync: true}
  );

  readonly backendErrors: Signal<BackendErrorsInterface | null> = toSignal(
    this.store.pipe(select(validationErrorsSelector)),
    {requireSync: true}
  );
  // constructor(
  //   private fb: FormBuilder,
  //   @Inject(Store) private store: Store<AppStateInterface>
  // ) {}

  ngOnInit(): void {
    this.initializeForm();
    // this.initializeValues();
  }

  // initializeValues(): void {
  //   this.isSubmitting$ = this.store.pipe(select(isSubmittingSelector));
  //   this.backendErrors$ = this.store.pipe(select(validationErrorsSelector));
  // }

  initializeForm(): void {
    this.formReg = this.fb.group({
      username: new FormControl<string | null>('', Validators.required),
      email: new FormControl<string | null>('', Validators.required),
      password: new FormControl<string | null>('', Validators.required),
    });
  }

  onSubmit(): void {
    const requestData: RegisterRequestInterface = {
      user: this.formReg.value,
    };
    this.store.dispatch(registerAction({request: requestData}));
  }
}
