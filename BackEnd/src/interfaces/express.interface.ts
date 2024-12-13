import { Request as ExpressRequest } from 'express';

export interface IRequest extends ExpressRequest {
  user: any;
  query: any;
}

export interface ParsedQs {
  [key: string]: undefined | string | string[] | ParsedQs | ParsedQs[] | any;
}
