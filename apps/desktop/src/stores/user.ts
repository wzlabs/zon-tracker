import { defineStore } from "pinia";
import UserService from "@/services/UserService";
import type { User } from "@/models/User";
import type { uuid, Token } from "@/types";
import axios from "axios";
import { setAuthorization } from "@/axios";

export const useUserStore = defineStore("user", {
  state: () => {
    return {
      user: null as unknown as User,
      userId: null as unknown as uuid,
      isAnonymousUser: true as boolean,
      isLoggedIn: false as boolean,
    };
  },
  getters: {
    currentUser(state) {
      return state.user;
    },
    currentUserId(state) {
      return state.userId;
    },
    currLoggedIn(state) {
      return state.isLoggedIn;
    },
  },
  actions: {
    async signUp(payload: {
      firstName: string;
      lastName?: string;
      email: string;
      password: string;
    }): Promise<User> {
      const newUser: User = await UserService.signUp(payload);
      return newUser;
    },
    async login(payload: { email: string; password: string }) {
      const resToken: Token = await UserService.signIn(payload);
      if (resToken.userData) {
        const userData = resToken.userData as User;
        this.user = {
          userId: userData.userId,
          firstName: userData.firstName,
          lastName: userData.lastName,
          isStaff: userData.isStaff,
          isActive: userData.isActive,
          isSuperuser: userData.isSuperuser,
          lastLogin: userData.lastLogin,
          dateJoined: userData.dateJoined,
        };
        this.user = { ...(resToken.userData as User) };
      } else {
        // Fetch to get the current user
      }

      if (this.user) {
        this.isLoggedIn = true;
        this.isAnonymousUser = false;

        setAuthorization(resToken.token);
        localStorage.setItem("token", resToken.token);
      } else {
        this.isLoggedIn = false;
        this.isAnonymousUser = true;
        setAuthorization("");
        localStorage.removeItem("token");
      }
    },
    async logout() {
      await UserService.logout();
      this.user = null;
      this.userId = null;
      this.isLoggedIn = false;
      this.isAnonymousUser = true;
      setAuthorization("");
      localStorage.removeItem("token");
    },
  },
});
