import {Pipe, PipeTransform} from '@angular/core';

@Pipe({
  name: 'highlightStr',
  standalone: true,
})
export class HighlightStrPipe implements PipeTransform {
  transform(value: string, search: string = ''): string {
    return search.length >= 3 &&
      value.toLowerCase().includes(search.toLowerCase())
      ? value.replace(
          new RegExp(search, 'gi'),
          `<div class="highlight">${search}</div>`
        )
      : value;
  }
}
