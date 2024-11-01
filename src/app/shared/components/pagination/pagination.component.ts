import {Component, inject, Input, OnInit} from '@angular/core';
import {UtilsService} from '../../services/utils.service';
import {RouterLink} from '@angular/router';
import {CommonModule} from '@angular/common';

@Component({
  selector: 'pagination',
  standalone: true,
  imports: [CommonModule, RouterLink],
  templateUrl: './pagination.component.html',
  styleUrl: './pagination.component.scss',
})
export class PaginationComponent implements OnInit {
  @Input('articlesCount') articlesCountProps!: number;
  @Input('limit') limitOfArticlesProps!: number;
  @Input('url') baseUrlProps!: string;
  @Input('currentPage') currentPageProps!: number;

  private readonly utilsService = inject(UtilsService);

  pagesCount!: number;
  pages!: number[];

  ngOnInit(): void {
    this.pagesCount = Math.ceil(
      this.articlesCountProps / this.limitOfArticlesProps
    );

    this.pages = this.utilsService.range(1, this.pagesCount);
  }
}
