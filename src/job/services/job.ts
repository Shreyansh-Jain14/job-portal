
import { Job$Model } from '@app/_common';
import { Injectable, Inject, HttpService } from '@nestjs/common';
import { JOB_REPOSITORY } from '../constants';
import { JobRepository } from '../repositories/job/database';
import { v4 as uuidv4 } from 'uuid';

@Injectable()
export class JobService {
  constructor(@Inject(JOB_REPOSITORY)  private jobs: JobRepository) {}

  async get(): Promise<Record<string, any>> {
    return this.jobs.all();
  } 

  // async getUserByEmail(email: string): Promise<Record<string, any>> {
  //   return this.jobs.firstWhere({ email });
  // }
  async getById(id: string): Promise<Job$Model | null> {
    try {
      const job = await this.jobs.firstWhere({ id });
      return job;
    } catch {
      return null;
    }}
 
  async createjob(job: Job$Model): Promise<Job$Model> {
    return this.jobs.create(job);
  }
  // async updateUser(user: Job$Model): Promise<number> {
  //   return this.jobs.updateWhere({ id: user.id }, user);
  // }

  create(data: Job$Model): Promise<Job$Model | null> {
    try {
      data.id = uuidv4();
      return this.jobs.create(data);
    } catch {
      return null;
    }
  }
  async update(id: string, data: Job$Model) {
    await this.jobs.update({ id }, data);
    return await this.jobs.getWhere({ id });
  }
  
  async delete(
    where: Job$Model  ): Promise<boolean | null> {
        try {
          const deleted = await this.jobs.deleteWhere(where);
          return deleted;
        } catch {
          return null;
        }
      }
 
}