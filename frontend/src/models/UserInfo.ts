import type { UserAuthority } from "@/models/UserAuthority";

export type UserInfo = {
  username: string;
  enabled: boolean;
  avatar?: string;
  phone?: string;
  authorities: UserAuthority[];
};
