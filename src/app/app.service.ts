import express, { Express } from 'express';
import { inject, injectable } from 'inversify';
import { 
    LoggerInterface, 
    ConfigIntreface,
    ApplicationConfigSchema,
    ControllerInterface,
    ExceptionFilterInterface,
    SwaggerInterface
} from '../types';
import { ApplicationComponents } from '../core/dictionary/app.js';

@injectable()
export class AppService {
    private expressApp: Express;

    constructor(
        @inject(ApplicationComponents.Logger) 
        private readonly logger: LoggerInterface,
        @inject(ApplicationComponents.Config) 
        private readonly config: ConfigIntreface<ApplicationConfigSchema>,
        @inject(ApplicationComponents.UserController)
        private readonly userController: ControllerInterface,
        @inject(ApplicationComponents.ExceptionFilter)
        private readonly exceptionFilter: ExceptionFilterInterface,
        @inject(ApplicationComponents.BookController)
        private readonly bookController: ControllerInterface,
        @inject(ApplicationComponents.DocController)
        private readonly docController: ControllerInterface,
        @inject(ApplicationComponents.SwaggerService)
        private readonly swaggerService: SwaggerInterface
    ) {
        this.expressApp = express();
    }

    private async _initServer(): Promise<void> {
        this.logger.log('Server initialization...');
        const port = this.config.get('PORT');
        this.expressApp.listen(port, () => {
            this.logger.info(`Server has been started on port ${port}`);
        });
    }

    private async _initRoutes(): Promise<void> {
        this.logger.log('Application routes initialization...');
        this.expressApp.use('/users', this.userController.router);
        this.expressApp.use('/books', this.bookController.router);
        this.expressApp.use('/docs', this.swaggerService.getSwaggerUi(), this.docController.router);
        this.logger.log('Application routes has been successfully initialized');
    }

    private async _initExceptionFilters (): Promise<void> {
        this.logger.log('Application exception filter initialization');
        this.expressApp.use(this.exceptionFilter.catch.bind(this.exceptionFilter));
    };

    private async _initMiddlewares (): Promise<void> {
        this.logger.log('Global middleware initialization...');
        this.expressApp.use(express.json());
        this.expressApp.use(express.urlencoded({ extended: true }));
    }

    public async init(): Promise<void> {
        await this._initMiddlewares();
        await this._initRoutes();
        await this._initExceptionFilters();
        await this._initServer();
    }

}
