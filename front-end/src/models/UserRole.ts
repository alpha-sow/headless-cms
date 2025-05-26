export const UserRole = {
  ROLE_ADMIN: "admin",
  ROLE_GUEST: "guest",
} as const;

export type UserRoleType = (typeof UserRole)[keyof typeof UserRole];

export function userRole(value: UserRoleType): string {
  return UserRole[value as keyof typeof UserRole];
}
