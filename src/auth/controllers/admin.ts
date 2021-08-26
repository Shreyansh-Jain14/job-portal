import { UserService } from '@app/user';
import { UserRepository } from '@app/user/repositories';
import { User$Model } from '@app/_common';
import { RestController, Unauthorized } from '@libs/core';
import { Get } from '@nestjs/common';
import { Controller, Post, Req, UseGuards } from '@nestjs/common';
import { Request } from 'express';
import { LocalAuthGuard } from '../guards/local.auth.guard';

import { AuthService } from '../services';

@Controller('admin')
export class AdminAuthController extends RestController {
  constructor(private authService: AuthService,private users:UserService) {
    super();
  }
  @Get('users')
  async getAll() {
    return await this.users.get();
  }
  @UseGuards(LocalAuthGuard)
  @Post('auth/login')
  login(@Req() req: Request & { user: User$Model }) {
    if (req.user.role !== 'ADMIN') throw new Unauthorized();
    return this.authService.login(req.user);
  }
}