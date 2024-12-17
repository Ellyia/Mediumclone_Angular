import {Component, computed, input} from '@angular/core';

import {FeedComponent} from '../../../shared/components/feed/feed.component';
import {BannerComponent} from '../../../shared/components/banner/banner.component';
import {FeedTogglerComponent} from '../../../shared/components/feed-toggler/feed-toggler.component';
import {PopularTagsComponent} from '../../../shared/components/popular-tags/popular-tags.component';

@Component({
  selector: 'tag-feed',
  standalone: true,
  imports: [
    FeedComponent,
    BannerComponent,
    FeedTogglerComponent,
    PopularTagsComponent,
  ],
  templateUrl: './tag-feed.component.html',
  styleUrl: './tag-feed.component.scss',
})
export class TagFeedComponent {
  readonly slug = input.required<string>();

  readonly apiUrl = computed(() => {
    return `/articles?tag=${this.slug()}`;
  });
}
