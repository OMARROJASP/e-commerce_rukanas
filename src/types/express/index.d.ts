// src/types/express/index.d.ts
import { CustomerEntity } from '../../entities/customer.entity'; 

declare global {
  namespace Express {
    interface Request {
      user?: CustomerEntity;
    }
  }
}

export {};
