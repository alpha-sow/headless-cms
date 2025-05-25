import type Credential from "@/models/Credential";
import axios from "axios";
import { getItem, removeItem, setItem } from "@/services/LocalStorage";

const HEADLESS_CMS_USER_CREDENTIAL_KEY = "HEADLESS_CMS_USER_CREDENTIAL_KEY";

export function currentCredential(): Credential | null {
  return JSON.parse(getItem(HEADLESS_CMS_USER_CREDENTIAL_KEY) ?? "null");
}

export async function basicAuth(
  username: string,
  password: string
): Promise<Credential> {
  return axios
    .post<Credential, any>(
      "/api/token",
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

export function logout() {
  removeItem(HEADLESS_CMS_USER_CREDENTIAL_KEY);
}
