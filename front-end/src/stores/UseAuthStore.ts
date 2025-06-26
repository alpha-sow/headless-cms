import {
  authenticationUser,
  authenticationCredentialWithBasicAuth,
  currentCredential,
  currentUser,
  logout,
} from "@/services";
import { defineStore } from "pinia";
import type { Credential, UserInfo } from "@/models";
import { toast } from "vue-sonner";
import router from "@/router";

export const useAuthStore = defineStore("useAuthStore", {
  state: () => {
    return {
      credential: currentCredential() as Credential | null,
      user: currentUser() as UserInfo | null,
    };
  },
  actions: {
    async signInWithUsernameAndPassword(username: string, password: string) {
      try {
        this.credential = await authenticationCredentialWithBasicAuth(
          username,
          password
        );
        this.user = await authenticationUser();
        await router.push("/");
      } catch (error) {
        toast.error("Authentication failed", {
          description: "Please check your username and password.",
        });
      }
    },
    async logout() {
      logout();
      await router.push("/login");
    },
  },
});
