import { inject, injectable } from 'inversify';
import { BaseRepository } from '../../core/base-repository.abstract';
import { UserEntity } from './user.entity';
import { UserInterface } from '../../types';
import { Logger } from '../../core/logger.service';


@injectable()
export class UserRepository extends BaseRepository<UserEntity, UserInterface> {
    constructor(
        @inject(Logger) private readonly logger: Logger
    ) {
        super(UserEntity.fromObject);
        this.logger.log(`${UserRepository.name} has been initialized`);
    }

    public create(_data: UserEntity): Promise<UserEntity> {
        throw new Error('Not implemented');
    }

    public update(_id: string, _data: UserEntity): Promise<UserEntity> {
        throw new Error('Not implemented');
    }

    public findOne(_id: string): Promise<UserEntity> {
        throw new Error('Not implemented');
    }


}