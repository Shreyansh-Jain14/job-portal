import { Request, Response, RestController, WithAlias } from '@libs/core';
import { Controller, Get, Req, Res } from '@nestjs/common';
import { UserDetailTransformer } from '@app/transformer';
import { Post } from '@nestjs/common';
import { Body } from '@nestjs/common';
import { Job$Model, User$Model } from '@app/_common';
import { Param } from '@nestjs/common';
import { HttpException } from '@nestjs/common';
import { Patch } from '@nestjs/common';
import { HttpStatus } from '@nestjs/common';
import { Roles } from '@app/_common/guards/roles.decorator';
import { UseGuards } from '@nestjs/common';
import { JwtAuthGuard } from '@app/auth/guards/jwt.auth.guard';
import { Delete } from '@nestjs/common';
import { UnauthorizedException } from '@nestjs/common';
import { ApplicationService } from '../services/application';

@Controller('app')
export class ApplicationController extends RestController {
  constructor(private applicationservice: ApplicationService) {
    super();
  }

  @Roles('CANDIDATE', 'RECRUITER')
  @Get( )
  async getAllapp() {
    const applications= await this.applicationservice.get();
    return {
      message: 'applications fetched successfully',
      applications
    };

  }

  @Get(':id')
  async getById(@Param('id') id: string) {
    const app = await this.applicationservice.getById(id);
    if (!app) throw new HttpException('application not found', 404);
    return app;
  }

  @Roles('CANDIDATE')
   @UseGuards(JwtAuthGuard)
  @Post('apply')
  create(@Req() req: Request & { user: User$Model }, @Body() body) {
    return this.applicationservice.create({
      userId: req.user.id,
      jobId: body.jobid,
    });
  }

  // @UseGuards(JwtAuthGuard)
  // @Roles('RECRUITER')
  @Delete(':id')
  async delete(
    @Param('id') jobId: string,
  ) {
    const deleted = await this.applicationservice.delete({
      id: jobId,
    });
    if (deleted === null) throw new UnauthorizedException();
    return { deleted };
  }

  // @Patch(':id')
  // async uppdatejob(@Param('id') id: string, @Body() data: Job$Model) {
  //   await this.applicationservice.update(id, data);
  //   return {
  //     statusCode: HttpStatus.OK,
  //     message: 'job updated successfully',
  //   };
  // }
}