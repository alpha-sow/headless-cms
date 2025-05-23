import { basicAuth, logout } from "@/services/AuthService";
import { defineStore } from "pinia";
import type Credential from "@/models/Credential";
import { toast } from "vue-sonner";
import router from "@/router";

export const useAuthStore = defineStore("useAuthStore", {
  state: () => {
    return {
      credential: null as Credential | null,
      user: null,
    };
  },
  actions: {
    async signInWithUsernameAndPassword(username: string, password: string) {
      try {
        this.credential = await basicAuth(username, password);
        await router.push("/");
      } catch (error) {
        toast.error("Authentication failed", {
          description: "Please check your username and password.",
        });
      }
    },
    async getCurrentUser() {},
    async logout() {
      try {
        logout();
        await router.push("/login");
      } catch {
        toast({
          title: "Log out error",
          variant: "destructive",
        });
      }
    },
  },
});
