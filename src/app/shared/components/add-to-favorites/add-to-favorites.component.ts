import {Component, inject, input} from '@angular/core';
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
  isInFavorite = input.required<boolean>();
  countOfFavorites = input.required<number>();

  private readonly store = inject(Store<AppStateInterface>);

  // isInFavorited = toSignal(this.store.select(isAddedToFavoriteSelector));
  // countOfFavorited = toSignal(this.store.select(countOfFavoritesSelector));

  countOfFavoritess!: number;
  isFavorited!: boolean;

  ngOnInit(): void {
    this.countOfFavoritess = this.countOfFavorites();
    this.isFavorited = this.isInFavorite();
  }

  switchFavorit(): void {
    this.store.dispatch(
      addToFavoriteArticleAction({
        isFavorited: !this.isFavorited,
        slug: this.slug(),
      })
    );

    // this.countOfFavoritess = this.countOfFavorited() as number;
    // this.isFavorited = this.isInFavorited() as boolean;

    if (this.isFavorited) {
      this.countOfFavoritess = this.countOfFavoritess - 1;
    } else {
      this.countOfFavoritess = this.countOfFavoritess + 1;
    }
    this.isFavorited = !this.isFavorited;
  }
}
