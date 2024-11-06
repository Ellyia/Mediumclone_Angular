import {
  Component,
  EventEmitter,
  inject,
  Input,
  OnInit,
  Output,
} from '@angular/core';

import {ArticleInputInterface} from '../../types/articleInput.interface';
import {BackendErrorsInterface} from '../../types/backendErrors.interface';
import {FormBuilder, FormGroup, ReactiveFormsModule} from '@angular/forms';
import {BackendErrorMsgsComponent} from '../backend-error-msgs/backend-error-msgs.component';

@Component({
  selector: 'article-form',
  standalone: true,
  imports: [BackendErrorMsgsComponent, ReactiveFormsModule],
  templateUrl: './article-form.component.html',
  styleUrl: './article-form.component.scss',
})
export class ArticleFormComponent implements OnInit {
  @Input('initialValues') initialValuesProps!: ArticleInputInterface;
  @Input('isSubmitting') isSubmittingProps!: boolean;
  @Input('errors') backendErrorsProps!: BackendErrorsInterface | null;

  @Output('articleSubmit') articleSubmitEvent =
    new EventEmitter<ArticleInputInterface>();

  form!: FormGroup;

  private readonly fb = inject(FormBuilder);

  ngOnInit(): void {
    this.initializeForm();
  }

  initializeForm(): void {
    this.form = this.fb.group({
      title: this.initialValuesProps.title,
      description: this.initialValuesProps.description,
      body: this.initialValuesProps.body,
      tagList: this.initialValuesProps.tagList.join(' '),
    });
  }

  onSubmit(): void {
    this.articleSubmitEvent.emit(this.form.value);
  }
}
