import express, { Express } from 'express';
import { inject, injectable } from 'inversify';
import { 
    LoggerInterface, 
    ConfigIntreface,
    ApplicationConfigSchema
} from '../types';
import { ApplicationComponents } from '../core/dictionary/app.js';

@injectable()
export class AppService {
    private expressApp: Express;

    constructor(
        @inject(ApplicationComponents.Logger) 
        private readonly logger: LoggerInterface,
        @inject(ApplicationComponents.Config) 
        private readonly config: ConfigIntreface<ApplicationConfigSchema>
    ) {
        this.expressApp = express();
    }

    private _initServer(): void {
        this.logger.log('Server initialization...');
        const port = this.config.get('PORT');
        this.expressApp.listen(port, () => {
            this.logger.info(`Server has been started on port ${port}`);
        });
    }

    public async init(): Promise<void> {
        this._initServer();
    }

}
