export interface Customer {
    cx_id: number;
    cx_first_name: string;
    cx_last_name: string;
    cx_email: string;       
    cx_password: string;
    cx_phone?: string | null;
    cx_address?: string | null;
    cx_city: string;
    cx_postal_code: string;
  }
  