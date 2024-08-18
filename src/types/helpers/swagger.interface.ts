import { RequestHandler } from 'express';

export interface SwaggerInterface {
    getSwaggerUi(): RequestHandler[],
    getSwaggerSpec(docs: object): RequestHandler
}
