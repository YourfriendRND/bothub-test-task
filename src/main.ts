import 'reflect-metadata';
import { Container } from 'inversify';
import { createAppContainer } from './app/app.container.js';
import { createUserContainer } from './modules/user/user.container.js';
import { ApplicationComponents } from './core/dictionary/app.js';
import { AppService } from './app/app.service.js';

async function bootstrap(): Promise<void> {
    const appContainer = createAppContainer();
    const userContainer = createUserContainer();


    const restContainer = Container.merge(
        appContainer,
        userContainer
    );

    const app = restContainer.get<AppService>(ApplicationComponents.AppService);
    
    await app.init();
}

bootstrap();
