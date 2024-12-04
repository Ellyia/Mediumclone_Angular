import {Component, inject, input, OnInit, output} from '@angular/core';

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
  initialValues = input.required<ArticleInputInterface>();
  isSubmitting = input.required<boolean | null>();
  errors = input.required<BackendErrorsInterface | null>();

  articleSubmit = output<ArticleInputInterface>();

  // @Output('articleSubmit') articleSubmitEvent =
  //   new EventEmitter<ArticleInputInterface>();

  form!: FormGroup;

  private readonly fb = inject(FormBuilder);

  ngOnInit(): void {
    this.initializeForm();
  }

  initializeForm(): void {
    this.form = this.fb.group({
      title: new FormControl<string>(
        this.initialValues().title,
        Validators.required
      ),
      description: new FormControl<string>(
        this.initialValues().description,
        Validators.required
      ),
      body: new FormControl<string>(
        this.initialValues().body,
        Validators.required
      ),
      tagList: new FormControl<string[] | string>(
        this.initialValues().tagList.join(' ')
      ),
    });
  }

  onSubmit(): void {
    this.articleSubmit.emit({
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
