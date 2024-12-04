import {
  ChangeDetectionStrategy,
  Component,
  inject,
  Signal,
} from '@angular/core';
import {RouterModule} from '@angular/router';
import {CommonModule} from '@angular/common';
import {Store} from '@ngrx/store';
import {toSignal} from '@angular/core/rxjs-interop';

import {CurrentUserInterface} from '../../types/currentUser.interface';
import {AppStateInterface} from '../../types/appState.interface';
import {
  currentUserSelector,
  isAnonymousSelector,
  isLoggedInSelector,
} from '../../../auth/store/selectors';

@Component({
  selector: 'top-bar',
  standalone: true,
  changeDetection: ChangeDetectionStrategy.OnPush,
  imports: [CommonModule, RouterModule],
  templateUrl: './top-bar.component.html',
  styleUrl: './top-bar.component.scss',
})
export class TopBarComponent {
  private readonly store = inject(Store<AppStateInterface>);

  isLoggedIn: Signal<boolean | null> = toSignal(
    this.store.select(isLoggedInSelector),
    {requireSync: true}
  );
  isAnonymous: Signal<boolean> = toSignal(
    this.store.select(isAnonymousSelector),
    {requireSync: true}
  );
  currentUser: Signal<CurrentUserInterface | null> = toSignal(
    this.store.select(currentUserSelector),
    {requireSync: true}
  );
}
