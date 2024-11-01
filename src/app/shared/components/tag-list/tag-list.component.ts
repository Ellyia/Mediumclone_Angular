import {Component, Input} from '@angular/core';
import {NgFor} from '@angular/common';

import {PopularTagType} from '../../types/popularTag.type';

@Component({
  selector: 'tag-list',
  standalone: true,
  imports: [NgFor],
  templateUrl: './tag-list.component.html',
  styleUrl: './tag-list.component.scss',
})
export class TagListComponent {
  @Input('tags') tagsProps!: PopularTagType[];
}
