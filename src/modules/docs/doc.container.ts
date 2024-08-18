import { Container } from 'inversify';
import { ControllerInterface } from '../../types';
import { DocController } from './doc.controller.js';
import { ApplicationComponents } from '../../core/dictionary/app.js';

export function createDocsContainer(): Container {
    const docsContainer = new Container();
    docsContainer
        .bind<ControllerInterface>(ApplicationComponents.DocController)
        .to(DocController)
        .inSingletonScope();

    return docsContainer;
}
