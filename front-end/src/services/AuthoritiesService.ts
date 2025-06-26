import axios from "axios";
import { currentCredential } from "@/services";
import type { UserRoleType, UserAuthority } from "@/models";

export async function fetchAuthorities(): Promise<UserRoleType[]> {
  const response = await axios.get<UserRoleType[]>("/api/authorities", {
    headers: {
      Authorization: `Bearer ${currentCredential()?.accessToken ?? ""}`,
    },
  });
  return response.data;
}

export async function updateRole(
  username: string,
  role: UserRoleType
): Promise<UserAuthority> {
  return axios
    .patch(
      `/api/authorities?username=${username}&role=${role}`,
      {},
      {
        headers: {
          Authorization: `Bearer ${currentCredential()?.accessToken ?? ""}`,
        },
      }
    )
    .then((response) => response.data);
}
