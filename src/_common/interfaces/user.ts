import { ObjectionModel } from '@libs/core';

export interface User$Model extends ObjectionModel {
  id?: string;
  name?: string;
  email?: string;
  role?: string;
  password?: string;
  createdAt?: Date;
  updatedAt?: Date;
  
}
