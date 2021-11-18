import { Injectable } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { InjectRepository } from '@nestjs/typeorm';
import { ENVIRONMENT, ENV_KEYS, STATIC_USERS } from '@shared/common/constants';
import { Repository } from 'typeorm';
import { User } from './entities/user.entity';

@Injectable()
export class UsersService {
  constructor(
    @InjectRepository(User) private usersRepo: Repository<User>,
    private config: ConfigService,
  ) {}

  async findOne(username: string): Promise<User> {
    if (this.config.get(ENV_KEYS.ENVIRONMENT) === ENVIRONMENT.DEV) {
      return STATIC_USERS.find((x) => x.username == username);
    }

    return this.usersRepo.findOne({
      where: {
        username: username,
      },
    });
  }
}
