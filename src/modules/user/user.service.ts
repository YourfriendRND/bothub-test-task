import { inject, injectable } from 'inversify';
//import { UserRepository } from './user.repository';
import { Logger } from '../../core/logger.service';

@injectable()
export class UserService {
    constructor(
        //@inject(UserRepository) private readonly userRepository: UserRepository,
        @inject(Logger) private readonly logger: Logger
    ) {
        this.logger.log(`${UserService.name} has been initialized`);
    }


}