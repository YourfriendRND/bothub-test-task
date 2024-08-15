import { Request, Response, NextFunction } from 'express';
import * as core from 'express-serve-static-core';
import { StatusCodes } from 'http-status-codes';
import { MiddlewareInterface } from '../../types';
import { HttpError } from '../errors/http-error.js';

export class ValidateIdParamMiddleware implements MiddlewareInterface {
    
    public async execute (
        { params }: Request<core.ParamsDictionary | { id: string }>, 
        _res: Response, 
        next: NextFunction
    ): Promise<void> {
        if (!params.id) {
            throw new HttpError(
                StatusCodes.BAD_REQUEST,
                `Updated book id is undefined`,
                `[${ValidateIdParamMiddleware.name}]`
            );
        }

        return next();
    };
}