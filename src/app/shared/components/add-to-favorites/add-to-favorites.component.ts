import {Component, inject, Input} from '@angular/core';
import {NgClass} from '@angular/common';
import {Store} from '@ngrx/store';

import {AppStateInterface} from '../../types/appState.interface';
import {addToFavoriteArticleAction} from './store/actions/add-to-favorite-article.action';
import {removeFromFavoriteArticleAction} from './store/actions/remove-from-favorite-article.action';

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
    if (this.isFavorited) {
      this.countOfFavorites = this.countOfFavorites - 1;
      this.store.dispatch(
        removeFromFavoriteArticleAction({slug: this.slugParam})
      );
    } else {
      this.countOfFavorites = this.countOfFavorites + 1;
      this.store.dispatch(addToFavoriteArticleAction({slug: this.slugParam}));
    }
    this.isFavorited = !this.isFavorited;
  }
}
