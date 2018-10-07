import {
  IParseInsertableEntity,
  IParseEntity,
  IParseUpdatableEntity
} from '../services/parse/entity';

export class Answer implements IParseEntity, IParseInsertableEntity, IParseUpdatableEntity {
  objectId: string;
  createdAt: string;
  updatedAt: string;
  answerText: string;
  positiveRating: number;
  negativeRating: number;
}
