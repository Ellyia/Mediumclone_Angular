import {Component} from '@angular/core';

import {FeedComponent} from '../../../shared/components/feed/feed.component';
import {BannerComponent} from '../../../shared/components/banner/banner.component';
import {FeedTogglerComponent} from '../../../shared/components/feed-toggler/feed-toggler.component';
import {PopularTagsComponent} from '../../../shared/components/popular-tags/popular-tags.component';
import {SearchBarComponent} from '../../../shared/components/search-bar/search-bar.component';

@Component({
  selector: 'global-feed',
  standalone: true,
  imports: [
    FeedComponent,
    BannerComponent,
    FeedTogglerComponent,
    PopularTagsComponent,
    SearchBarComponent,
  ],
  templateUrl: './global-feed.component.html',
  styleUrl: './global-feed.component.scss',
})
export class GlobalFeedComponent {
  apiUrl = '/articles';
  searchStrProp!: string;

  highlightStr(searchStr: string): void {
    this.searchStrProp = searchStr;
  }
}
