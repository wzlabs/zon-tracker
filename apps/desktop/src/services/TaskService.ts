// import Database from "tauri-plugin-sql-api";
// import type { QueryResult } from "tauri-plugin-sql-api";
// import { v4 } from "uuid";
// import DBService from "@/services/DBService";
import type { Task, NewTask } from "../models/Task";
import type { uuid, Nullable } from "../types";
import axios from "axios";

async function getTaskById(id: uuid): Promise<Task> {
  throw new Error();
}

async function filterTasks(payload: { assigneeId: uuid }): Promise<Task[]> {
  const res = await axios.get("/tasks/filter/" + payload.assigneeId);

  const data: Task[] = res.data as unknown as Task[];
  return data;
}

async function createTask(payload: NewTask): Promise<Task> {
  if (!payload || !payload.user_id) {
    throw new Error();
  }

  const res = await axios.post("/tasks", {
    user_id: payload.user_id,
    plan_id: payload.plan_id,
    assignee_id: payload.assignee_id,
    title: payload.title,
    desc: payload.desc,
  });

  const data: Task = res.data as unknown as Task;

  return data;
}

async function updateTask(task: Task): Promise<Task> {
  throw new Error();
}

async function removeTask(id: uuid): Promise<boolean> {
  throw new Error();
}

export default {
  getTaskById,
  filterTasks,
  createTask,
  updateTask,
  removeTask,
};
