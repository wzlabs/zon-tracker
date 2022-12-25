// import Database from "tauri-plugin-sql-api";
import { defineStore } from "pinia";
import TaskService from "../services/TaskService";
import type { Task, NewTask } from "../models/Task";
import type { uuid, Nullable } from "../types";

function localOnly() {
  console.warn(`local storage updated but there is no DB connection`);
}

export const useTaskStore = defineStore("tasks", {
  state: () => {
    return {
      tasks: [] as Task[],
    };
  },
  getters: {
    all(state) {
      return state.tasks as Task[];
    },
    completed(state) {
      return state.tasks.filter((task: Task) => task.completed) as Task[];
    },
    incomplete(state) {
      return state.tasks.filter((task: Task) => !task.completed) as Task[];
    },
  },
  actions: {
    async createTask(payload: NewTask) {
      const createdTask: Task = await TaskService.createTask(payload);
      if (createdTask) {
        this.tasks.push(createdTask);
      }
    },
    async filterTasks(payload: { userId?: uuid; assigneeId: uuid }) {
      try {
        this.tasks = await TaskService.filterTasks(payload);
      } catch (e) {
        console.log(e.message);
      }
    },
    async markFinished(task: Task) {
      const updatedTask = { ...task, completed: true };
      try {
        await TaskService.updateTask(updatedTask);
        this.tasks = this.tasks.map((t: Task) =>
          t._id === task._id ? updatedTask : t
        );
      } catch (e) {
        localOnly();
      }
    },
    async markIncomplete(task: Task) {
      const updatedTask = { ...task, completed: false };
      try {
        await TaskService.updateTask(updatedTask);
        this.tasks = this.tasks.map((t: Task) =>
          t._id === task._id ? updatedTask : t
        );
      } catch (e) {
        localOnly();
      }
    },
    async removeTask(id: uuid) {
      try {
        await TaskService.removeTask(id);
        this.tasks = this.tasks.filter((t: Task) => t._id !== id);
      } catch (e) {
        localOnly();
      }
    },
  },
});
