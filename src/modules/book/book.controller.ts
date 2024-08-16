import { injectable, inject } from 'inversify';
import { Request, Response } from 'express';
import * as core from 'express-serve-static-core';
import { Controller } from '../../core/base-controller.abstract.js';
import { ApplicationComponents } from '../../core/dictionary/app.js';
import { HttpMethods } from '../../core/dictionary/http-methods.enum.js';
import { ApplicationConfigSchema, ConfigIntreface, LoggerInterface, Pagination } from '../../types';
import { ValidateDtoMiddleware } from '../../core/middlewares/validate-dto.middleware.js';
import { AuthenticationMiddleware } from '../../core/middlewares/authentication.middleware.js';
import { BookDTO } from './dto/book.dto.js';
import { BookService } from './book.service.js';
import { fillDTO } from '../../core/helpers/fill-dto.js';
import { BookRDO } from './rdo/book.rdo.js';
import { AdminMiddleware } from '../../core/middlewares/admin.middleware.js';
import { APPLICATION_ENTITY_LIMIT } from '../../core/dictionary/application.constants.js';
import { ValidateIdParamMiddleware } from '../../core/middlewares/validate-id-param.middleware.js';

@injectable()
export class BookController extends Controller {

    constructor(
        @inject(ApplicationComponents.Logger)
        protected readonly logger: LoggerInterface,
        @inject(ApplicationComponents.Config)
        private readonly config: ConfigIntreface<ApplicationConfigSchema>,
        @inject(ApplicationComponents.BookService)
        private readonly bookService: BookService
    ) {
        super(logger);

        this.logger.log('Routes registration for books controller...');

        this.addRoute({
            method: HttpMethods.Post,
            path: '/',
            handler: this.createBook,
            middlewares: [
                new AuthenticationMiddleware(this.config.get('SECRET_ACCESS_KEY')),
                new AdminMiddleware(),
                new ValidateDtoMiddleware(BookDTO),
            ]
        });

        this.addRoute({
            method: HttpMethods.Get,
            path: '/',
            handler: this.index,
            middlewares: []
        })

        this.addRoute({
            method: HttpMethods.Get,
            path: '/:id',
            handler: this.find,
            middlewares: [
                new ValidateIdParamMiddleware()
            ],
        });

        this.addRoute({
            method: HttpMethods.Put,
            path: '/:id',
            handler: this.updateBook,
            middlewares: [
                new AuthenticationMiddleware(this.config.get('SECRET_ACCESS_KEY')),
                new AdminMiddleware(),
                new ValidateDtoMiddleware(BookDTO),
                new ValidateIdParamMiddleware()
            ]
        });

        this.addRoute({
            method: HttpMethods.Delete,
            path: '/:id',
            handler: this.deleteBook,
            middlewares: [
                new ValidateIdParamMiddleware()
            ],
        });

        this.logger.log(`Routes are successfully registered for ${BookController.name}`);
        this.logger.log(`${BookController.name} has been initialized`);
    }

    public async index(
        { query }: Request,
        res: Response,
    ): Promise<void> {
        const pagination: Pagination = {
            limit: query['limit'] ? Number(query['limit']) : APPLICATION_ENTITY_LIMIT,
            page: query['page'] ? Number(query['page']) : 1,
        };
        
        const books = await this.bookService.getBooks(pagination);

        this.ok(res, books.map((book) => fillDTO(BookRDO, book.toObject())));
    }

    public async createBook(
        { body, user }: Request<Record<string, unknown>, Record<string, unknown>, BookDTO>,
        res: Response,
    ): Promise<void> {
        const book = await this.bookService.createBook(body, user.id);

        this.created(res, fillDTO(BookRDO, book.toObject()));
    }

    public async find(
        { params }: Request<core.ParamsDictionary | { id: string }>,
        res: Response,
    ): Promise<void> {
        const book = await this.bookService.findBook(params.id);

        return this.ok(res, fillDTO(BookRDO, book.toObject()));
    }

    public async updateBook(
        { body, user, params }: Request<core.ParamsDictionary | { id: string }, Record<string, unknown>, BookDTO>,
        res: Response,
    ): Promise<void> {
        const book = await this.bookService.updateBook(params.id, user.id, body);

        return this.ok(res, fillDTO(BookDTO, book.toObject()))
    }

    public async deleteBook(
        { params }: Request<core.ParamsDictionary | { id: string }>,
        res: Response,
    ): Promise<void> {
        await this.bookService.deleteBook(params.id);

        this.noContent(res, {
            message: `Book with id: ${params.id} has been successfully deleted`
        })
    }
}
