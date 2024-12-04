import {
  ChangeDetectionStrategy,
  Component,
  computed,
  input,
} from '@angular/core';

import {BackendErrorsInterface} from '../../types/backendErrors.interface';

@Component({
  selector: 'backend-error-msgs',
  standalone: true,
  imports: [],
  changeDetection: ChangeDetectionStrategy.OnPush,
  templateUrl: './backend-error-msgs.component.html',
  styleUrl: './backend-error-msgs.component.scss',
})
export class BackendErrorMsgsComponent {
  backendErrors = input.required<BackendErrorsInterface | null>();

  errorMsgs = computed<string[] | null>(() => {
    if (this.backendErrors())
      return Object.entries(this.backendErrors() as object).map((m) =>
        m[1].join(', ')
      );
    else return null;
  });
}
