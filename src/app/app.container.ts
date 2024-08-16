import { Container } from 'inversify';
import { AppService } from './app.service.js';
import { Logger } from '../core/logger.service.js';
import { ConfigService } from '../core/config.service.js';
import { ApplicationComponents } from '../core/dictionary/app.js';
import { ExceptionFilter } from '../core/exception-filter/exception-filter.js';
import { MailService } from '../core/mail.service.js';
import { SwaggerService } from '../core/swagger.service.js';
import { 
    ApplicationConfigSchema, 
    ConfigIntreface, 
    ExceptionFilterInterface, 
    LoggerInterface, 
    MailInterface, 
    SwaggerInterface
} from '../types';

export function createAppContainer (): Container {
    const appContainer = new Container();

    appContainer
        .bind<AppService>(ApplicationComponents.AppService)
        .to(AppService)
        .inSingletonScope();
    
    appContainer
        .bind<LoggerInterface>(ApplicationComponents.Logger)
        .to(Logger)
        .inSingletonScope();

    appContainer
        .bind<ConfigIntreface<ApplicationConfigSchema>>(ApplicationComponents.Config)
        .to(ConfigService)
        .inSingletonScope();

    appContainer
        .bind<ExceptionFilterInterface>(ApplicationComponents.ExceptionFilter)
        .to(ExceptionFilter)
        .inSingletonScope();

    appContainer
        .bind<MailInterface>(ApplicationComponents.Mail)
        .to(MailService)
        .inSingletonScope();

    appContainer
        .bind<SwaggerInterface>(ApplicationComponents.SwaggerService)
        .to(SwaggerService)
        .inSingletonScope();

    return appContainer;
}