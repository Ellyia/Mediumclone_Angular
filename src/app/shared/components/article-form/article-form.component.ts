import {Component, Input} from '@angular/core';

import {ArticleInputInterface} from '../../types/articleInput.interface';
import {BackendErrorsInterface} from '../../types/backendErrors.interface';

@Component({
  selector: 'article-form',
  standalone: true,
  imports: [],
  templateUrl: './article-form.component.html',
  styleUrl: './article-form.component.scss',
})
export class ArticleFormComponent {
  @Input('initialValues') initialValuesProps!: ArticleInputInterface;
  @Input('isSubmitting') isSubmittingProps!: boolean;
  @Input('errors') backendErrorsProps!: BackendErrorsInterface | null;
}
