import { Injectable } from '@angular/core';
import { Question } from '../models/question';
import { Http } from '@angular/http';
import { environment } from '../../environments/environment';
import { ParseService } from './parse/parse.service';
import { IParseUpdatableEntity, IParseInsertableEntity } from './parse/entity';

@Injectable({
  providedIn: 'root'
})
export class QuestionService extends ParseService<Question> {

  constructor(protected http: Http) {
    super(
      http,
      environment.parseUrl,
      environment.parseId,
      environment.parseKey,
      'Question'
    );
  }

  async addAnswerRelation(questionObjectId: string, answerObjectId: string): Promise<IParseUpdatableEntity> {
    const relatedAnswers: any[] = await this.getRelatedAnswersColumnValue(questionObjectId);

    const relation = `{
      "__type": "Pointer",
      "className": "Answer",
      "objectId": "${answerObjectId}"
    }`;

    relatedAnswers.push(JSON.parse(relation));

    return await this.update(questionObjectId, {
      answers: relatedAnswers
    });
  }

  async removeAnswerRelation(questionObjectId: string, answerObjectId: string): Promise<IParseUpdatableEntity> {
    let relatedAnswers: any[] = await this.getRelatedAnswersColumnValue(questionObjectId);

    relatedAnswers = relatedAnswers.filter(relation => relation.objectId !== answerObjectId);

    return await this.update(questionObjectId, {
      answers: relatedAnswers
    });
  }

  private async getRelatedAnswersColumnValue(questionObjectId: string): Promise<any[]> {
    const question: IParseInsertableEntity = await this.get(questionObjectId);

    let relatedAnswers: any[] = [];

    if (typeof question['answers'] !== 'undefined') {
      relatedAnswers = question['answers'];
    }

    return relatedAnswers;
  }

}
