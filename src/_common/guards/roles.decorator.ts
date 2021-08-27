import { SetMetadata } from '@nestjs/common';
import { iRoles } from '../interfaces/user';

export const Roles = (...roles: iRoles[]) => SetMetadata('roles', roles);