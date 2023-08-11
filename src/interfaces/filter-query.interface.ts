import { FindOperator } from 'typeorm';

export interface IFilterQuery {
  where: { [key: string]: string | FindOperator<string> }[];
  take: number;
  skip: number;
}
