import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

import { QuestionsComponent } from '../components/questions/questions.component';
import { QuestionDetailComponent } from '../components/question-detail/question-detail.component';

const routes: Routes = [
  { path: '', component: QuestionsComponent },
  { path: 'question/:objectId', component: QuestionDetailComponent }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
