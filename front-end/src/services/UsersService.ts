import axios from "axios";
import { currentCredential } from "@/services";
import type { UserInfo, PageResponse } from "@/models";

export async function fetchAllUsers(): Promise<PageResponse<UserInfo>> {
  return axios
    .get<PageResponse<UserInfo>>("/api/users", {
      headers: {
        Authorization: `Bearer ${currentCredential()?.accessToken ?? ""}`,
      },
    })
    .then((response) => response.data);
}

export async function fetchUser(username: string): Promise<UserInfo> {
  return axios
    .get<UserInfo>(`/api/users/${username}`, {
      headers: {
        Authorization: `Bearer ${currentCredential()?.accessToken ?? ""}`,
      },
    })
    .then((response) => response.data);
}

export async function createUser(user: {
  username: string;
  password: string;
}): Promise<UserInfo> {
  return axios
    .post("/api/users", user, {
      headers: {
        Authorization: `Bearer ${currentCredential()?.accessToken ?? ""}`,
      },
    })
    .then((response) => response.data);
}

export async function deleteUser(username: string): Promise<void> {
  return axios
    .delete(`/api/users/${username}`, {
      headers: {
        Authorization: `Bearer ${currentCredential()?.accessToken ?? ""}`,
      },
    })
    .then(() => {});
}

export async function updatePhone(
  username: string,
  userPhone: { phone: string }
): Promise<UserInfo> {
  return axios
    .patch(`/api/users/${username}/phone`, userPhone, {
      headers: {
        Authorization: `Bearer ${currentCredential()?.accessToken ?? ""}`,
      },
    })
    .then((response) => response.data);
}

export async function updateAvatar(
  username: string,
  userAvatar: { avatar: File }
): Promise<UserInfo> {
  const formData = new FormData();
  formData.append("file", userAvatar.avatar);
  return axios
    .patch(`/api/users/${username}/avatar`, formData, {
      headers: {
        "Content-Type": "multipart/form-data",
        Authorization: `Bearer ${currentCredential()?.accessToken ?? ""}`,
      },
    })
    .then((response) => response.data);
}

export async function updateEnabled(
  username: string,
  userEnabled: { enabled: boolean }
): Promise<UserInfo> {
  return axios
    .patch(`/api/users/${username}/enabled`, userEnabled, {
      headers: {
        Authorization: `Bearer ${currentCredential()?.accessToken ?? ""}`,
      },
    })
    .then((response) => response.data);
}
