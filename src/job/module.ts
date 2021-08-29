import { Module, HttpModule } from '@nestjs/common';
import { JOB_REPOSITORY } from './constants';
import { JobController } from './controllers/job';
import { JobRepository } from './repositories';
import { JobService } from './services/job';


@Module({
  imports: [HttpModule],
  controllers: [JobController],
  providers: [
    JobService,JobRepository,
    { provide: JOB_REPOSITORY, useClass: JobRepository },
  ],
  exports: [JobService,JobRepository],
})
export class JobModule {}