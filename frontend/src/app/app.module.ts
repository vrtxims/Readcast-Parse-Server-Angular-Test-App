import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { HttpModule } from '@angular/http';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import {
  MatIconModule,
  MatButtonModule,
  MatDividerModule,
  MatDialogModule,
  MatProgressBarModule,
  MatInputModule
} from '@angular/material';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { FlexLayoutModule } from '@angular/flex-layout';

import { AppComponent } from './app.component';
import { QuestionsComponent } from './questions/questions.component';
import { CrudDialogComponent } from './crud-dialog/crud-dialog.component';

import { AppRoutingModule } from './app-routing.module';
import { QuestionDetailComponent } from './question-detail/question-detail.component';

@NgModule({
  declarations: [
    AppComponent,
    QuestionsComponent,
    CrudDialogComponent,
    QuestionDetailComponent
  ],
  imports: [
    BrowserModule,
    HttpModule,
    BrowserAnimationsModule,
    MatIconModule,
    MatButtonModule,
    MatDividerModule,
    MatDialogModule,
    MatProgressBarModule,
    MatInputModule,
    AppRoutingModule,
    FormsModule,
    ReactiveFormsModule,
    FlexLayoutModule
  ],
  providers: [],
  bootstrap: [AppComponent],
  entryComponents: [CrudDialogComponent]
})
export class AppModule { }
