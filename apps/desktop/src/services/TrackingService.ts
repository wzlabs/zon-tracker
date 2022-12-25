// import Database from "tauri-plugin-sql-api";
// import type { QueryResult } from "tauri-plugin-sql-api";
// import { v4 } from "uuid";
// import DBService from "@/services/DBService";
import type {
  Tracking,
  NewTracking,
  ExistingTracking,
} from "../models/Tracking";
import type { uuid } from "../types";
import config from "@/config/config";
import axios from "axios";

async function filterTracking(
  userId: uuid,
  workDay?: number
): Promise<Tracking[]> {
  const res = await axios.post("/tracking/filter", {
    userId: userId,
    workDay: workDay,
  });

  const tracking: Tracking[] = res.data as unknown as Tracking[];

  return tracking;
}

async function createTracking(
  newTracking: NewTracking
): Promise<Tracking | null> {
  if (!newTracking.user_id) {
    return null;
  }

  throw new Error();
}

async function updateTracking(tracking: Tracking): Promise<Tracking> {
  throw new Error();
}

async function removeTracking(id: uuid): Promise<boolean> {
  throw new Error();
}

export default {
  filterTracking,
  createTracking,
  updateTracking,
  removeTracking,
};
