import {Component, Input} from '@angular/core';

@Component({
  selector: 'error-message',
  standalone: true,
  imports: [],
  templateUrl: './error-message.component.html',
})
export class ErrorMessageComponent {
  @Input('errorMessage') messageProps: string = 'Something went wrong...';
}
