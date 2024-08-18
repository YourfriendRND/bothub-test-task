import { Request, Response, NextFunction } from 'express';
import { MiddlewareInterface } from './middleware.interface';
import { HttpMethods } from '../../core/dictionary/http-methods.enum';

export interface RouteInterface {
  path: string
  method: HttpMethods,
  handler: (
    req: Request, 
    res: Response, 
    next: NextFunction
  ) => void,
  middlewares?: MiddlewareInterface[]
}
