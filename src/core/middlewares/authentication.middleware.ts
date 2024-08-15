import { createSecretKey } from 'node:crypto';
import { Request, Response, NextFunction } from 'express';
import { jwtVerify } from 'jose';
import { StatusCodes } from 'http-status-codes';
import { MiddlewareInterface, TokenPayload } from '../../types';
import { HttpError } from '../errors/http-error.js';

export class AuthenticationMiddleware implements MiddlewareInterface {
    constructor(
        private readonly secret: string
    ) {}

    public async execute (req: Request, _res: Response, next: NextFunction): Promise<void> {
        try {
            const authorizationHeader = req.headers?.authorization?.split(' ');

            if (authorizationHeader) {
                const [, token] = authorizationHeader;
                const { payload } = await jwtVerify<TokenPayload>(token, createSecretKey(this.secret, 'utf-8'));
    
                req.user = {
                    id: payload.id,
                };
    
                return next();
            }

            throw new Error('User token is empty');

        } catch {
            return next(
                new HttpError(
                  StatusCodes.UNAUTHORIZED,
                  'Invalid user token',
                  `${AuthenticationMiddleware.name}`
                )
            );
        }
        

    };
}
