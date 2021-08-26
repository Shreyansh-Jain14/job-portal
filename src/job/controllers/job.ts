import { Request, Response, RestController, WithAlias } from '@libs/core';
import { Controller, Get, Req, Res } from '@nestjs/common';
import { UserDetailTransformer } from '@app/transformer';
import { JobService } from '../services/job';
import { Post } from '@nestjs/common';
import { Body } from '@nestjs/common';
import { Job$Model } from '@app/_common';

@Controller('jobs')
export class JobController extends RestController {
  constructor(private jobs: JobService) {
    super();
  }


  @Get()
  async getAll() {
    const jobs= await this.jobs.get();
    return {
      message: 'Jobs fetched successfully',
      jobs
    };

  }
  @Post('addjob')
  async createJob(@Body() data:Job$Model) {
    const jobs = await this.jobs.createjob(data)
    return {
      message: 'Job addded successfully',
      jobs
    };
  }
}