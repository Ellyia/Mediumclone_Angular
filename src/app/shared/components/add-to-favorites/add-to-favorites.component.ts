import {Component, inject, input, Input} from '@angular/core';
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
  slug = input.required<string>();
  @Input('isInFavorite') isInFavoriteProps!: boolean;
  @Input('countOfFavorites') countOfFavoritesProps!: number;

  private readonly store = inject(Store<AppStateInterface>);

  countOfFavorites!: number;
  isFavorited!: boolean;

  ngOnInit(): void {
    this.countOfFavorites = this.countOfFavoritesProps;
    this.isFavorited = this.isInFavoriteProps;
  }

  switchFavorit(): void {
    this.store.dispatch(
      addToFavoriteArticleAction({
        isFavorited: this.isFavorited,
        slug: this.slug(),
      })
    );

    if (this.isFavorited) {
      this.countOfFavorites = this.countOfFavorites - 1; // computed(this.countOfFavorites() - 1)
    } else {
      this.countOfFavorites = this.countOfFavorites + 1; // computed(this.countOfFavorites() - 1)
    }
    this.isFavorited = !this.isFavorited; // computed(this.countOfFavorites() - 1)
  }
}
