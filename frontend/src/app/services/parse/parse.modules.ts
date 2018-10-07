import { NgModule } from '@angular/core';
import { HttpModule } from '@angular/http';
import { ParseService } from './parse.service';

@NgModule({
  imports: [
    HttpModule
  ],
  providers: [ParseService]
})
export class ParseModule {
}
