import {NgModule} from '@angular/core';
import {CommonModule, DatePipe} from '@angular/common';
import {Title} from "@angular/platform-browser";
import {FormsModule, ReactiveFormsModule} from "@angular/forms";
import {NgbModule} from "@ng-bootstrap/ng-bootstrap";

@NgModule({
  declarations: [],
  imports: [
    CommonModule,
  ],
  exports: [ReactiveFormsModule, FormsModule, NgbModule],
  providers: [
    Title,
    DatePipe,
  ],
  entryComponents: []
})
export class SharedModule {
  constructor() {
  }
}
