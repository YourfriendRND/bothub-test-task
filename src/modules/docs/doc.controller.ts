import { inject, injectable } from 'inversify'; 
import { Controller } from '../../core/base-controller.abstract.js';
import { ApplicationComponents } from '../../core/dictionary/app.js';
import { LoggerInterface, ConfigIntreface, ApplicationConfigSchema } from '../../types/index.js';
import { HttpMethods } from '../../core/dictionary/http-methods.enum.js';
import { createApiDocsOptions } from './doc.options.js';
import { SwaggerService } from '../../core/swagger.service.js';

@injectable()
export class DocController extends Controller {
    constructor(
        @inject(ApplicationComponents.Logger) 
        protected readonly logger: LoggerInterface,
        @inject(ApplicationComponents.Config)
        private readonly config: ConfigIntreface<ApplicationConfigSchema>,
        @inject(ApplicationComponents.SwaggerService)
        private readonly swaggerService: SwaggerService
    ) {
        super(logger);
        
        this.logger.log(`${DocController.name} has been initialized`);

        this.logger.log('Routes registration for docs controller...');

        this.addRoute({
            method: HttpMethods.Get,
            path: '/',
            handler: this.swaggerService.getSwaggerSpec(createApiDocsOptions(this.config.get('APPLICATION_URL'))),
            middlewares: [
            ],
        });

        this.logger.log(`Routes are successfully registered for ${DocController.name}`);

        this.logger.log(`${DocController.name} initialized`);
    }

}

