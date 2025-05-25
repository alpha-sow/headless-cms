import axios from "axios";
import { currentCredential } from "@/services/AuthService";
import type { UserInfo } from "@/models/UserInfo";
import type { PageResponse } from "@/models/PageResponse";

export async function fetchAllUsers(): Promise<PageResponse<UserInfo>> {
  return axios
    .get<PageResponse<UserInfo>>("/api/users", {
      headers: {
        Authorization: `Bearer ${currentCredential()?.accessToken ?? ""}`,
      },
    })
    .then((response) => response.data);
}
