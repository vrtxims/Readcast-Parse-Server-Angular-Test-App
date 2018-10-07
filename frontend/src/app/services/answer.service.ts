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

  countQuestionAnswers({ objectId }: Question): Promise<Answer[]> {
    return this.query(`
      count=1
      &limit=0
      &where={"question":{"__type":"Pointer","className":"Question","objectId":"${objectId}"}}
    `);
  }

  fetchQuestionAnswers({ objectId }: Question): Promise<Answer[]> {
    return this.query(`where={"question":{"__type":"Pointer","className":"Question","objectId":"${objectId}"}}`);
  }

}
