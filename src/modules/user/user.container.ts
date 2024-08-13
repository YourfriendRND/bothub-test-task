import { Container } from 'inversify';
import { UserController } from './user.controller.js';
import { ControllerInterface, RepositoryInterface } from '../../types';
import { ApplicationComponents } from '../../core/dictionary/app.js';
import { UserService } from './user.service.js';
import { UserRepository } from './user.repository.js';
import { UserEntity } from './user.entity.js';

export function createUserContainer(): Container {
    const userContainer = new Container();

    userContainer
        .bind<ControllerInterface>(ApplicationComponents.UserController)
        .to(UserController)
        .inSingletonScope();
    
    userContainer
        .bind<UserService>(ApplicationComponents.UserService)
        .to(UserService)
        .inSingletonScope();

    userContainer
        .bind<RepositoryInterface<UserEntity>>(ApplicationComponents.UserRepository)
        .to(UserRepository)
        .inSingletonScope();


    return userContainer;
}
