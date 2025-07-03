import { UserRole, type UserRoleType } from "@/models";

export const sidebarAdminRoleKeys: string[] = ["dashboard", "profile", "users"];
export const sidebarUserRoleKeys: string[] = ["dashboard", "profile"];

export function userRole(value: UserRoleType): string {
  return UserRole[value as keyof typeof UserRole];
}
