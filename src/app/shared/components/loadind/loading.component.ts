import {ChangeDetectionStrategy, Component} from '@angular/core';

@Component({
  selector: 'loading',
  standalone: true,
  imports: [],
  changeDetection: ChangeDetectionStrategy.OnPush,
  template: '<div> Loading ... </div>',
})
export class LoadingComponent {}
