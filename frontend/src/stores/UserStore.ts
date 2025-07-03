import { defineStore } from "pinia";
import type { UserInfo } from "@/models";

export const useUserStore = defineStore("useUserStore", {
  state: () => ({
    user: null as UserInfo | null,
  }),
});
