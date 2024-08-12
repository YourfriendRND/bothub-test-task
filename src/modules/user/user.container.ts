import { Container } from 'inversify';

export function createUserContainer(): Container {
    const userContainer = new Container();

    return userContainer;
}
