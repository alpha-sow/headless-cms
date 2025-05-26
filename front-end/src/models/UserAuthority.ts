import type { UserRoleType } from "@/models/UserRole";

export type UserAuthority = {
  username: string;
  authority: UserRoleType;
};
