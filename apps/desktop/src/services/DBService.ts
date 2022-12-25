import Database from "tauri-plugin-sql-api";
import { useDBStore } from "../stores/db";

let db: Database;

async function connect(): Promise<Database> {
  const dbStore = useDBStore();
  try {
    db = await Database.load("sqlite:test.db");
    dbStore.setDbConnectionString(db.path);
    console.log("sqlite zontrack connect......", db);
    return db;
  } catch (e) {
    console.log("sqlite zontrack connect error: ", e);
    // s.setErrorState(e);
    throw e;
  }
}
async function getDBConnect(): Promise<Database> {
  if (!db) {
    await connect();
  }
  return db;
}
export default {
  connect,
  getDBConnect,
};
