import { Request, Response, RestController, WithAlias } from '@libs/core';
import { Controller, Get, Req, Res } from '@nestjs/common';
import { UserService } from '../services';
import { UserDetailTransformer } from '@app/transformer';

@Controller('users')
export class UserController extends RestController {
  constructor(private users: UserService) {
    super();
  }

  @Get()
  async getAll() {
    return await this.users.get();
  }
}
