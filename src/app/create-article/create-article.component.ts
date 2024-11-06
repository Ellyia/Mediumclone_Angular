import {Component} from '@angular/core';
import {ArticleFormComponent} from '../shared/components/article-form/article-form.component';

@Component({
  selector: 'create-article',
  standalone: true,
  imports: [ArticleFormComponent],
  templateUrl: './create-article.component.html',
  styleUrl: './create-article.component.scss',
})
export class CreateArticleComponent {
  initialValues = {
    title: 'title',
    description: 'description',
    body: 'body',
    tagList: ['dragon', 'cofee'],
  };

  onSubmit(res: any): void {
    console.log(res);
  }
}