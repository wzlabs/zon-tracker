import { defineStore } from "pinia";
import Database from "tauri-plugin-sql-api";
import TrackingService from "../services/TrackingService";
import type {
  Tracking,
  NewTracking,
  ExistingTracking,
} from "../models/Tracking";
import type { uuid } from "../types";
import { formatDisplayTimeHMS } from "@/lib/utils";

let timerInterval;

export const useTrackingStore = defineStore("tracking", {
  state: () => {
    return {
      trackingList: [] as Tracking[],
      isWorking: false,
      strToday: "",
      totalSeconds: 0 as number,
      strPrevDay: "",
      totalPrevDaySeconds: 0 as number,
    };
  },
  getters: {
    all(state) {
      return state.trackingList as Tracking[];
    },
    worklist(state) {
      return state.trackingList.filter(
        (tracking: Tracking) => tracking.nb_of_seconds
      ) as Tracking[];
    },
    noneWorklist(state) {
      return state.trackingList.filter(
        (tracking: Tracking) => !tracking.nb_of_seconds
      ) as Tracking[];
    },
    displayStatus(state) {
      if (state.isWorking === true) {
        return "Working";
      } else {
        return "On Break";
      }
    },
    displayToday(state) {
      return formatDisplayTimeHMS(state.totalSeconds);
    },
    displayYesterday(state) {
      return formatDisplayTimeHMS(state.totalPrevDaySeconds);
    },
  },
  actions: {
    async createTracking(userId: uuid, workDay: number, nbOfSeconds: number) {
      const newTracking: NewTracking = {
        user_id: userId,
        work_day: workDay,
        nb_of_seconds: nbOfSeconds,
        start_time: new Date().getTime(),
      };
      await TrackingService.createTracking(newTracking);
    },
    async filterTracking(userId: uuid) {
      this.trackingList = await TrackingService.filterTracking(userId);
    },
    async updateTracking(tracking: Tracking) {
      await TrackingService.updateTracking(tracking);
      await this.filterTracking(tracking.user_id);
    },
    async removeTracking(id: uuid) {
      await TrackingService.removeTracking(id);
    },
    async setTime() {
      const newCurrDate = new Date();
      const strNewToday = newCurrDate.toISOString().split("T")[0];

      if (strNewToday != this.strToday) {
        await this.refreshSummary();
      }

      this.totalSeconds++;
      localStorage.setItem(this.strToday, this.totalSeconds + "");
    },
    async startWorking() {
      if (this.isWorking === true) {
        this.isWorking = false;

        localStorage.setItem(this.strToday, this.totalSeconds + "");
        if (timerInterval) {
          clearInterval(timerInterval);
        }
      } else {
        this.isWorking = true;
        timerInterval = setInterval(await this.setTime, 1000);
      }
    },
    async refreshSummary() {
      const currDate = new Date();
      this.strToday = currDate.toISOString().split("T")[0];
      this.strTodaySeconds = localStorage.getItem(this.strToday);

      const yesterday = new Date();
      yesterday.setDate(yesterday.getDate() - 1);
      this.strPrevDay = yesterday.toISOString().split("T")[0];
      this.strPrevDaySeconds = localStorage.getItem(this.strPrevDay);

      this.totalSeconds = this.strTodaySeconds
        ? parseInt(this.strTodaySeconds)
        : 0;
      this.totalPrevDaySeconds = this.strPrevDaySeconds
        ? parseInt(this.strPrevDaySeconds)
        : 0;
    },
  },
});
