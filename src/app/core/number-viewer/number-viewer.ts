import { Component, Input, OnChanges, OnDestroy, OnInit, SimpleChanges } from '@angular/core';
import { InrConverterPipe } from '../inr-converter-pipe';
import { InrFormatter } from '../inr-formatter';
import { CommonModule } from '@angular/common';

/**
 * This is plauground to basic undestanding between the component lifecycle hooks and input changes.
 * when you change the usdValue, exchangeRate is empty in ngOnChanges, but when you change the exchangeRate, usdValue is empty in ngOnChanges.
 * the event sequence was simple i increased the usdValue and after that i increased the exchangeRate. i got something like this:
 * 
 * NumberViewer constructor with usd value 0 and exchange rate value 0
 * NumberViewer ngOnChanges with current usd value 0 and previous usd value undefined and current exchange rate value 80 and previous exchange rate value undefined
 * NumberViewer ngOnInit with usd value 0 and exchange rate value 80
 * User changed the input of type USD
 * NumberViewer ngOnChanges with current usd value 1 and previous usd value 0 and current exchange rate value undefined and previous exchange rate value undefined
 * User changed the input of type Exchange Rate
 * NumberViewer ngOnChanges with current usd value undefined and previous usd value undefined and current exchange rate value 81 and previous exchange rate value 80
 */

@Component({
  selector: 'app-number-viewer',
  imports: [CommonModule, InrConverterPipe, InrFormatter],
  templateUrl: './number-viewer.html',
  styleUrl: './number-viewer.scss',
})
export class NumberViewer implements OnInit, OnChanges, OnDestroy {

  @Input({required: true}) usdValue: number = 0;
  @Input({required: true}) exchangeRate: number = 0;

  constructor() {
    console.log('NumberViewer constructor with usd value ' + this.usdValue + ' and exchange rate value ' + this.exchangeRate);
  }

  ngOnInit() {
    console.log('NumberViewer ngOnInit with usd value ' + this.usdValue + ' and exchange rate value ' + this.exchangeRate);
  }

  ngOnChanges(changes: SimpleChanges) {
    console.log('NumberViewer ngOnChanges with current usd value ' + changes['usdValue']?.currentValue + ' and previous usd value ' + changes['usdValue']?.previousValue + ' and current exchange rate value ' + changes['exchangeRate']?.currentValue + ' and previous exchange rate value ' + changes['exchangeRate']?.previousValue);
  }

  ngOnDestroy() {
    console.log('NumberViewer ngOnDestroy');
  }
}
