import {Component, computed, inject, Signal} from '@angular/core';
import {Store} from '@ngrx/store';
import {ActivatedRoute} from '@angular/router';
import {toSignal} from '@angular/core/rxjs-interop';

import {AppStateInterface} from '../shared/types/appState.interface';
import {ArticleInputInterface} from '../shared/types/articleInput.interface';
import {ArticleFormComponent} from '../shared/components/article-form/article-form.component';
import {BackendErrorsInterface} from '../shared/types/backendErrors.interface';
import {
  articleSelector,
  isLoadingSelector,
  isSubmittingSelector,
  validationErrorsSelector,
} from './store/selectors';
import {getArticleAction} from './store/actions/get-article.action';
import {LoadingComponent} from '../shared/components/loadind/loading.component';
import {updateArticleAction} from './store/actions/edit-article.action';

@Component({
  selector: 'edit-article',
  standalone: true,
  imports: [ArticleFormComponent, LoadingComponent],
  templateUrl: './edit-article.component.html',
  styleUrl: './edit-article.component.scss',
})
export class EditArticleComponent {
  private readonly store = inject(Store<AppStateInterface>);
  private readonly route = inject(ActivatedRoute);

  initialValues: Signal<ArticleInputInterface | null> = toSignal(
    this.store.select(articleSelector),
    {requireSync: true}
  );

  initialValues$ = computed(() => {
    if (!!this.initialValues()) {
      return {
        title: this.initialValues()!.title,
        description: this.initialValues()!.description,
        body: this.initialValues()!.body,
        tagList: this.initialValues()!.tagList,
      };
    }
    return;
  });

  isLoading: Signal<boolean> = toSignal(this.store.select(isLoadingSelector), {
    requireSync: true,
  });

  isSubmitting: Signal<boolean | null> = toSignal(
    this.store.select(isSubmittingSelector),
    {requireSync: true}
  );

  validationErrors: Signal<BackendErrorsInterface | null> = toSignal(
    this.store.select(validationErrorsSelector),
    {requireSync: true}
  );

  slug!: string;

  ngOnInit(): void {
    this.initialiseValues();
    this.fetchData();
  }

  initialiseValues(): void {
    this.slug = this.route.snapshot.paramMap.get('slug') || '';
  }

  fetchData(): void {
    this.store.dispatch(getArticleAction({slug: this.slug}));
  }

  onSubmit($event: ArticleInputInterface): void {
    this.store.dispatch(
      updateArticleAction({slug: this.slug, articleInput: $event})
    );
  }
}
