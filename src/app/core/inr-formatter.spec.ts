import { ElementRef } from '@angular/core';
import { InrFormatter } from './inr-formatter';

describe('InrFormatter', () => {
  it('should create an instance', () => {
    const directive = new InrFormatter(new ElementRef<HTMLElement>(document.createElement('div')));
    expect(directive).toBeTruthy();
  });
});
