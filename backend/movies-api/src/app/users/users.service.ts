import { Injectable } from '@nestjs/common';
import { STATIC_USERS } from '@shared/common/constants';

// This should be a real class/interface representing a user entity
export type User = any;

@Injectable()
export class UsersService {
  private readonly users = STATIC_USERS;

  async findOne(username: string): Promise<User | undefined> {
    return this.users.find((user) => user.username === username);
  }
}
