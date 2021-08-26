
import { Injectable } from '@nestjs/common';
import { DatabaseRepository as DB, InjectModel } from '@libs/core';
import { JobRepositoryContract } from './contract';
import { Job$Model } from '@app/_common';
import { JobModel } from '@app/job/models';

@Injectable()
export class JobRepository
  extends DB<Job$Model>
  implements JobRepositoryContract
{
  @InjectModel(JobModel)
  model: JobModel;
}
