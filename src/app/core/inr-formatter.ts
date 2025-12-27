import { Directive, ElementRef, Input } from '@angular/core';


/**
 * Attribute directive - changes to appearance of the element based on the input value
 * This is a directive to format the INR value. directive basically converts the number to a string with the INR symbol and the value. 
 * they are work with appearance of the value. like if the value is 1000000, it will be formatted as 1M, if the value is 1000, it will be formatted as 1K, if the value is 1000000000, it will be formatted as 1B.
 */

@Directive({
  selector: '[inrFormatter]',
})
export class InrFormatter {

  constructor(private el: ElementRef) { }


  @Input("inrFormatter") 
  set value(val: number | null | undefined) {
    if (val === null || val === undefined) return;

    const formatted = this.format(val);
    console.log('InrFormatter: input changed to ' + val + ' and formatted to ' + formatted);
    this.el.nativeElement.textContent = formatted;
    this.el.nativeElement.style.color = val < 0 ? 'red' : val > 0 ? 'green' : 'black';
  }

  private format(value: number): string {
    if (value < 0) return `-₹${Math.abs(value).toFixed(2)}`;
    if (value >= 1_000_000) return `₹${(value / 1_000_000).toFixed(2)}M`;
    if (value >= 1_000) return `₹${(value / 1_000).toFixed(2)}K`;
    return `₹${value.toFixed(2)}`;
  }

}
