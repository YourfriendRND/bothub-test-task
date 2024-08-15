import 'reflect-metadata';
import { Container } from 'inversify';
import { createAppContainer } from './app/app.container.js';
import { createUserContainer } from './modules/user/user.container.js';
import { createBookContainer } from './modules/book/book.container.js';
import { ApplicationComponents } from './core/dictionary/app.js';
import { AppService } from './app/app.service.js';

async function bootstrap(): Promise<void> {
    const appContainer = createAppContainer();
    const userContainer = createUserContainer();
    const bookContainer = createBookContainer();


    const restContainer = Container.merge(
        appContainer,
        userContainer,
        bookContainer
    );

    const app = restContainer.get<AppService>(ApplicationComponents.AppService);
    
    await app.init();
}

bootstrap();
