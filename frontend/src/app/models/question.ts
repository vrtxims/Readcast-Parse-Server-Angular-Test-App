import {
  IParseInsertableEntity,
  IParseEntity,
  IParseUpdatableEntity
} from '../services/parse/entity';

export class Question implements IParseEntity, IParseInsertableEntity, IParseUpdatableEntity {
  objectId: string;
  createdAt: string;
  updatedAt: string;
  questionText: string;
  positiveRating: number;
  negativeRating: number;
}
