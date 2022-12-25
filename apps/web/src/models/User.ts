import { uuid } from "../types";

export interface User {
  id: uuid;
  first_name: string;
  last_name: string;
  is_staff: boolean;
  is_active: boolean;
}
