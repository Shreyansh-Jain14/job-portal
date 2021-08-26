import { USER_REPOSITORY } from '../constants';
import { Injectable, Inject, HttpService } from '@nestjs/common';
import { UserRepository } from '../repositories';
import { ListensTo } from '@squareboat/nest-events';
import { UserSignedUp } from '../events/userSignedUp';
import { User$Model } from '@app/_common';

@Injectable()
export class UserService {
  constructor(@Inject(USER_REPOSITORY) private users: UserRepository) {}

  async get(): Promise<Record<string, any>> {
    return this.users.getWhere({});
  }

  async getUserByEmail(email: string): Promise<Record<string, any>> {
    return this.users.firstWhere({ email });
  }
  async getById(id: string) {
    return this.users.firstWhere({ id });
  }

  async createUser(user: User$Model): Promise<User$Model> {
    return this.users.create(user);
  }
  async updateUser(user: User$Model): Promise<number> {
    return this.users.updateWhere({ id: user.id }, user);
  }
  @ListensTo('USER_SIGNED_UP')
  userSignedUp(event: UserSignedUp): void {
    console.log('EVENT RECEIVED ===>', event);
    // add your logic here
    return;
  }
}