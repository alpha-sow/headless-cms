import { type Role } from "./Role";

export type UserInfo = {
  username: string;
  active: boolean;
  roles: Role;
};
