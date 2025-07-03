import type { Component } from "vue";
import {
  sidebarAdminRoleKeys,
  sidebarUserRoleKeys,
  userRole,
} from "./UserRole";
import { UserRole, type UserRoleType } from "@/models";

export type SidebarData = {
  key: string;
  title: string;
  urlName: string;
  icon: Component;
}[];

export function sideBarAccess(key: string, role: UserRoleType): boolean {
  switch (userRole(role)) {
    case UserRole.ROLE_ADMIN:
      return sidebarAdminRoleKeys.includes(key);
    case UserRole.ROLE_USER:
      return sidebarUserRoleKeys.includes(key);
    default:
      return sidebarUserRoleKeys.includes(key);
  }
}
