import { Response, Request, NextFunction } from 'express';
import { inject, injectable } from 'inversify';
import { StatusCodes } from 'http-status-codes';
import { ErrorData, ExceptionFilterInterface } from '../../types';
import { ApplicationComponents } from '../dictionary/app.js';
import { Logger } from '../logger.service.js';
import { HttpError } from '../errors/http-error.js';

@injectable()
export class ExceptionFilter implements ExceptionFilterInterface {
    constructor(
        @inject(ApplicationComponents.Logger)
        private readonly logger: Logger
    ) {
        this.logger.log(`${ExceptionFilter.name} has been initialized`);
    }

    private createErrorData(message: string): ErrorData {
        return {
            error: message,
        }
    }
    
    private handleHttpError(error: HttpError, res: Response): void {
        this.logger.error(`[${error.details}]: ${error.httpStatusCode} - ${error.message}`);
        res
            .status(error.httpStatusCode)
            .json(this.createErrorData(error.message));
    }
    
    private handleOtherError(error: Error | HttpError, res: Response): void {
        this.logger.error(error.message);
        res
          .status(StatusCodes.INTERNAL_SERVER_ERROR)
          .json(this.createErrorData(error.message));
    }

    public async catch (
        error: Error, 
        _req: Request, 
        res: Response, 
        _next: NextFunction
    ): Promise<void> {
        if (error instanceof HttpError) {
            return this.handleHttpError(error, res);
          }
      
          this.handleOtherError(error, res);
    }
}
