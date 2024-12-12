import {
  ChangeDetectionStrategy,
  Component,
  inject,
  input,
  Signal,
} from '@angular/core';
import {Store} from '@ngrx/store';
import {RouterModule} from '@angular/router';
import {toSignal} from '@angular/core/rxjs-interop';

import {AppStateInterface} from '../../types/appState.interface';
import {isLoggedInSelector} from '../../../auth/store/selectors';

@Component({
  selector: 'feed-toggler',
  standalone: true,
  changeDetection: ChangeDetectionStrategy.OnPush,
  imports: [RouterModule],
  templateUrl: './feed-toggler.component.html',
  styleUrl: './feed-toggler.component.scss',
})
export class FeedTogglerComponent {
  tagName = input<string | null>();

  private readonly store = inject(Store<AppStateInterface>);

  isLoggedIn: Signal<boolean | null> = toSignal(
    this.store.select(isLoggedInSelector),
    {requireSync: true}
  );
}
