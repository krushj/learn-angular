import { ComponentFixture, TestBed } from '@angular/core/testing';

import { NumberViewer } from './number-viewer';

describe('NumberViewer', () => {
  let component: NumberViewer;
  let fixture: ComponentFixture<NumberViewer>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [NumberViewer]
    })
    .compileComponents();

    fixture = TestBed.createComponent(NumberViewer);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
