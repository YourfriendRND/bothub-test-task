import { Request, Response, NextFunction } from 'express';
import { ClassConstructor, plainToInstance } from 'class-transformer';
import { ValidationError, validate } from 'class-validator';
import { StatusCodes } from 'http-status-codes';
import { MiddlewareInterface } from '../../types';
import { CustomValidationError } from '../../types';

export class ValidateDtoMiddleware implements MiddlewareInterface {
    
    constructor(
        private dto: ClassConstructor<object>
    ) {}
    
    private getValidationErrors(errors: ValidationError[]): CustomValidationError[] {
        return errors.map((error) => {
            return {
              field: error.property,
              details: error?.constraints ? Object.values(error.constraints) : [],  
            }
        })
    }

    public async execute (
        { body }: Request, 
        res: Response, 
        next: NextFunction
    ): Promise<void> {
        const dtoInstance = plainToInstance(this.dto, body);
        const errors = await validate(dtoInstance)

        if (errors.length) {
            const customErrors = this.getValidationErrors(errors);
            res.status(StatusCodes.BAD_REQUEST).send(customErrors);
            return;
        }

        next();
    };
}
