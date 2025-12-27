import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'inrConverter'
})
export class InrConverterPipe implements PipeTransform {


  transform(value: number, exchangeRate: number): number {
    if (value === null || value === undefined) {
      return 0;
    }
    console.log('InrConverterPipe: transform with value ' + value + ' and exchange rate ' + exchangeRate);
    const inrValue = value * exchangeRate;
    return inrValue;
  }

}
