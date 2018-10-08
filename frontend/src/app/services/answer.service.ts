import { Injectable } from '@angular/core';
import { Answer } from '../models/answer';
import { Http } from '@angular/http';
import { environment } from '../../environments/environment';
import { ParseService } from './parse/parse.service';
import { Question } from '../models/question';

@Injectable({
  providedIn: 'root'
})
export class AnswerService extends ParseService<Answer> {

  constructor(protected http: Http) {
    super(
      http,
      environment.parseUrl,
      environment.parseId,
      environment.parseKey,
      'Answer'
    );
  }

  async countQuestionAnswers({ objectId }: Question): Promise<Answer[]> {
    return await this.query(`
      count=1
      &limit=0
      &where={"question":{"__type":"Pointer","className":"Question","objectId":"${objectId}"}}
    `);
  }

  async fetchQuestionAnswers({ objectId }: Question): Promise<Answer[]> {
    return await this.query(`where={"question":{"__type":"Pointer","className":"Question","objectId":"${objectId}"}}&order=-createdAt`);
  }

  async deleteQuestionAnswers(question: Question): Promise<void> {
    const answers = await this.fetchQuestionAnswers(question);

    answers.map(async answer => {
      await this.delete(answer.objectId);
    });
  }

}
