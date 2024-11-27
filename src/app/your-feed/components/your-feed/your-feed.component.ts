import {Component} from '@angular/core';
import {FeedComponent} from '../../../shared/components/feed/feed.component';
import {BannerComponent} from '../../../shared/components/banner/banner.component';
import {FeedTogglerComponent} from '../../../shared/components/feed-toggler/feed-toggler.component';
import {PopularTagsComponent} from '../../../shared/components/popular-tags/popular-tags.component';

@Component({
  selector: 'your-feed',
  standalone: true,
  imports: [
    FeedComponent,
    BannerComponent,
    FeedTogglerComponent,
    PopularTagsComponent,
  ],
  templateUrl: './your-feed.component.html',
  styleUrl: './your-feed.component.scss',
})
export class YourFeedComponent {
  apiUrl = '/articles/feed'; // needs to follow some user
}
