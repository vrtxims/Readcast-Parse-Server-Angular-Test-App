import { Component, Inject, OnInit } from '@angular/core';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material';
import { FormBuilder, Validators, FormGroup } from '@angular/forms';

import { QuestionService } from '../services/question.service';
import { AnswerService } from '../services/answer.service';
import { Question } from '../models/question';
import { Answer } from '../models/answer';

@Component({
  selector: 'app-crud-dialog',
  templateUrl: './crud-dialog.component.html',
  styleUrls: ['./crud-dialog.component.scss']
})
export class CrudDialogComponent implements OnInit {

  action: string;

  model: string;

  modelId: null | string = null;

  title: string;

  placeholder: string;

  textInputValue: null | string = null;

  textErrorMessage: string;

  form: FormGroup;

  awaitingForRequest = false;

  constructor(
    private questionService: QuestionService,
    private answerService: AnswerService,
    private formBuilder: FormBuilder,
    private dialogRef: MatDialogRef<CrudDialogComponent>,
    @Inject(MAT_DIALOG_DATA) dataPassedToDialog
  ) {
    this.action = dataPassedToDialog.action;

    switch (dataPassedToDialog.model) {
      case 'Question':
        this.model = 'Question';
        this.title = 'New Question';
        this.placeholder = 'Enter the text for your question';
        this.textErrorMessage = 'A text for the question is required!';

        break;

      case 'Answer':
        this.model = 'Answer';
        this.title = 'New Answer';
        this.placeholder = 'Enter the text for your answer';
        this.textErrorMessage = 'A text for the answer is required!';

        if (this.action === 'edit') {
          this.modelId = dataPassedToDialog.modelId;
          this.textInputValue = dataPassedToDialog.textInputValue;

          this.title = 'Edit Answer';
        }

        break;
    }

    this.form = formBuilder.group({
      text: [this.textInputValue, Validators.required]
    });
  }

  ngOnInit() { }

  async save() {
    if (this.form.status === 'VALID') {
      this.awaitingForRequest = true;

      if (this.action === 'create') {
        await this.store();
      } else if (this.action === 'edit') {
        await this.update();
      }

      this.awaitingForRequest = false;
      this.dialogRef.close(this.form.value);
    }
  }

  close() {
      this.dialogRef.close();
  }

  private async store() {
    switch (this.model) {
      case 'Question':
        await this.questionService
          .insert({
            questionText: this.form.value.text
          });

        break;

      case 'Answer':
        await this.answerService
          .insert({
            answerText: this.form.value.text
          });

        break;
    }
  }

  private async update() {
    switch (this.model) {
      case 'Question':
        await this.questionService
          .update(this.modelId, {
            questionText: this.form.value.text
          });

        break;

      case 'Answer':
        await this.answerService
          .update(this.modelId, {
            answerText: this.form.value.text
          });

        break;
    }
  }

}
