
import { Request, Response, NextFunction } from 'express';
import { MiddlewareInterface } from '../../types';
import { PrismaClient } from '@prisma/client';
import { HttpError } from '../errors/http-error.js';
import { StatusCodes } from 'http-status-codes';

export class AdminMiddleware implements MiddlewareInterface {
    private readonly _client: PrismaClient;
    constructor() {
        this._client = new PrismaClient();
    }

    public async execute ({ user }: Request, _res: Response, next: NextFunction): Promise<void> {
        const requestUser = await this._client.user.findUnique({
            where: {
                id: user.id,
            }
        });

        if (requestUser?.isAdmin) {
            return next();
        }

        throw new HttpError(
            StatusCodes.FORBIDDEN,
            `User must be admin, request decline`,
            `[${AdminMiddleware.name}]`
        )
    };
}
