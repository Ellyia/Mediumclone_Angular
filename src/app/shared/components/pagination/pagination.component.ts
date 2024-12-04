import {
  ChangeDetectionStrategy,
  Component,
  computed,
  inject,
  input,
} from '@angular/core';
import {UtilsService} from '../../services/utils.service';
import {RouterLink} from '@angular/router';
import {CommonModule} from '@angular/common';

@Component({
  selector: 'pagination',
  standalone: true,
  changeDetection: ChangeDetectionStrategy.OnPush,
  imports: [CommonModule, RouterLink],
  templateUrl: './pagination.component.html',
  styleUrl: './pagination.component.scss',
})
export class PaginationComponent {
  articlesCount = input.required<number>();
  limit = input.required<number>();
  url = input.required<string>();
  currentPage = input.required<number>();

  private readonly utilsService = inject(UtilsService);

  pagesCount = computed(() => {
    return Math.ceil(this.articlesCount() / this.limit());
  });

  pages = computed(() => {
    return this.utilsService.range(1, this.pagesCount());
  });
}
