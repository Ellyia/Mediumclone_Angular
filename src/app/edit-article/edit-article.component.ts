import {Component, inject, Signal} from '@angular/core';
import {select, Store} from '@ngrx/store';
import {filter, map, Observable} from 'rxjs';
import {AsyncPipe} from '@angular/common';
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
import {ArticleInterface} from '../shared/types/article.interfase';
import {ActivatedRoute} from '@angular/router';
import {getArticleAction} from './store/actions/get-article.action';
import {LoadingComponent} from '../shared/components/loadind/loading.component';
import {updateArticleAction} from './store/actions/edit-article.action';

@Component({
  selector: 'edit-article',
  standalone: true,
  imports: [ArticleFormComponent, AsyncPipe, LoadingComponent],
  templateUrl: './edit-article.component.html',
  styleUrl: './edit-article.component.scss',
})
export class EditArticleComponent {
  private readonly store = inject(Store<AppStateInterface>);
  private readonly route = inject(ActivatedRoute);

  initialValues$!: Observable<ArticleInputInterface>; // can be null, but...

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

    this.initialValues$ = this.store.pipe(
      select(articleSelector),
      filter(Boolean), // can be null, but... I will wait for result with filter, when res will be not null/undefined
      map((article: ArticleInterface) => {
        return {
          title: article.title,
          description: article.description,
          body: article.body,
          tagList: article.tagList,
        };
      })
    );
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
