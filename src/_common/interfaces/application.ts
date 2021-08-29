import { ObjectionModel } from '@libs/core';


export interface Application$Model extends ObjectionModel {
  id?: string;
  jobId?: string;
  userId?: string;
  createdAt?: Date;
  updatedAt?: Date;
  
}