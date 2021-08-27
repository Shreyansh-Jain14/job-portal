import { ObjectionModel } from '@libs/core';
export type iRoles = 'ADMIN' | 'CANDIDATE' | 'RECRUITER';

export interface User$Model extends ObjectionModel {
  id?: string;
  name?: string;
  email?: string;
  role?: iRoles;
  password?: string;
  createdAt?: Date;
  updatedAt?: Date;
  
}
