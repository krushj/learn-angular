import { Component } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { NumberViewer } from './number-viewer/number-viewer';

@Component({
  selector: 'app-core',
  imports: [
    FormsModule,
    NumberViewer
  ],
  templateUrl: './core.html',
  styleUrl: './core.scss',
})
export class Core {

  private _title = "USD to INR";

  private _usd = 0;
  private _exchangeRate = 80;
  

  get exchangeRate() {
    return this._exchangeRate;
  }

  get title() {
    return this._title;
  }

  get usd() {
    return this._usd;
  }


  set usd(value: number) {
    this._usd = value;
  }

  set exchangeRate(value: number) {
    this._exchangeRate = value;
  }

  constructor() {
    console.log('Core constructor');
  }


  changeInInput(input: string) {
    console.log('User changed the input of type', input);
  }
}
