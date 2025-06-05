import { Request } from 'express';
import { CustomerEntity } from '../../entities/customer.entity';

export interface AuthenticatedRequest extends Request {
  user?: CustomerEntity;
}