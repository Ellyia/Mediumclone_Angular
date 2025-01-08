import {
  ChangeDetectionStrategy,
  Component,
  DestroyRef,
  inject,
  OnInit,
  output,
} from '@angular/core';
import {FormControl, FormGroup, ReactiveFormsModule} from '@angular/forms';
import {debounceTime, filter} from 'rxjs';
import {takeUntilDestroyed} from '@angular/core/rxjs-interop';

@Component({
  selector: 'search-bar',
  standalone: true,
  imports: [ReactiveFormsModule],
  templateUrl: './search-bar.component.html',
  styleUrl: './search-bar.component.scss',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class SearchBarComponent implements OnInit {
  searchStr = output<string>();

  destroyRef = inject(DestroyRef);

  searcher!: FormGroup;

  ngOnInit(): void {
    this.initializeForm();

    this.searcher.controls['searchStr'].valueChanges
      .pipe(
        takeUntilDestroyed(this.destroyRef),
        debounceTime(500),
        filter(
          (searchStr: string) => searchStr.length >= 3 || searchStr.length === 0
        )
      )
      .subscribe((searchStr: string) => {
        this.searchStr.emit(searchStr);
      });
  }

  initializeForm(): void {
    this.searcher = new FormGroup({
      searchStr: new FormControl<string>('', {nonNullable: true}),
    });
  }
}
