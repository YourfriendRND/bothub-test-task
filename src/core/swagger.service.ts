import { injectable, inject } from 'inversify';
import { RequestHandler } from 'express';
import swaggerJSDoc from 'swagger-jsdoc';
import swaggerUi from 'swagger-ui-express';
import { SwaggerInterface, LoggerInterface } from '../types';
import { ApplicationComponents } from './dictionary/app.js';

@injectable()
export class SwaggerService implements SwaggerInterface {
    constructor(
        @inject(ApplicationComponents.Logger) 
        private readonly logger: LoggerInterface,
    ) {
        this.logger.log(`${SwaggerService.name} has been initialized`);
    }

    public getSwaggerUi(): RequestHandler[] {
        return swaggerUi.serve;
    }

    public getSwaggerSpec(docs: object): RequestHandler {
        return swaggerUi.setup(swaggerJSDoc(docs));
    }

}