import { uuid } from "../types";

export interface Task {
  _id: uuid;
  plan_id: uuid;
  user_id: uuid;
  assignee_id: uuid;
  title: string;
  desc: string;
  completed: boolean;
  completed_date: number;
  created_date: number;
  ref_id: uuid;
}

export interface NewTask {
  plan_id?: uuid;
  user_id: uuid;
  assignee_id: uuid;
  title: string;
  desc: string;
  ref_id?: uuid;
}

export interface ExistingTask {
  _id: uuid;
}
