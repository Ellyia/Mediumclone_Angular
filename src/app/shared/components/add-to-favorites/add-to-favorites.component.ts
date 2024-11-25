import {Component, inject, Input} from '@angular/core';
import {NgClass} from '@angular/common';
import {Store} from '@ngrx/store';

import {AppStateInterface} from '../../types/appState.interface';
import {addToFavoriteArticleAction} from './store/actions/add-to-favorite-article.action';

@Component({
  selector: 'add-to-favorites',
  standalone: true,
  imports: [NgClass],
  templateUrl: './add-to-favorites.component.html',
  styleUrl: './add-to-favorites.component.scss',
})
export class AddToFavoritesComponent {
  @Input('slug') slugParam!: string;
  @Input('isInFavorite') isInFavoriteProps!: boolean;
  @Input('countOfFavorites') countOfFavoritesProps!: number;

  countOfFavorites!: number;
  isFavorited!: boolean;

  ngOnInit(): void {
    this.countOfFavorites = this.countOfFavoritesProps;
    this.isFavorited = this.isInFavoriteProps;
  }

  private readonly store = inject(Store<AppStateInterface>);

  switchFavorit(): void {
    this.store.dispatch(
      addToFavoriteArticleAction({
        isFavorited: this.isFavorited,
        slug: this.slugParam,
      })
    );

    if (this.isFavorited) {
      this.countOfFavorites = this.countOfFavorites - 1;
    } else {
      this.countOfFavorites = this.countOfFavorites + 1;
    }
    this.isFavorited = !this.isFavorited;
  }
}
