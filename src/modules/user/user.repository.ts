import { inject, injectable } from 'inversify';
import { BaseRepository } from '../../core/base-repository.abstract.js';
import { UserEntity } from './user.entity.js';
import { UserInterface } from '../../types';
import { Logger } from '../../core/logger.service.js';
import { ApplicationComponents } from '../../core/dictionary/app.js';

@injectable()
export class UserRepository extends BaseRepository<UserEntity, UserInterface> {
    constructor(
        @inject(ApplicationComponents.Logger) 
        private readonly logger: Logger
    ) {
        super(UserEntity.fromObject);
        this.logger.log(`${UserRepository.name} has been initialized`);
    }

    public async findByEmail(email: string): Promise<UserEntity | null> {
        const user = await this.client.user.findFirst({
            where: {
                email
            }
        });
        
        if (user) {
            return this.createEntityFromDocument(user);
        }

        return null;
    }

    public async create(data: UserEntity): Promise<UserEntity> {
        const user = await this.client.user.create({
            data: {
                ...data
            }
        });
        
        return this.createEntityFromDocument(user);
        
    }

    public async update(id: string, data: UserEntity): Promise<UserEntity> {
        const user = await this.client.user.update({
            where: {
                id
            },
            data,
        });

        return this.createEntityFromDocument(user);
    }

    public async findOne(id: string): Promise<UserEntity | null> {
        const user = await this.client.user.findUnique({
            where: {
                id
            }
        });

        if (user) {
            return this.createEntityFromDocument(user);
        }

        return null;
    }


}