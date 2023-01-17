import { Directive, ElementRef, Input, OnChanges, SimpleChanges } from '@angular/core';

@Directive({
  selector: '[highligth]'
})
export class HighligthDirective implements OnChanges {
  defaultColor = 'gray';
  @Input('highligth') bgColor!: string;
  constructor(
    private elementRef: ElementRef,
  ) {
    this.elementRef.nativeElement.style.backgroundColor = this.defaultColor;
  }

  ngOnChanges(_: SimpleChanges): void {
    this.elementRef.nativeElement.style.backgroundColor = this.bgColor || this.defaultColor;
  }
}
