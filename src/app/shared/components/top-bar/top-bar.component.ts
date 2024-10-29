import {Component, Inject, OnInit} from '@angular/core';
import {RouterModule} from '@angular/router';
import {Observable} from 'rxjs';
import {CurrentUserInterface} from '../../types/currentUser.interface';
import {AppStateInterface} from '../../types/appStateInterface';
import {Store} from '@ngrx/store';
import {
  currentUserSelector,
  isAnonymousSelector,
  isLoggedInSelector,
} from '../../../auth/store/selectors';
import {CommonModule} from '@angular/common';

@Component({
  selector: 'top-bar',
  standalone: true,
  imports: [CommonModule, RouterModule],
  templateUrl: './top-bar.component.html',
  styleUrl: './top-bar.component.scss',
})
export class TopBarComponent implements OnInit {
  isLoggedIn$!: Observable<boolean | null>;
  isAnonymous$!: Observable<boolean>;
  currentUser$!: Observable<CurrentUserInterface | null>;

  constructor(@Inject(Store) private store: Store<AppStateInterface>) {}

  ngOnInit(): void {
    this.isLoggedIn$ = this.store.select(isLoggedInSelector);
    this.isAnonymous$ = this.store.select(isAnonymousSelector);
    this.currentUser$ = this.store.select(currentUserSelector);
  }
}
