import {
  Directive,
  effect,
  ElementRef,
  inject,
  input,
  Renderer2,
} from '@angular/core';

@Directive({
  selector: '[colorizeSerched]',
  standalone: true,
})
export class ColorizeSerchedDirective {
  stringProp = input.required<string>();

  private elementRef = inject(ElementRef);
  private renderer2 = inject(Renderer2);

  constructor() {
    effect(() => {
      const originalText = this.elementRef.nativeElement.textContent;

      if (
        this.stringProp()?.length >= 3 &&
        originalText.toLowerCase().includes(this.stringProp().toLowerCase())
      ) {
        const highlightEl = originalText.replace(
          new RegExp(this.stringProp(), 'gi'),
          `<div class="colorize">${this.stringProp()}</div>`
        );

        this.renderer2.setProperty(
          this.elementRef.nativeElement,
          'innerHTML',
          highlightEl
        );
      } else {
        this.renderer2.setProperty(
          this.elementRef.nativeElement,
          'innerHTML',
          originalText
        );
      }
    });
  }
}
