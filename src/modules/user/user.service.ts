import * as crypto from 'node:crypto';
import * as jose from 'jose';
import { inject, injectable } from 'inversify';
import { UserRepository } from './user.repository.js';
import { StatusCodes } from 'http-status-codes';
import { Logger } from '../../core/logger.service.js';
import CreatedUserDTO  from './dto/created-user.dto.js';
import { ApplicationComponents } from '../../core/dictionary/app.js';
import { UserEntity } from './user.entity.js';
import { HttpError } from '../../core/errors/http-error.js';
import { ApplicationConfigSchema, ConfigIntreface, TokenPayload, MailInterface } from '../../types';
import { LoginUserDTO } from './dto/login-user.dto.js';

@injectable()
export class UserService {
    constructor(
        @inject(ApplicationComponents.UserRepository) 
        private readonly userRepository: UserRepository,
        @inject(ApplicationComponents.Logger) 
        private readonly logger: Logger,
        @inject(ApplicationComponents.Config)
        private readonly config: ConfigIntreface<ApplicationConfigSchema>,
        @inject(ApplicationComponents.Mail)
        private readonly mailService: MailInterface
    ) {
        this.logger.log(`${UserService.name} has been initialized`);
    }

    private createSHA256(pass: string, salt: string): string {
        const shaHasher = crypto.createHmac('sha256', salt);
        return shaHasher.update(pass).digest('hex');
    };

    private comparePassword(userPassword: string, passwordHash: string): boolean {
        const userPasswordHash = this.createSHA256(userPassword, this.config.get('SALT'));
        return userPasswordHash === passwordHash;
    }

    private async createJWT<T extends TokenPayload>(algorithm: string, jwtSecret: string, payload: T): Promise<string> {
        return new jose
            .SignJWT({ ...payload })
            .setProtectedHeader({ alg: algorithm })
            .setIssuedAt()
            .setExpirationTime('10h')
            .sign(crypto.createSecretKey(jwtSecret, 'utf-8'));
    }

    private createConfirmationLink(key: string): string {
        return `${this.config.get('APPLICATION_URL')}/users/activate/${key}`;
    }

    public async findUserByEmail(email: string): Promise<UserEntity | null> {
        return await this.userRepository.findByEmail(email);
    }

    public async findUserById(id: string): Promise<UserEntity> {
        const user = await this.userRepository.findOne(id);

        if (!user) {
            throw new HttpError(
                StatusCodes.NOT_FOUND,
                `User with id: ${id} not found`,
                `[${UserService.name}]`
            )
        }

        return user;
    }

    public async registerUser(createdUser: CreatedUserDTO): Promise<UserEntity> {
        const existUser = await this.findUserByEmail(createdUser.email);
        if (existUser) {
            throw new HttpError(
                StatusCodes.CONFLICT,
                `User with email: ${createdUser.email} already exist`,
                `${UserService.name}`
            );
        }

        const passwordHash = this.createSHA256(createdUser.password, this.config.get('SALT'));
        const user = new UserEntity({
            username: createdUser.username,
            email: createdUser.email,
            passwordHash,
            isAdmin: false,
            isEmailConfirmed: false,
            emailConfirmationKey: crypto.randomUUID(),
        });

        const createdUserEntity = await this.userRepository.create(user);

        if (createdUserEntity) {
            const link = this.createConfirmationLink(createdUserEntity.emailConfirmationKey);
            await this.mailService.sendActivateEmail(createdUserEntity.email, link);
        }

        return createdUserEntity;

    }

    public async loginUser({ email, password }: LoginUserDTO): Promise<{ accessToken: string }> {
        const user = await this.userRepository.findByEmail(email);

        if (!user) {
            throw new HttpError(
                StatusCodes.NOT_FOUND,
                `User with ${email} not found`,
                `${UserService.name}`
            )
        }

        const isPasswordCorrect = this.comparePassword(password, user.passwordHash);

        if (!isPasswordCorrect) {
            throw new HttpError(
                StatusCodes.UNAUTHORIZED,
                `Sorry, password is not correct`,
                `${UserService.name}`
            );
        }

        const accessToken = await this.createJWT<TokenPayload>('HS256', this.config.get('SECRET_ACCESS_KEY'), {
            id: user.id!,
            registrationDate: user.registrationDate!,
        });

        return {
            accessToken
        }
    }

    public async changeRole(adminId: string, userId: string): Promise<UserEntity> {
        const user = await this.findUserById(userId);
        user.isAdmin = !user.isAdmin;
        user.updatedBy = adminId;

        return await this.userRepository.update(userId, user);
    }

    public async activateUser(key: string) {
        if (!key) {
            throw new HttpError(
                StatusCodes.BAD_REQUEST,
                `The activation key was not transmitted`,
                `[${UserService.name}]`
            );
        }

        const user = await this.userRepository.findUserByConfirmedKey(key);

        if (!user?.id) {
            throw new HttpError(
                StatusCodes.NOT_FOUND,
                `User not found`,
                `[${UserService.name}]`
            )
        }

        user.isEmailConfirmed = true;
        const updatedUser = await this.userRepository.update(user.id, user);

        return updatedUser;
        
    }
}