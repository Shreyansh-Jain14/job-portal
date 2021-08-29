import { Application$Model } from '@app/_common';
import { Injectable, Inject, HttpService } from '@nestjs/common';
import { APPLICATION_REPOSITORY } from '../constants';
import { v4 as uuidv4 } from 'uuid';
import { ApplicationRepository } from '../repositories/application/database';

@Injectable()
export class ApplicationService {
  constructor(@Inject(APPLICATION_REPOSITORY)  private applicationservice: ApplicationRepository) {}

  async get(): Promise<Record<string, any>> {
    return this.applicationservice.all();
  } 

  // async getUserByEmail(email: string): Promise<Record<string, any>> {
  //   return this.jobs.firstWhere({ email });
  // }
  async getById(id: string): Promise<Application$Model | null> {
    try {
      const job = await this.applicationservice.firstWhere({ id });
      return job;
    } catch {
      return null;
    }}
 
  async createjob(job: Application$Model): Promise<Application$Model> {
    return this.applicationservice.create(job);
  }
  // async updateUser(user: Application$Model): Promise<number> {
  //   return this.jobs.updateWhere({ id: user.id }, user);
  // }

  create(data: Application$Model): Promise<Application$Model | null> {
    try {
      data.id = uuidv4();
      return this.applicationservice.create(data);
    } catch {
      return null;
    }
  }
  async update(id: string, data: Application$Model) {
    await this.applicationservice.update({ id }, data);
    return await this.applicationservice.getWhere({ id });
  }
  
  async delete(
    where: Application$Model  ): Promise<boolean | null> {
        try {
          const deleted = await this.applicationservice.deleteWhere(where);
          return deleted;
        } catch {
          return null;
        }
      }
 
}