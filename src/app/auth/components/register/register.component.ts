import {CommonModule} from '@angular/common';
import {Component, OnInit} from '@angular/core';
import {
  FormBuilder,
  FormControl,
  FormGroup,
  Validators,
  ReactiveFormsModule,
} from '@angular/forms';
import {select, Store} from '@ngrx/store';
import {registerAction} from '../../store/actions/register.action';
import {Observable} from 'rxjs';
import {isSubmittingSelector} from '../../store/selectors';
import {AppStateInterface} from '../../../shared/types/appStateInterface';
import {AuthService} from '../../services/auth.service';
import {RegisterRequestInterface} from '../../types/registerRequest.interface';

@Component({
  selector: 'app-register',
  standalone: true,
  imports: [CommonModule, ReactiveFormsModule],
  providers: [AuthService],
  templateUrl: './register.component.html',
  styleUrl: './register.component.scss',
})
export class RegisterComponent implements OnInit {
  formReg!: FormGroup;
  isSubmitting$!: Observable<boolean>;

  constructor(
    private fb: FormBuilder,
    private store: Store<AppStateInterface>
  ) {}

  ngOnInit(): void {
    this.initializeForm();
    this.initializeValues();
  }

  initializeValues(): void {
    this.isSubmitting$ = this.store.pipe(select(isSubmittingSelector));
  }

  initializeForm(): void {
    this.formReg = this.fb.group({
      username: new FormControl<string | null>('', Validators.required),
      email: new FormControl<string | null>('', Validators.required),
      password: new FormControl<string | null>('', Validators.required),
    });
    console.log(this.formReg.valid);
  }

  onSubmit(): void {
    console.log(this.formReg.value);
    const requestData: RegisterRequestInterface = {
      user: this.formReg.value,
    };
    this.store.dispatch(registerAction({request: requestData}));
    // this.authServise
    //   .register(this.formReg.value)
    //   .subscribe((currentUser: CurrentUserInterface) =>
    //     console.log(currentUser)
    //   );
  }
}
