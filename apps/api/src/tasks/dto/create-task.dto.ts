export class CreateTaskDto {
  plan_id: string;
  user_id: string;
  assignee_id: string;
  title: string;
  desc: string;
  completed: boolean;
  completed_date: number;
  created_date: number;
}
