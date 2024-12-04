import {ChangeDetectionStrategy, Component, input} from '@angular/core';

@Component({
  selector: 'error-message',
  standalone: true,
  imports: [],
  changeDetection: ChangeDetectionStrategy.OnPush,
  templateUrl: './error-message.component.html',
})
export class ErrorMessageComponent {
  errorMessage = input<string>('Something went wrong...');
}
