export class CreateTrackingDto {
  user_id: string;
  work_day: number;
  start_time: number;
  nb_of_seconds: number;
  screenshots?: string;
  created_date: number;
}
