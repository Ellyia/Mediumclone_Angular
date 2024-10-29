import {Component, inject, Input, OnInit} from '@angular/core';
import {Observable} from 'rxjs';
import {AsyncPipe} from '@angular/common';
import {Store} from '@ngrx/store';

import {AppStateInterface} from '../../types/appState.interface';
import {isLoggedInSelector} from '../../../auth/store/selectors';
import {RouterModule} from '@angular/router';

@Component({
  selector: 'feed-toggler',
  standalone: true,
  imports: [AsyncPipe, RouterModule],
  templateUrl: './feed-toggler.component.html',
  styleUrl: './feed-toggler.component.scss',
})
export class FeedTogglerComponent implements OnInit {
  @Input('tagName') tagNameProps!: string | null;

  isLoggedIn$!: Observable<boolean | null>;

  private readonly store = inject(Store<AppStateInterface>);

  ngOnInit(): void {
    this.initializeValues();
  }

  initializeValues(): void {
    this.isLoggedIn$ = this.store.select(isLoggedInSelector);
  }
}
