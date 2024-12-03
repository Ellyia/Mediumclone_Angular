import {Component, inject, OnInit} from '@angular/core';
import {RouterOutlet} from '@angular/router';
import {TopBarComponent} from './shared/components/top-bar/top-bar.component';
import {AppStateInterface} from './shared/types/appState.interface';
import {Store} from '@ngrx/store';
import {getCurrentUserAction} from './auth/store/actions/get-current-user.actions';

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [RouterOutlet, TopBarComponent],
  templateUrl: './app.component.html',
  styleUrl: './app.component.scss',
})
export class AppComponent implements OnInit {
  private readonly store = inject(Store<AppStateInterface>);

  ngOnInit(): void {
    this.store.dispatch(getCurrentUserAction());
  }
}
