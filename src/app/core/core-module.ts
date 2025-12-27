import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { CORE_ROUTES } from './core.config';
import { provideRouter } from '@angular/router';
import { FormsModule } from '@angular/forms';
import { Core } from './core';
import { NumberViewer } from './number-viewer/number-viewer';
import { InrConverterPipe } from './inr-converter-pipe';
import { InrFormatter } from './inr-formatter';



@NgModule({
  declarations: [
  ],
  imports: [
    CommonModule,
    NumberViewer,
    InrConverterPipe,
    InrFormatter
  ],
  providers: [
    provideRouter(CORE_ROUTES)
  ],
  exports: [
    NumberViewer,
    InrConverterPipe,
    InrFormatter
  ]
})
export class CoreModule { }
