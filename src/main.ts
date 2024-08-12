import 'reflect-metadata';
//import { Container } from 'inversify';
import { createAppContainer } from './app/app.container.js';
import { ApplicationComponents } from './core/dictionary/app.js';
import { AppService } from './app/app.service.js';

async function bootstrap(): Promise<void> {
    const appContainer = createAppContainer();


    // const restContainer = Container.merge(
    //     appContainer,
    // );

    const app = appContainer.get<AppService>(ApplicationComponents.AppService);
    
    await app.init();
}

bootstrap();
