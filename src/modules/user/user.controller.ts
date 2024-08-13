import { Request, Response } from 'express';
import { inject, injectable } from 'inversify';
import { Controller } from '../../core/base-controller.abstract.js';
import { ApplicationComponents } from '../../core/dictionary/app.js';
import { LoggerInterface } from '../../types';
import { HttpMethods } from '../../core/dictionary/http-methods.enum.js';
import { UserService } from './user.service.js';
import CreatedUserDTO from './dto/created-user.dto.js';
import { ValidateDtoMiddleware } from '../../core/middlewares/validate-dto.middleware.js';
import { fillDTO } from '../../core/helpers/fill-dto.js';
import { UserRDO } from './rdo/user.rdo.js';
import { LoginUserDTO } from './dto/login-user.dto.js';
import { UserAccessRDO } from './rdo/user-access.rdo.js';

@injectable()
export class UserController extends Controller {
    constructor(
        @inject(ApplicationComponents.Logger) 
        protected readonly logger: LoggerInterface,
        @inject(ApplicationComponents.UserService)
        private readonly userService: UserService,
    ) {
        super(logger);

        this.logger.log('Routes registration for users controller...');

        this.addRoute({
            path: '/register',
            method: HttpMethods.Post,
            handler: this.registerUser,
            middlewares: [
                new ValidateDtoMiddleware(CreatedUserDTO)
            ]
        });

        this.addRoute({
            path: '/login',
            method: HttpMethods.Post,
            handler: this.login,
            middlewares: [
                new ValidateDtoMiddleware(LoginUserDTO)
            ]
        })

        this.addRoute({
            path: '/me',
            method: HttpMethods.Get,
            handler: this.checkUser,
            middlewares: []
        })

        this.addRoute({
            path: '/:id/role',
            method: HttpMethods.Put,
            handler: this.changeUserRole,
            middlewares: []
        })

        this.logger.log(`${UserController.name} has been initialized`);
    }

    public async registerUser(
        { body }: Request<Record<string, unknown>, Record<string, unknown>, CreatedUserDTO>,
        res: Response,
    ): Promise<void> {
        const createdUser = await this.userService.registerUser(body);

        const response = fillDTO(UserRDO, createdUser.toObject());
        
        this.created(res, response);
    }

    public async login(
        { body }: Request<Record<string, unknown>, Record<string, unknown>, LoginUserDTO>,
        res: Response,
    ): Promise<void> {
        const userAccess = await this.userService.loginUser(body);

        this.ok(res, fillDTO(UserAccessRDO, { ...userAccess }));
    }

    public async checkUser(): Promise<void> {}

    public async changeUserRole(): Promise<void> {}
}