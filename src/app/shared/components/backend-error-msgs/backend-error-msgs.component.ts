import {Component, Input, OnInit} from '@angular/core';
import {BackendErrorsInterface} from '../../types/backendErrors.interface';
import {NgFor} from '@angular/common';

@Component({
  selector: 'backend-error-msgs',
  standalone: true,
  imports: [NgFor],
  templateUrl: './backend-error-msgs.component.html',
  styleUrl: './backend-error-msgs.component.scss',
})
export class BackendErrorMsgsComponent implements OnInit {
  @Input('backendErrors') backendErrorsProps!: BackendErrorsInterface | null;

  errorMsgs!: string[];

  ngOnInit() {
    if (this.backendErrorsProps)
      this.errorMsgs = Object.entries(this.backendErrorsProps).map((m) =>
        m[1].join(', ')
      );
  }
}
