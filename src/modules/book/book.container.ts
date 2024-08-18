import { Container } from 'inversify';
import { ApplicationComponents } from '../../core/dictionary/app.js';
import { BookController } from './book.controller.js';
import { ControllerInterface, RepositoryInterface } from '../../types';
import { BookService } from './book.service.js';
import { BookInterface } from '../../types/entities/book.interface.js';
import { BookRepository } from './book.repository.js';
import { BookEntity } from './book.entity.js';

export function createBookContainer(): Container {
    const bookContainer = new Container();

    bookContainer
        .bind<ControllerInterface>(ApplicationComponents.BookController)
        .to(BookController)
        .inSingletonScope();

    bookContainer
        .bind<BookService>(ApplicationComponents.BookService)
        .to(BookService)
        .inSingletonScope();

    bookContainer
        .bind<RepositoryInterface<BookEntity, BookInterface>>(ApplicationComponents.BookRepository)
        .to(BookRepository)
        .inSingletonScope()

    return bookContainer;
}
