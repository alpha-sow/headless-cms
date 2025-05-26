import type Credential from "@/models/Credential";
import axios from "axios";
import { getItem, removeItem, setItem } from "@/services/LocalStorage";
import type { UserInfo } from "@/models/UserInfo";
import type User from "@/models/User";

export const HEADLESS_CMS_USER_CREDENTIAL_KEY =
  "HEADLESS_CMS_USER_CREDENTIAL_KEY";
export const HEADLESS_CMS_USER_INFO_KEY = "HEADLESS_CMS_USER_INFO_KEY";

export function currentCredential(): Credential | null {
  return JSON.parse(getItem(HEADLESS_CMS_USER_CREDENTIAL_KEY) ?? "null");
}

export function currentUser(): User | null {
  return JSON.parse(getItem(HEADLESS_CMS_USER_INFO_KEY) ?? "null");
}

export async function authenticationCredentialWithBasicAuth(
  username: string,
  password: string
): Promise<Credential> {
  return axios
    .post<Credential, any>(
      "/api/credential",
      {},
      {
        headers: {
          Authorization: `Basic ${btoa(username + ":" + password)}`,
        },
      }
    )
    .then((response) => {
      setItem(HEADLESS_CMS_USER_CREDENTIAL_KEY, JSON.stringify(response.data));
      return response.data;
    });
}

export async function authenticationUser(): Promise<UserInfo> {
  return axios
    .get<UserInfo>("/api/authentication", {
      headers: {
        Authorization: `Bearer ${currentCredential()?.accessToken ?? ""}`,
      },
    })
    .then((response) => {
      setItem(HEADLESS_CMS_USER_INFO_KEY, JSON.stringify(response.data));
      return response.data;
    });
}

export function logout() {
  removeItem(HEADLESS_CMS_USER_CREDENTIAL_KEY);
  removeItem(HEADLESS_CMS_USER_INFO_KEY);
}
