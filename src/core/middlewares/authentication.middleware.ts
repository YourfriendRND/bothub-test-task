import { Request, Response, NextFunction } from 'express';
import { jwtVerify } from 'jose';
import { StatusCodes } from 'http-status-codes';
import { MiddlewareInterface } from '../../types';
import { HttpError } from '../errors/http-error';

export class AuthenticationMiddleware implements MiddlewareInterface {
    constructor(
        private readonly secret: string
    ) {}

    public execute (req: Request, _res: Response, next: NextFunction): void {
        try {
            const authorizationHeader = req.headers?.authorization?.split(' ');

            if (authorizationHeader) {
                const [, token] = authorizationHeader;
                // const { payload } = await jwtVerify(token, createSecretKey(this.secret, 'utf-8'));
    
                // req.user = {
                //     email: payload.email as string,
                //     id: payload.userId as string
                // };
    
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