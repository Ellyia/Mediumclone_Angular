import {Component, inject, Input, OnInit} from '@angular/core';
import {Observable} from 'rxjs';
import {AsyncPipe} from '@angular/common';
import {Store} from '@ngrx/store';
import {RouterModule} from '@angular/router';

import {AppStateInterface} from '../../types/appState.interface';
import {isLoggedInSelector} from '../../../auth/store/selectors';

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
