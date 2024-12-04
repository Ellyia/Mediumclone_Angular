import {ChangeDetectionStrategy, Component, input} from '@angular/core';

import {PopularTagType} from '../../types/popularTag.type';

@Component({
  selector: 'tag-list',
  standalone: true,
  imports: [],
  changeDetection: ChangeDetectionStrategy.OnPush,
  templateUrl: './tag-list.component.html',
  styleUrl: './tag-list.component.scss',
})
export class TagListComponent {
  tags = input.required<PopularTagType[]>();
}
