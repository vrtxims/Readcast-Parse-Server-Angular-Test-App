import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

import { QuestionsComponent } from './questions/questions.component';
import { QuestionDetailComponent } from './question-detail/question-detail.component';

const routes: Routes = [
  { path: '', component: QuestionsComponent },
  { path: 'question/:objectId', component: QuestionDetailComponent }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
