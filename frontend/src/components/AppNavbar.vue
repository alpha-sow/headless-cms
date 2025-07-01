<script setup lang="ts">
import { Sun, Moon } from "lucide-vue-next";
import { useColorMode } from "@vueuse/core";
import { Button } from "@/components/ui/button";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { LogOut, CircleUser } from "lucide-vue-next";
import { useRouter } from "vue-router";
import { useI18n } from "vue-i18n";
import { useMutation, useQuery } from "@tanstack/vue-query";
import { authenticationUser, logout } from "@/services";
import { SidebarTrigger } from "@/components/ui/sidebar";

const { t } = useI18n();

const router = useRouter();

const mode = useColorMode();

const { data } = useQuery({
  queryKey: ["authUser"],
  queryFn: authenticationUser,
});

function handleLogout() {
  logoutMutation.mutate();
}

const logoutMutation = useMutation({
  mutationFn: logout,
  onSuccess: () => {
    router.push({ name: "login" });
  },
  onError: (error) => {
    console.error("Logout failed:", error);
  },
});
</script>

<template>
  <nav
    class="flex justify-between p-2 sticky top-0 w-full z-10 backdrop-blur-md"
  >
    <SidebarTrigger />
    <div class="flex space-x-4">
      <Button
        variant="ghost"
        size="icon"
        @click="mode === 'dark' ? (mode = 'light') : (mode = 'dark')"
      >
        <Sun v-if="mode === 'dark'" class="w-5 h-5" />
        <Moon v-if="mode === 'light'" class="w-5 h-5" />
      </Button>
      <DropdownMenu>
        <DropdownMenuTrigger as-child>
          <Avatar class="h-8 w-8 rounded-lg">
            <AvatarImage
              :src="data?.avatar ?? ''"
              alt="username"
              class="object-cover"
            />
            <AvatarFallback class="rounded-lg">
              <CircleUser />
            </AvatarFallback>
          </Avatar>
        </DropdownMenuTrigger>
        <DropdownMenuContent
          class="w-[--radix-dropdown-menu-trigger-width] min-w-56 rounded-lg"
          side="bottom"
          align="end"
          :side-offset="4"
        >
          <DropdownMenuLabel class="p-0 font-normal">
            <div class="flex items-center gap-2 px-1 py-1.5 text-left text-sm">
              <Avatar class="h-8 w-8 rounded-lg">
                <AvatarImage :src="data?.avatar ?? ''" alt="userAvatar" />
                <AvatarFallback class="rounded-lg">
                  <CircleUser />
                </AvatarFallback>
              </Avatar>
              <div class="grid flex-1 text-left text-sm leading-tight">
                <span class="truncate font-semibold">{{
                  data?.username ?? "Guest"
                }}</span>
              </div>
            </div>
          </DropdownMenuLabel>
          <DropdownMenuSeparator />
          <DropdownMenuItem @click="router.push({ name: 'settingsProfile' })">
            <span class="text-sm">{{ t("profile") }}</span>
          </DropdownMenuItem>
          <DropdownMenuSeparator />
          <DropdownMenuItem @click="handleLogout">
            <LogOut class="mr-2 h-4 w-4" />
            <span>{{ t("logout") }}</span>
          </DropdownMenuItem>
        </DropdownMenuContent>
      </DropdownMenu>
    </div>
  </nav>
</template>
