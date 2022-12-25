export type uuid = string;
export type Nullable<T> = T | null;
export type Token = {
  token: string;
  userId: uuid;
  expiresIn?: number;
  tokenExpiration?: number;
  refreshToken?: string;
  loginProvider?: string;
  userData?: unknown;
};
export type TaskFilter = "all" | "completed" | "incomplete";
