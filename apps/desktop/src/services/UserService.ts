import axios from "axios";
import type { User } from "@/models/User";
import type { uuid, Token } from "@/types";
import config from "../config/config";

async function signIn(payload: {
  email: string;
  password: string;
}): Promise<Token> {
  // Fetch
  // const fres = await fetch(config.apiUrl + "/auth/login", {
  //   // Adding method type
  //   method: "POST",
  //   // Adding body or contents to send
  //   body: JSON.stringify({
  //     username: payload.email,
  //     password: payload.password,
  //   }),
  //   // Adding headers to the request
  //   headers: {
  //     "Content-type": "application/json; charset=UTF-8",
  //   },
  // });

  // const json = fres.json();
  // console.log("json.......", json);

  // Axios
  const res = await axios.post("/auth/login", {
    username: payload.email,
    password: payload.password,
  });

  const data = res.data;

  const token: Token = {
    token: data.accessToken,
    userId: data.userId,
    loginProvider: data.LoginProvider,
    refreshToken: "",
    userData: data.userData,
  };

  return token;
}

async function logout(): Promise<boolean> {
  // Implement later

  return true;
}

export default {
  signIn,
  logout,
};
