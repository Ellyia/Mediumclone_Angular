import {ChangeDetectionStrategy, Component} from '@angular/core';

@Component({
  selector: 'banner',
  standalone: true,
  imports: [],
  changeDetection: ChangeDetectionStrategy.OnPush,
  templateUrl: './banner.component.html',
  styleUrl: './banner.component.scss',
})
export class BannerComponent {}
