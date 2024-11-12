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
import {
  FormBuilder,
  FormControl,
  FormGroup,
  ReactiveFormsModule,
  Validators,
} from '@angular/forms';
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
  @Input('isSubmitting') isSubmittingProps!: boolean | null;
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
      title: new FormControl<string>(
        this.initialValuesProps.title,
        Validators.required
      ),
      description: new FormControl<string>(
        this.initialValuesProps.description,
        Validators.required
      ),
      body: new FormControl<string>(
        this.initialValuesProps.body,
        Validators.required
      ),
      tagList: new FormControl<string[]>(this.initialValuesProps.tagList),
      // tagList: this.initialValuesProps.tagList.join(' '),
    });
    // console.log(this.form.value.tagList);
  }

  onSubmit(): void {
    this.articleSubmitEvent.emit({
      title: this.form.value.title,
      description: this.form.value.description,
      body: this.form.value.body,
      tagList:
        this.form.value.tagList.length > 0
          ? [...this.form.value.tagList.replace(/,/g, '').split(' ')]
          : [],
    });
  }
}
