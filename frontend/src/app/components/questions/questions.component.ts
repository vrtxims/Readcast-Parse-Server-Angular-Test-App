import { Component, OnInit } from '@angular/core';
import { MatDialog, MatDialogConfig } from '@angular/material';

import { Question } from '../../models/question';

import { QuestionService } from '../../services/question.service';
import { AnswerService } from '../../services/answer.service';

import { CrudDialogComponent } from '../crud-dialog/crud-dialog.component';

@Component({
  selector: 'app-questions',
  templateUrl: './questions.component.html',
  styleUrls: ['./questions.component.scss']
})
export class QuestionsComponent implements OnInit {

  whatDoWeLearn = 'Angular';

  availableQuestions: Question[];

  constructor(
    private questionService: QuestionService,
    private answerService: AnswerService,
    public dialog: MatDialog
  ) { }

  async ngOnInit() {
    await this.fetchAllQuestions();
  }

  openCreateDialog() {
    const dialogConfig = new MatDialogConfig();

    dialogConfig.disableClose = true;
    dialogConfig.autoFocus = false;
    dialogConfig.width = '350px';

    dialogConfig.data = {
      action: 'create',
      model: 'Question'
    };

    const dialogRef = this.dialog.open(CrudDialogComponent, dialogConfig);

    dialogRef.afterClosed().subscribe(async () => {
      await this.fetchAllQuestions();
    });
  }

  async rateQuestion({ objectId, positiveRating, negativeRating }: Question, direction: string) {
    switch (direction) {
      case 'up':
        await this.questionService.update(objectId, {
          positiveRating: positiveRating + 1
        });

        break;

      case 'down':
        await this.questionService.update(objectId, {
          negativeRating: negativeRating + 1
        });

        break;
    }

    await this.fetchAllQuestions();
  }

  async deleteQuestion(question: Question) {
    const confirmed = confirm('Do you really want to delete this question?');

    if (!confirmed) {
      return false;
    }

    await this.questionService.delete(question.objectId);

    await this.answerService
      .deleteQuestionAnswers(question);

    await this.fetchAllQuestions();
  }

  private async fetchAllQuestions() {
    this.availableQuestions = await this.questionService.all();
  }

}
