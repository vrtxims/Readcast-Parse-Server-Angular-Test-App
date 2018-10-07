import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { MatDialog, MatDialogConfig } from '@angular/material';

import { Question } from '../models/question';
import { Answer } from '../models/answer';

import { QuestionService } from '../services/question.service';
import { AnswerService } from '../services/answer.service';
import { CrudDialogComponent } from '../crud-dialog/crud-dialog.component';

@Component({
  selector: 'app-question-detail',
  templateUrl: './question-detail.component.html',
  styleUrls: ['./question-detail.component.scss']
})
export class QuestionDetailComponent implements OnInit {

  question: Question;

  availableAnswers: Answer[];

  constructor(
    private route: ActivatedRoute,
    private questionService: QuestionService,
    private answerService: AnswerService,
    public dialog: MatDialog
  ) { }

  async ngOnInit() {
    await this.fetchQuestion();
    await this.fetchQuestionAnswers();
  }

  openCreateOrEditAnswerDialog(action: string, answer?: Answer) {
    const dialogConfig = new MatDialogConfig();

    dialogConfig.disableClose = true;
    dialogConfig.autoFocus = false;
    dialogConfig.width = '350px';

    dialogConfig.data = {
      action: action,
      model: 'Answer',
      modelId: answer ? answer.objectId : null,
      textInputValue: answer ? answer.answerText : null
    };

    const dialogRef = this.dialog.open(CrudDialogComponent, dialogConfig);

    dialogRef.afterClosed().subscribe(async () => {
      await this.fetchQuestionAnswers();
    });
  }

  async rateAnswer({ objectId, positiveRating, negativeRating }: Answer, direction: string) {
    switch (direction) {
      case 'up':
        await this.answerService.update(objectId, {
          positiveRating: positiveRating + 1
        });

        break;

      case 'down':
        await this.answerService.update(objectId, {
          negativeRating: negativeRating + 1
        });

        break;
    }

    await this.fetchQuestionAnswers();
  }

  async deleteAnswer({ objectId }: Answer) {
    await this.answerService.delete(objectId);
    await this.fetchQuestionAnswers();
  }

  private async fetchQuestion() {
    const objectId = this.route.snapshot.paramMap.get('objectId');

    this.question = await this.questionService.get(objectId);
  }

  private async fetchQuestionAnswers() {
    this.availableAnswers = await this.answerService.fetchQuestionAnswers(this.question);
  }

}
