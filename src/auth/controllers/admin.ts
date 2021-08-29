import { JobService } from '@app/job';
import { UserService } from '@app/user';
import { User$Model } from '@app/_common';
import { Roles } from '@app/_common/guards/roles.decorator';
import { RestController, Unauthorized } from '@libs/core';
import { Param } from '@nestjs/common';
import { Delete } from '@nestjs/common';
import { Get } from '@nestjs/common';
import { Controller, Post, Req, UseGuards } from '@nestjs/common';
import { Request } from 'express';
import { JwtAuthGuard } from '../guards/jwt.auth.guard';
import { LocalAuthGuard } from '../guards/local.auth.guard';

import { AuthService } from '../services';

@Controller('admin')
export class AdminAuthController extends RestController {
  constructor(private authService: AuthService,private users:UserService,private jobservice:JobService) {
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

 
  @UseGuards(JwtAuthGuard)
  @Delete('jobs/:id')
  async deletejob(@Param('id') jobId: string) {
    const deleted = await this.jobservice.delete({ id: jobId });
    return { deleted };
  }

  @UseGuards(JwtAuthGuard)
  @Delete('users/:id')
  async deleteuser(@Param('id') userid: string) {
    const deleted = await this.users.deleteuser({ id: userid });
    return { deleted };
  }
  @Get('jobs')
  async getAlljobs() {
    return await this.jobservice.get();
  }
}