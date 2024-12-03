import {Component, input} from '@angular/core';

import {PopularTagType} from '../../types/popularTag.type';

@Component({
  selector: 'tag-list',
  standalone: true,
  imports: [],
  templateUrl: './tag-list.component.html',
  styleUrl: './tag-list.component.scss',
})
export class TagListComponent {
  // @Input('tags') tagsProps!: PopularTagType[];
  tags = input.required<PopularTagType[]>();
}
