import {Component, Input} from '@angular/core';

@Component({
  selector: 'pagination',
  standalone: true,
  imports: [],
  templateUrl: './pagination.component.html',
  styleUrl: './pagination.component.scss',
})
export class PaginationComponent {
  @Input('articlesCount') articlesCountProps!: number;
  @Input('limit') limitOfArticlesProps!: number;
  @Input('url') baseUrlProps!: string;
  @Input('currentPage') currentPageProps!: number;
}
