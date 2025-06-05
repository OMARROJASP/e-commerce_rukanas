// src/types/express/index.d.ts

import { CustomerEntity } from '../../entities/customer.entity';

declare namespace Express {
  export interface Request {
    user?: CustomerEntity;
  }
}



// import { CustomerEntity } from '../../entities/customer.entity'; 

// declare global {
//   namespace Express {
//     interface Request {
//       user?: CustomerEntity;
//     }
//   }
// }

// export {};