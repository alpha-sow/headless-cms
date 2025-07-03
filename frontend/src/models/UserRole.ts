export const UserRole = {
  ROLE_ADMIN: "admin",
  ROLE_GUEST: "guest",
  ROLE_USER: "user",
} as const;

export type UserRoleType = (typeof UserRole)[keyof typeof UserRole];
