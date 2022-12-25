import Database from "tauri-plugin-sql-api";
import { defineStore } from "pinia";
import DBService from "@/services/DBService";

function localOnly() {
  console.warn(`local storage updated but there is no DB connection`);
}

export const useDBStore = defineStore("database", {
  state: () => {
    return {
      ready: false,
      dbError: undefined as string | undefined,
      dbConnectionString: "",
      conn: undefined as Database | undefined,
    };
  },
  actions: {
    async initializeDbBackedStore() {
      try {
        this.conn = await DBService.connect();
        this.ready = true;
      } catch (e) {
        this.dbError = `Failed to connect to DB: ${e}`;
        console.log(this.dbError);
        this.ready = false;
        throw e;
      }
    },
    async getDBConnect() {
      if (!this.conn) {
        await this.initializeDbBackedStore();
      }
      return this.conn;
    },
    setErrorState(err: string) {
      this.dbError = err;
    },
    setDbConnectionString(connect: string) {
      this.dbConnectionString = connect;
    },
    setDbError(err: string) {
      this.dbError = err;
    },
  },
});
