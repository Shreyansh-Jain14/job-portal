
import { Job$Model } from '@app/_common';
import { Injectable, Inject, HttpService } from '@nestjs/common';
import { JOB_REPOSITORY } from '../constants';
import { JobRepository } from '../repositories/job/database';

@Injectable()
export class JobService {
  constructor(@Inject(JOB_REPOSITORY)  private jobs: JobRepository) {}

  async get(): Promise<Record<string, any>> {
    return this.jobs.all();
  } 

  // async getUserByEmail(email: string): Promise<Record<string, any>> {
  //   return this.jobs.firstWhere({ email });
  // }
  async getById(id: string) {
    return this.jobs.firstWhere({ id });
  }
 
  async createjob(job: Job$Model): Promise<Job$Model> {
    return this.jobs.create(job);
  }
  async updateUser(user: Job$Model): Promise<number> {
    return this.jobs.updateWhere({ id: user.id }, user);
  }
 
}