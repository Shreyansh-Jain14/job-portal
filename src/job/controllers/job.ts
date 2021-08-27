import { Request, Response, RestController, WithAlias } from '@libs/core';
import { Controller, Get, Req, Res } from '@nestjs/common';
import { UserDetailTransformer } from '@app/transformer';
import { JobService } from '../services/job';
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

@Controller('jobs')
export class JobController extends RestController {
  constructor(private jobservice: JobService) {
    super();
  }

  @Roles('CANDIDATE', 'RECRUITER')
  @Get( )
  async getAll() {
    const jobs= await this.jobservice.get();
    return {
      message: 'Jobs fetched successfully',
      jobs
    };

  }

  @Get(':id')
  async getById(@Param('id') id: string) {
    const jobs = await this.jobservice.getById(id);
    if (!jobs) throw new HttpException('job not found', 404);
    return jobs;
  }

  @Roles('RECRUITER')
   @UseGuards(JwtAuthGuard)
  @Post('addjob')
  create(@Req() req: Request & { user: User$Model }, @Body() body) {
    return this.jobservice.create({
      recruiterid: req.user.id,
      title: body.title,
      location: body.location,
      ctc: body.ctc
    });
  }

  @UseGuards(JwtAuthGuard)
  @Roles('RECRUITER')
  @Delete(':id')
  async delete(
    @Req() req: Request & { user: User$Model },
    @Param('id') jobId: string,
  ) {
    const deleted = await this.jobservice.delete({
      id: jobId,
      recruiterid: req.user.id,
    });
    if (deleted === null) throw new UnauthorizedException();
    return { deleted };
  }

  @Patch(':id')
  async uppdatejob(@Param('id') id: string, @Body() data: Job$Model) {
    await this.jobservice.update(id, data);
    return {
      statusCode: HttpStatus.OK,
      message: 'job updated successfully',
    };
  }
}