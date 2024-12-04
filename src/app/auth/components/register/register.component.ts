import {Component, inject, OnInit, Signal} from '@angular/core';
import {
  FormBuilder,
  FormControl,
  FormGroup,
  Validators,
  ReactiveFormsModule,
} from '@angular/forms';
import {select, Store} from '@ngrx/store';
import {toSignal} from '@angular/core/rxjs-interop';

import {registerAction} from '../../store/actions/register.action';
import {
  isSubmittingSelector,
  validationErrorsSelector,
} from '../../store/selectors';
import {AppStateInterface} from '../../../shared/types/appState.interface';
import {RegisterRequestInterface} from '../../types/registerRequest.interface';
import {BackendErrorsInterface} from '../../../shared/types/backendErrors.interface';
import {BackendErrorMsgsComponent} from '../../../shared/components/backend-error-msgs/backend-error-msgs.component';

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

  readonly isSubmitting: Signal<boolean> = toSignal(
    this.store.pipe(select(isSubmittingSelector)),
    {requireSync: true}
  );

  readonly backendErrors: Signal<BackendErrorsInterface | null> = toSignal(
    this.store.pipe(select(validationErrorsSelector)),
    {requireSync: true}
  );

  ngOnInit(): void {
    this.initializeForm();
  }

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
