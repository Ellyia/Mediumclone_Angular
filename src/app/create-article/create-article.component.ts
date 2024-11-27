import {Component, inject, Signal} from '@angular/core';
import {Store} from '@ngrx/store';

import {AppStateInterface} from '../shared/types/appState.interface';
import {createArticleAction} from './store/actions/create-article.action';
import {ArticleInputInterface} from '../shared/types/articleInput.interface';
import {ArticleFormComponent} from '../shared/components/article-form/article-form.component';
import {BackendErrorsInterface} from '../shared/types/backendErrors.interface';
import {
  isSubmittingSelector,
  validationErrorsSelector,
} from './store/selectors';
import {toSignal} from '@angular/core/rxjs-interop';

@Component({
  selector: 'create-article',
  standalone: true,
  imports: [ArticleFormComponent],
  templateUrl: './create-article.component.html',
  styleUrl: './create-article.component.scss',
})
export class CreateArticleComponent {
  private readonly store = inject(Store<AppStateInterface>);

  initialValues: ArticleInputInterface = {
    title: '',
    description: '',
    body: '',
    tagList: [],
  };

  readonly isSubmitting: Signal<boolean | null> = toSignal(
    this.store.select(isSubmittingSelector),
    {requireSync: true}
  );

  readonly validationErrors: Signal<BackendErrorsInterface | null> = toSignal(
    this.store.select(validationErrorsSelector),
    {requireSync: true}
  );

  // isSubmitting$!: Observable<boolean | null>;
  // validationErrors$!: Observable<BackendErrorsInterface | null>;

  // ngOnInit(): void {
  //   this.isSubmitting$ = this.store.select(isSubmittingSelector);
  //   this.validationErrors$ = this.store.select(validationErrorsSelector);
  // }

  onSubmit($event: ArticleInputInterface): void {
    this.store.dispatch(createArticleAction({articleInput: $event}));
  }
}
