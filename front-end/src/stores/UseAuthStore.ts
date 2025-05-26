import {
  authenticationUser,
  authenticationCredentialWithBasicAuth,
  currentCredential,
  currentUser,
  logout,
} from "@/services/AuthService";
import { defineStore } from "pinia";
import type Credential from "@/models/Credential";
import { toast } from "vue-sonner";
import router from "@/router";
import type { UserInfo } from "@/models/UserInfo";

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
