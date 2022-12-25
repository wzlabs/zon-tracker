import type { uuid } from "../types";

export interface Tracking {
  id: uuid;
  user_id: uuid;
  work_day: number;
  start_time: number;
  nb_of_seconds?: number;
  screenshots?: string;
  ref_id?: uuid;
}

export interface NewTracking {
  user_id: uuid;
  work_day: number;
  start_time: number;
  nb_of_seconds?: number;
  screenshots?: string;
  ref_id?: uuid;
}

export interface ExistingTracking {
  id: uuid;
}
