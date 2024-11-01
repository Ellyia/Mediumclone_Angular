import {Component, inject, OnInit, SimpleChanges} from '@angular/core';
import {FeedComponent} from '../../../shared/components/feed/feed.component';
import {BannerComponent} from '../../../shared/components/banner/banner.component';
import {FeedTogglerComponent} from '../../../shared/components/feed-toggler/feed-toggler.component';
import {PopularTagsComponent} from '../../../shared/components/popular-tags/popular-tags.component';
import {ActivatedRoute, Params} from '@angular/router';

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
export class TagFeedComponent implements OnInit {
  apiUrl!: string;
  tagName!: string | null;

  private readonly route = inject(ActivatedRoute);

  ngOnInit() {
    // this.tagName = this.route.snapshot.paramMap.get('slug');
    // this.apiUrl = `/articles?tag=${this.tagName}`;

    this.route.params.subscribe((params: Params) => {
      console.log(params);

      this.tagName = params['slug'];
      this.apiUrl = `/articles?tag=${this.tagName}`;
    });
  }
}
