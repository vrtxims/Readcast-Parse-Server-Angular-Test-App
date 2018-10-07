import { Injectable } from '@angular/core';
import { Question } from '../models/question';
import { Http } from '@angular/http';
import { environment } from '../../environments/environment';
import { ParseService } from './parse/parse.service';

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

}
